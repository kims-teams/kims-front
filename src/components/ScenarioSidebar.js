"use client";

import { useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

export default function ScenarioSidebar({ onSelect }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [open, setOpen] = useState({ scenarioData: true });

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const scenarioItems = [
    { label: "우선순위", onClick: () => onSelect("우선순위") },
    { label: "생산 라우팅", onClick: () => onSelect("생산 라우팅") },
    { label: "작업장-도구 매핑관리", onClick: () => onSelect("매핑") },
    { label: "작업장 마스터", onClick: () => onSelect("작업장 마스터") },
    { label: "판매오더", onClick: () => onSelect("판매오더") },
    { label: "공정순서", onClick: () => onSelect("공정순서") },
    { label: "공정 마스터", onClick: () => onSelect("공정 마스터") },
    // 다른 항목들도 동일하게
  ];

  return (
    <Drawer
      anchor="right"
      variant="permanent"
      sx={{
        width: isSidebarOpen ? 280 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isSidebarOpen ? 280 : 60,
          boxSizing: "border-box",
          p: 2,
          right: 0,
          top: "50px",
          height: "calc(100% - 50px)",
          position: "fixed",
          transition: "width 0.3s",
          overflowX: "hidden",
          whiteSpace: "nowrap",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <IconButton onClick={toggleSidebar} size="small">
          {isSidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      {isSidebarOpen && (
        <>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            입력 데이터 목록
          </Typography>

          <TextField
            placeholder="검색"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <List disablePadding>
            <ListItemButton onClick={() => toggle("scenarioData")}>
              <ListItemText primary="Scenario" />
              {open.scenarioData ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.scenarioData} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 2 }}>
                {scenarioItems.map((item) => (
                  <ListItemButton key={item.label} onClick={item.onClick}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        </>
      )}
    </Drawer>
  );
}
