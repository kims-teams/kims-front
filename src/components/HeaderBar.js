"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PublicIcon from "@mui/icons-material/Public";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function HeaderBar() {
  const router = useRouter();
  const [now, setNow] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = !darkMode ? "#121212" : "#fff";
      document.body.style.color = !darkMode ? "#fff" : "#000";
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      color="default"
      sx={{
        height: 50,
        bgcolor: "#e0e0e0",
        justifyContent: "center",
        px: 2,
        zIndex: 1300,
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: "50px !important", px: 2 }}>
        <Box
          sx={{
            width: "100%",
            height: 48,
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="알림">
              <IconButton size="small">
                <NotificationsNoneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="다크모드">
              <IconButton size="small" onClick={toggleDarkMode}>
                <LightModeOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="언어">
              <IconButton size="small">
                <PublicIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="설정">
              <IconButton size="small">
                <SettingsOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Tooltip title="로그인">
            <IconButton size="small" onClick={() => router.push("/login")}>
              <LockOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* 오른쪽 버튼 */}
        <Button
          variant="outlined"
          size="small"
          sx={{
            mr: 1,
            borderColor: 'black',
            color: 'black',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: '#f0f0f0',
            },
          }}
          onClick={handleAddEmployee}
        >
          사원추가
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{
            borderColor: 'black',
            color: 'black',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: '#f0f0f0',
            },
          }}
          onClick={handleLogin}
        >
          로그인
        </Button>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
