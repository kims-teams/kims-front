// ✅ RightSidebar.js
"use client";

import {
  Typography,
  InputBase,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";

const simulationItems = [
  "작업도구 사용 내역",
  "자재 미사용 내역",
  "용액 일지 조회",
  "계획오더 로그",
  "공정 생산 수량 조회",
  "LOT 발행 이력",
  "계획오더 조회",
  "작업장 Dispatch 내역",
  "투입 재공 내역",
  "미생성 사유 조회",
  "생산 계획",
  "일별 투입 계획",
  "작업장 가도 현황",
  "완제품 사용 내역",
  "자재 사용 내역",
  "미생성 오더 조회",
  "원부자재 사용 내역",
  "Capa 부족 LOT",
  "미사용 원부자재",
];

export default function RightSidebar({ onSelect, collapsed, setCollapsed }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openGroup, setOpenGroup] = useState({
    output: true,
    simulation: true,
  });

  const toggleGroup = (key) =>
    setOpenGroup((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const filteredItems = simulationItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: collapsed ? 24 : 260,
        height: "100%",
        borderLeft: "1px solid #ddd",
        boxSizing: "border-box",
        pt: 1,
        px: 1,
        display: "flex",
        flexDirection: "column",
        fontSize: "13px",
        overflow: "hidden",
        alignItems: collapsed ? "center" : "stretch",
        position: "relative",
      }}
    >
      {/* Toggle icon fixed top-left INSIDE box */}
      <IconButton
        size="small"
        onClick={toggleCollapse}
        sx={{
          position: "absolute",
          top: 6,
          left: collapsed ? 2 : 230,
          zIndex: 2000,
          backgroundColor: "white",
          border: "1px solid #ccc",
          width: 20,
          height: 20,
          boxShadow: 1,
        }}
      >
        {collapsed ? (
          <ChevronLeftIcon fontSize="small" />
        ) : (
          <ChevronRightIcon fontSize="small" />
        )}
      </IconButton>

      {!collapsed && (
        <>
          <Typography
            variant="body2"
            sx={{ px: 4, color: "gray", fontSize: "15px", mt: 3 }} // ← 제목 오른쪽으로
          >
            결과 데이터 목록
          </Typography>

          <InputBase
            placeholder="검색"
            fullWidth
            sx={{
              fontSize: 11,
              bgcolor: "#f5f5f5",
              px: 1,
              py: 0.5,
              mx: 1,
              my: 1,
              borderRadius: 1,
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "#999" }} />
              </InputAdornment>
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Divider />

          <List dense disablePadding sx={{ flex: 1 }}>
            <ListItemButton
              onClick={() => toggleGroup("output")}
              sx={{ fontSize: "13px" }}
            >
              <ListItemText
                primary="Output Data"
                primaryTypographyProps={{ fontSize: "13px" }}
              />
              {openGroup.output ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openGroup.output} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 2 }}
                  onClick={() => toggleGroup("simulation")}
                >
                  <ListItemText
                    primary="Simulation"
                    primaryTypographyProps={{ fontSize: "13px" }}
                  />
                  {openGroup.simulation ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse
                  in={openGroup.simulation}
                  timeout="auto"
                  unmountOnExit
                >
                  <List dense disablePadding>
                    {filteredItems.map((item, idx) => (
                      <ListItem key={idx} disablePadding>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() => onSelect?.(item)}
                        >
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{ fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </List>
            </Collapse>

            <ListItem disablePadding>
              <ListItemButton onClick={() => onSelect?.("TaskAct")}>
                <ListItemText
                  primary="TaskAct"
                  primaryTypographyProps={{ fontSize: "12px" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );
}
