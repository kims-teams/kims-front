"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

export default function AddEmployeePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    role: "",
    hireDate: null,
  });

  const [employees, setEmployees] = useState([]);

  const isValidEmail = (email) => {
    const cleaned = email.trim();
    if (!cleaned.includes("@")) return false;
    if (!cleaned.endsWith("@kims.kr")) return false;
    return true;
  };

  const isDuplicateEmail = (email) => {
    return employees.some(
      (emp) => emp.email.trim().toLowerCase() === email.trim().toLowerCase()
    );
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user");
      setEmployees(res.data);
    } catch (err) {
      console.error("사원 목록 조회 실패:", err);
      alert("사원 목록을 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleAdd = async () => {
    const email = form.email;

    if (!isValidEmail(email)) {
      alert("회사 이메일(@kims.kr)만 입력할 수 있습니다.");
      return;
    }

    if (isDuplicateEmail(email)) {
      alert("이미 등록된 이메일입니다.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/user", {
        name: form.name,
        email: email,
        position: form.position,
        role: form.role,
        hireDate: form.hireDate ? form.hireDate.toISOString() : null,
      });

      alert("사원 추가가 완료되었습니다.");
      setForm({ name: "", email: "", position: "", role: "", hireDate: null });
      fetchEmployees();
    } catch (err) {
      console.error("사원 추가 실패:", err.response?.data || err);
      alert("사원 추가에 실패했습니다.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          🧑‍💼 사원 추가
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="이름"
            size="small"
            value={form.name}
            onChange={handleChange("name")}
          />
          <TextField
            label="이메일"
            size="small"
            value={form.email}
            onChange={handleChange("email")}
          />
          <TextField
            label="직급"
            size="small"
            value={form.position}
            onChange={handleChange("position")}
          />
          <DatePicker
            label="입사일"
            value={form.hireDate}
            onChange={(newDate) => setForm({ ...form, hireDate: newDate })}
            slotProps={{ textField: { size: "small" } }}
          />
          <Button variant="outlined" onClick={handleAdd}>
            추가
          </Button>
        </Box>

        <Typography variant="h6" sx={{ mt: 4 }}>
          👥 사원 목록
        </Typography>
        <List>
          {employees.map((emp) => (
            <ListItem key={emp.id}>
              <ListItemText
                primary={`${emp.name} (${emp.email})`}
                secondary={`입사일: ${
                  emp.hireDate ? emp.hireDate.substring(0, 10) : "없음"
                }, 직급: ${emp.position || "-"}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </LocalizationProvider>
  );
}
