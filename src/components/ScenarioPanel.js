"use client";

import { useState } from "react";
import { Box, Typography, IconButton, InputBase } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";

export default function ScenarioPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box
      sx={{
        width: collapsed ? 24 : 260,
        minHeight: "100vh",
        borderRight: "1px solid #ddd",
        bgcolor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: collapsed ? "center" : "stretch",
        transition: "width 0.2s ease",
      }}
    >
      {/* 접기/펼치기 버튼 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          p: 1,
        }}
      >
        <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? (
            <ArrowForwardIosIcon fontSize="small" />
          ) : (
            <ArrowBackIosNewIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      {/* 접혀있지 않을 때만 보여줄 내용 */}
      {!collapsed && (
        <>
          <Typography variant="body2" sx={{ px: 2, color: "gray", mb: 1 }}>
            시나리오 패널
          </Typography>

          {/* 🔍 검색창 추가 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f0f2f5",
              px: 1,
              py: 0.5,
              mx: 2,
              borderRadius: 1,
            }}
          >
            <SearchIcon fontSize="small" sx={{ color: "#999", mr: 1 }} />
            <InputBase
              placeholder="검색"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ fontSize: 14 }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
