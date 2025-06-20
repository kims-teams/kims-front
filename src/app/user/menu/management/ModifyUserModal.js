"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function ModifyUserModal({
  open,
  onClose,
  userData,
  onSave,
  emailList,
}) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    position: "",
    phone: "",
    hireDate: null,
    role: "",
    status: "",
  });

  const [error, setError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [phoneErrorOpen, setPhoneErrorOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      setForm({
        email: userData.email || "",
        name: userData.name || "",
        position: userData.position || "",
        phone: userData.phone || "",
        hireDate: userData.hireDate ? dayjs(userData.hireDate) : null,
        role: userData.role || "",
        status: userData.status || "",
      });
      setError("");
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const trimmed = value.trim().toLowerCase();
      const original = userData?.email?.trim().toLowerCase();

      if (!trimmed.includes("@")) {
        setError("유효한 이메일을 입력하세요.");
      } else if (
        trimmed !== original &&
        emailList?.some((e) => e.trim().toLowerCase() === trimmed)
      ) {
        setError("이미 등록된 이메일입니다.");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const userId = userData.id ?? userData.realId;

    if (!userId) return alert("수정할 사용자 ID가 없습니다.");

    const trimmedEmail = form.email.trim();
    if (!trimmedEmail.includes("@")) {
      return alert("유효한 이메일을 입력하세요.");
    }

    const isDuplicate =
      trimmedEmail.toLowerCase() !== userData.email.toLowerCase() &&
      emailList?.some(
        (e) => e.trim().toLowerCase() === trimmedEmail.toLowerCase()
      );

    if (isDuplicate) return alert("이미 등록된 이메일입니다.");

    const phonePattern = /^01[016-9]-\d{3,4}-\d{4}$/;
    if (!phonePattern.test(form.phone)) {
      setPhoneErrorOpen(true);
      return;
    }

    const updatedUser = {
      email: trimmedEmail,
      name: form.name,
      position: form.position,
      phone: form.phone,
      hireDate: form.hireDate?.isValid?.()
        ? form.hireDate.format("YYYY-MM-DDTHH:mm:ss")
        : null,
      role: form.role,
      status: form.status,
    };

    try {
      const res = await fetch(`http://localhost:8080/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        let errorMessage = "수정 실패";
        try {
          const contentType = res.headers.get("content-type");
          if (contentType?.includes("application/json")) {
            const errorJson = await res.json();
            errorMessage = errorJson.message || JSON.stringify(errorJson);
          } else {
            errorMessage = await res.text();
          }
        } catch {
          errorMessage = "알 수 없는 오류 발생";
        }
        return alert(`수정 실패: ${errorMessage}`);
      }

      const saved = await res.json();
      onSave(saved);
      setSuccessOpen(true);
    } catch (err) {
      console.error("수정 중 오류:", err);
    }
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>사용자 수정</DialogTitle>
          <DialogContent>
            <TextField
              label="이메일"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="dense"
              error={!!error}
            />
            <TextField
              label="이름"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="직급"
              name="position"
              value={form.position}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="연락처"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="예: 010-1234-5678"
              fullWidth
              margin="dense"
            />
            <DatePicker
              label="입사일"
              value={form.hireDate}
              onChange={(newDate) =>
                setForm((prev) => ({ ...prev, hireDate: newDate }))
              }
              slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
            />
            <TextField
              select
              label="권한"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              margin="dense"
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="USER">USER</MenuItem>
            </TextField>
            <TextField
              select
              label="상태"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
              margin="dense"
            >
              <MenuItem value="재직중">재직중</MenuItem>
              <MenuItem value="퇴사">퇴사</MenuItem>
              <MenuItem value="휴직">휴직</MenuItem>
            </TextField>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!!error}
            >
              저장
            </Button>
            <Button onClick={onClose}>취소</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={successOpen} onClose={handleSuccessClose}>
          <DialogTitle>수정 완료</DialogTitle>
          <DialogContent>
            <Typography>사용자 정보가 성공적으로 수정되었습니다.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSuccessClose} autoFocus variant="contained">
              확인
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={phoneErrorOpen} onClose={() => setPhoneErrorOpen(false)}>
          <DialogTitle>연락처 입력 오류</DialogTitle>
          <DialogContent>
            <Typography>
              연락처는 010-0000-0000 형식으로 입력해주세요.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setPhoneErrorOpen(false)}
              variant="contained"
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </LocalizationProvider>
  );
}
