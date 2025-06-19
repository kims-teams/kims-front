"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function ModifyUserModal({ open, onClose, userData, onSave }) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    role: "",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        email: userData.email || "",
        name: userData.name || "",
        role: userData.role || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.email.includes("@")) {
      alert("유효한 이메일을 입력하세요.");
      return;
    }
    onSave({ ...userData, ...form });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>사용자 수정</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained">
          저장
        </Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
}
