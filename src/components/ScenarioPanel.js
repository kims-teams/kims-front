"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ScenarioPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [scenarioList, setScenarioList] = useState([
    "S010000",
    "S020000",
    "S030000",
    "S040000",
    "S050000",
  ]);

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
            <Tooltip title="시나리오 추가">
              <IconButton
                size="small"
                sx={{ ml: 1 }}
                onClick={() => openDialog("add")}
              >
                {" "}
                <AddIcon fontSize="small" />{" "}
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />

          <List dense sx={{ px: 2, pt: 1 }}>
            {scenarioList.map((id) => (
              <ListItem
                key={id}
                button
                sx={{
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.7,
                  mb: 0.5,
                  "&:hover": { bgcolor: "#f0f6ff" },
                }}
              >
                <ListItemText
                  primary={id}
                  primaryTypographyProps={{ fontSize: 14 }}
                />
                <ListItemSecondaryAction sx={{ right: 8 }}>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}
