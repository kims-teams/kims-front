"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function AddUserModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setForm({ email: "", name: "", password: "", role: "" });
      setError("");
    }
  }, [open]);

  const isValidEmail = (email) =>
    email.endsWith("@vms-solutions.com") &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email" && !isValidEmail(value)) {
      setError("비즈니스 이메일은 필수값입니다!");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (!isValidEmail(form.email)) return;
    if (!form.name || !form.password || !form.role) return;

    onAdd(form); // 외부에서 처리
    onClose(); // 닫기
  };

  const isFormValid = () =>
    isValidEmail(form.email) && form.name && form.password && form.role;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          required
          margin="dense"
          error={!!error}
        />
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Role"
          name="role"
          select
          value={form.role}
          onChange={handleChange}
          fullWidth
          required
          margin="dense"
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Operator">Operator</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </TextField>
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
  );
}
