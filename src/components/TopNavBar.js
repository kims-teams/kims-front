"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  Switch,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PublicIcon from "@mui/icons-material/Public";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function TopNavBar() {
  const [now, setNow] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = !darkMode ? "#121212" : "#fff";
      document.body.style.color = !darkMode ? "#fff" : "#000";
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 48,
          px: 2,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* 🔘 좌측 아이콘 */}
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

        {/* 🧍 우측 사용자 정보 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minWidth: 230,
          }}
        >
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
              남주현
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#666" }}>
              himedia717@naver.com
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: 12, color: "#888" }}>
              {dateStr}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#888" }}>
              {timeStr}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </>
  );
}
