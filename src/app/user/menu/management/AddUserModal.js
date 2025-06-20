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

export default function AddUserModal({ open, onClose, onAdd, emailList }) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    position: "",
    hireDate: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setForm({ email: "", name: "", position: "", hireDate: null });
      setError("");
    }
  }, [open]);

  const isValidEmail = (email) => {
    if (!email.includes("@")) return false;
    if (!email.endsWith("@kims.kr")) return false;
    return true;
  };

  const isDuplicateEmail = (email) => {
    return emailList?.some(
      (e) => e.trim().toLowerCase() === email.trim().toLowerCase()
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!isValidEmail(value)) {
        setError("회사 이메일(@kims.kr)만 입력 가능합니다.");
      } else if (isDuplicateEmail(value)) {
        setError("이미 등록된 이메일입니다.");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = () => {
    if (!isValidEmail(form.email)) return;
    if (isDuplicateEmail(form.email)) return;
    if (!form.name || !form.position || !form.hireDate) return;

    const userToAdd = {
      ...form,
      hireDate: form.hireDate.toISOString(), 
    };

    onAdd(userToAdd);
    onClose();
  };

  const isFormValid = () =>
    isValidEmail(form.email) &&
    !isDuplicateEmail(form.email) &&
    form.name &&
    form.position &&
    form.hireDate;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>사원추가</DialogTitle>
        <DialogContent>
          <TextField
            label="이메일"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
            error={!!error}
          />
          <TextField
            label="이름"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
          <TextField
            label="직급"
            name="position"
            value={form.position}
            onChange={handleChange}
            fullWidth
            required
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
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!isFormValid()}
          >
            저장
          </Button>
          <Button onClick={onClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
