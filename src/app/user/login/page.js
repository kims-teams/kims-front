"use client";

import { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("이메일 혹은 비밀번호가 일치하지 않습니다.");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      router.push("/user");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: "12px",
          boxShadow: "0px 8px 30px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          animation: "fadeSlideIn 0.5s ease",
          "@keyframes fadeSlideIn": {
            from: { opacity: 0, transform: "translateY(-20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 1, fontWeight: 800, textAlign: "center", color: "#333" }}
        >
          KIMSTEAMS
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: "#777", textAlign: "center" }}
        >
          계정 정보를 입력해주세요
        </Typography>

        <TextField
          label="이메일"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 1 }}
        />

        {errorMessage && (
          <Typography color="error" sx={{ mb: 2, fontSize: "0.85rem" }}>
            {errorMessage}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            bgcolor: "#333",
            color: "#fff",
            fontWeight: 600,
            py: 1.2,
            borderRadius: "6px",
            "&:hover": {
              bgcolor: "#222",
              transform: "scale(1.01)",
              transition: "all 0.2s ease-in-out",
            },
          }}
        >
          로그인
        </Button>
      </Paper>
    </Box>
  );
}
