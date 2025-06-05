"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react";

export default function RightSidebarHeader() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        p: 2,
        mb: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar sx={{ bgcolor: "#3f51b5", width: 40, height: 40 }}>남</Avatar>

      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>남주현</Typography>
        <Typography sx={{ fontSize: 13, color: "#666" }}>
          himedia717@naver.com
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#aaa", mt: 0.5 }}>
          {dateStr} · {timeStr}
        </Typography>
      </Box>
    </Box>
  );
}
