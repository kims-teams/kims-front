"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
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
    hireDate: null,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (userData) {
      setForm({
        email: userData.email || "",
        name: userData.name || "",
        position: userData.position || "",
        hireDate: userData.hireDate ? dayjs(userData.hireDate) : null,
      });
      setError("");
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const trimmed = value.trim().toLowerCase();
      const originalEmail = userData.email.trim().toLowerCase();

      if (!trimmed.includes("@")) {
        setError("유효한 이메일을 입력하세요.");
      } else if (
        trimmed !== originalEmail &&
        emailList?.some((e) => e.trim().toLowerCase() === trimmed)
      ) {
        setError("이미 등록된 이메일입니다.");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = () => {
    const trimmedEmail = form.email.trim();

    if (!trimmedEmail.includes("@")) {
      alert("유효한 이메일을 입력하세요.");
      return;
    }

    const isDuplicate =
      trimmedEmail.toLowerCase() !== userData.email.toLowerCase() &&
      emailList?.some(
        (e) => e.trim().toLowerCase() === trimmedEmail.toLowerCase()
      );

    if (isDuplicate) {
      alert("이미 등록된 이메일입니다.");
      return;
    }

    const updatedUser = {
      ...userData,
      ...form,
      hireDate: form.hireDate?.toISOString(),
    };

    onSave(updatedUser);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <DatePicker
            label="입사일"
            value={form.hireDate}
            onChange={(newDate) =>
              setForm((prev) => ({ ...prev, hireDate: newDate }))
            }
            slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" disabled={!!error}>
            저장
          </Button>
          <Button onClick={onClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
