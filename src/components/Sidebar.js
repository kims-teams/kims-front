"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
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
import EngineeringIcon from "@mui/icons-material/Engineering";
import BarChartIcon from "@mui/icons-material/BarChart";
import ForumIcon from "@mui/icons-material/Forum";
import useCommunityViewStore from "../hooks/useCommunityViewStore";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const [open, setOpen] = useState({
    engine: true,
    analysis: true,
    community: true,
    ADMIN: true,
  });

  const [role, setRole] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { setSelectedCommunityView } = useCommunityViewStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      const storedMenu = localStorage.getItem("selectedMenu");
      if (storedRole) setRole(storedRole);
      if (storedMenu) setSelectedMenu(storedMenu);
    }
  }, []);

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNav = (label) => {
    setSelectedMenu(label);
    localStorage.setItem("selectedMenu", label);

    const routeMap = {
      "시나리오 관리": "/user/menu/scenario",
      "실행 결과": "/user/menu/result",
      "생산 계획 간트": "/user/menu/production-gantt",
      "사용자 관리": "/user/menu/management",
      "사내 게시판": "/user/menu/community",
      수요예측: "/user/menu/forecast",
    };

    if (routeMap[label]) {
      router.push(routeMap[label]);
    }
  };

  const getItemStyles = (label) => ({
    fontWeight: selectedMenu === label ? "bold" : "normal",
    backgroundColor: selectedMenu === label ? "#e3eaf7" : "transparent",
    "&:hover": {
      backgroundColor: selectedMenu === label ? "#d3e0f0" : "#f5f5f5",
    },
  });

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
        },
      }}
    >
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
        <ListItemButton onClick={() => toggle("engine")}>
          <EngineeringIcon fontSize="small" sx={{ mr: 1 }} />
          <ListItemText primary="엔진" />
          {open.engine ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.engine}>
          <Box sx={{ pl: 2, borderLeft: "2px solid #ccc", ml: 1 }}>
            <List disablePadding>
              <ListItemButton
                selected={selectedMenu === "시나리오 관리"}
                onClick={() => handleNav("시나리오 관리")}
                sx={getItemStyles("시나리오 관리")}
              >
                <ListItemText primary="시나리오 관리" />
              </ListItemButton>
              <ListItemButton
                selected={selectedMenu === "실행 결과"}
                onClick={() => handleNav("실행 결과")}
                sx={getItemStyles("실행 결과")}
              >
                <ListItemText primary="실행 결과" />
              </ListItemButton>
            </List>
          </Box>
        </Collapse>

        <ListItemButton onClick={() => toggle("analysis")}>
          <BarChartIcon fontSize="small" sx={{ mr: 1 }} />
          <ListItemText primary="결과 분석" />
          {open.analysis ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.analysis}>
          <Box sx={{ pl: 2, borderLeft: "2px solid #ccc", ml: 1 }}>
            <List disablePadding>
              <ListItemButton
                selected={selectedMenu === "생산 계획 간트"}
                onClick={() => handleNav("생산 계획 간트")}
                sx={getItemStyles("생산 계획 간트")}
              >
                <ListItemText primary="생산 계획 간트" />
              </ListItemButton>
            </List>
          </Box>
        </Collapse>

        <ListItemButton onClick={() => toggle("community")}>
          <ForumIcon fontSize="small" sx={{ mr: 1 }} />
          <ListItemText primary="게시판" />
          {open.community ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.community}>
          <Box sx={{ pl: 2, borderLeft: "2px solid #ccc", ml: 1 }}>
            <List disablePadding>
              <ListItemButton
                selected={selectedMenu === "사내 게시판"}
                onClick={() => handleNav("사내 게시판")}
                sx={getItemStyles("사내 게시판")}
              >
                <ListItemText primary="사내 게시판" />
              </ListItemButton>
              <ListItemButton
                selected={selectedMenu === "수요예측"}
                onClick={() => handleNav("수요예측")}
                sx={getItemStyles("수요예측")}
              >
                <ListItemText primary="수요예측" />
              </ListItemButton>
            </List>
          </Box>
        </Collapse>

        {role === "ADMIN" && (
          <>
            <ListItemButton onClick={() => toggle("ADMIN")}>
              <BarChartIcon fontSize="small" sx={{ mr: 1 }} />
              <ListItemText primary="관리" />
              {open.ADMIN ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.ADMIN}>
              <Box sx={{ pl: 2, borderLeft: "2px solid #ccc", ml: 1 }}>
                <List disablePadding>
                  <ListItemButton
                    selected={selectedMenu === "사용자 관리"}
                    onClick={() => handleNav("사용자 관리")}
                    sx={getItemStyles("사용자 관리")}
                  >
                    <ListItemText primary="사용자 관리" />
                  </ListItemButton>
                </List>
              </Box>
            </Collapse>
          </>
        )}
      </List>
    </Drawer>
  );
}
