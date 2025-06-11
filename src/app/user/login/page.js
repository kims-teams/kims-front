"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      window.alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#ffffff",
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
          maxWidth: 380,
          borderRadius: 0, // 각진 네모
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          animation: "fadeSlideIn 0.6s ease",
          "@keyframes fadeSlideIn": {
            from: { opacity: 0, transform: "translateY(-20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 0.5, fontWeight: 700, textAlign: "center" }}
        >
          로그인
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
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: "#999999",
              },
            },
          }}
        />
        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 1,
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: "#999999",
              },
            },
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={autoLogin}
              onChange={(e) => setAutoLogin(e.target.checked)}
              size="small"
              sx={{ color: "#999" }}
            />
          }
          label={
            <Typography sx={{ fontSize: 13, color: "#555" }}>
              자동 로그인
            </Typography>
          }
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            bgcolor: "#333333",
            color: "#fff",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#222222",
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
