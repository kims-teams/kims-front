"use client";

import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BarChartIcon from "@mui/icons-material/BarChart";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [open, setOpen] = useState({
    fav: true,
    engine: true,
    analysis: true,
    admin: true,
  });

  const router = useRouter();

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNav = (label) => {
    const routeMap = {
      "시나리오 관리": "/user/menu/scenario",
      "실행 관리": "/user/menu/experiment",
      "실행 결과": "/user/menu/result",
      "자원 운영 간트": "/user/menu/resource-gantt",
      "생산 계획 간트": "/user/menu/production-gantt",
      "사용자 관리": "/user/menu/management",
    };
    if (routeMap[label]) {
      router.push(routeMap[label]);
    }
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          p: 2,
          top: "50px",
          height: "calc(100% - 50px)",
          position: "fixed",
        },
      }}
    >
      {/* 검색창 */}
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

      {/* 메뉴 리스트 */}
      <List disablePadding>
        {/* 즐겨찾기 */}
        <ListItemButton onClick={() => toggle("fav")}>
          <StarBorderIcon fontSize="small" sx={{ mr: 1 }} />
          <ListItemText primary="즐겨찾기" />
          {open.fav ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.fav} />

        {/* 엔진 */}
        <ListItemButton onClick={() => toggle("engine")}>
          <EngineeringIcon fontSize="small" sx={{ mr: 1 }} />
          <ListItemText primary="엔진" />
          {open.engine ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.engine}>
          <Box sx={{ pl: 2, borderLeft: "2px solid #ccc", ml: 1 }}>
            <List disablePadding>
              <ListItemButton onClick={() => handleNav("시나리오 관리")}>
                <ListItemText primary="시나리오 관리" />
              </ListItemButton>
              <ListItemButton onClick={() => handleNav("실행 관리")}>
                <ListItemText primary="실행 관리" />
              </ListItemButton>
              <ListItemButton onClick={() => handleNav("실행 결과")}>
                <ListItemText primary="실행 결과" />
              </ListItemButton>
            </List>
          </Box>
        </Collapse>

        {/* 결과 분석 */}
        <ListItemButton onClick={() => toggle("analysis")}>
          <BarChartIcon fontSize="small" sx={{ mr: 1 }} />
          <ListItemText primary="결과 분석" />
          {open.analysis ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.analysis}>
          <Box sx={{ pl: 2, borderLeft: "2px solid #ccc", ml: 1 }}>
            <List disablePadding>
              <ListItemButton onClick={() => handleNav("자원 운영 간트")}>
                <ListItemText primary="자원 운영 간트" />
              </ListItemButton>
              <ListItemButton onClick={() => handleNav("생산 계획 간트")}>
                <ListItemText primary="생산 계획 간트" />
              </ListItemButton>
            </List>
          </Box>
        </Collapse>

        {/* 관리 */}
        <ListItemButton onClick={() => toggle("admin")}>
          <BarChartIcon fontSize="small" sx={{ mr: 1 }} />
          <ListItemText primary="관리" />
          {open.admin ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.admin}>
          <Box sx={{ pl: 2, borderLeft: "2px solid #ccc", ml: 1 }}>
            <List disablePadding>
              <ListItemButton onClick={() => handleNav("사용자 관리")}>
                <ListItemText primary="사용자 관리" />
              </ListItemButton>
            </List>
          </Box>
        </Collapse>
      </List>
    </Drawer>
  );
}
