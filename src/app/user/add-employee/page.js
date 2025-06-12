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
    password: "",
    hireDate: null,
  });

  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await axios.get("192.169.10.152:8080/api/user");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post("192.169.10.152:8080/api/user", {
        ...form,
        hireDate: form.hireDate ? form.hireDate.toISOString() : null,
      });
      setForm({ name: "", email: "", password: "", hireDate: null });
      fetchEmployees();
    } catch (err) {
      console.error("추가 실패:", err);
      alert("사원 추가에 실패했습니다. 서버 상태를 확인해주세요.");
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
            label="비밀번호"
            type="password"
            size="small"
            value={form.password}
            onChange={handleChange("password")}
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
                secondary={`입사일: ${emp.hireDate ? emp.hireDate.substring(0, 10) : "없음"}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </LocalizationProvider>
  );
}
