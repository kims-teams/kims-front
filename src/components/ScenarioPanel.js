"use client";

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import {
  ArrowForwardIos as ArrowForwardIosIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import { useEffect, useRef, useState } from "react";
import { useScenarioStore } from "../hooks/useScenarioStore";
import ListItemButton from "@mui/material/ListItemButton";

export default function ScenarioPanel() {
  const [collapsed, setCollapsed] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [scenarioName, setScenarioName] = useState("");
  const [animating, setAnimating] = useState(false);
  const {
    scenarioList,
    setScenarioList,
    selectedScenario,
    setSelectedScenario,
    addScenario,
  } = useScenarioStore();

  const boxRef = useRef(null);

  const handleAddScenario = async () => {
    if (!scenarioName.trim()) return;

    try {
      const res = await fetch(
        "http://52.78.234.7:8080/api/scenario/" + scenarioName,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("시나리오 생성 실패");

      const result = await res.json();
      addScenario(result);
      setScenarioName("");
      setOpenDialog(false);
    } catch (err) {
      console.error("시나리오 추가 실패:", err);
    }
  };

  useEffect(() => {
    const fetchScenarioList = async () => {
      try {
        const res = await fetch("http://52.78.234.7:8080/api/scenario");
        if (!res.ok) throw new Error("시나리오 조회 실패");

        const data = await res.json();
        setScenarioList(data);
        if (data.length > 0) {
          setSelectedScenario(data[0]);
        }
      } catch (err) {
        console.error("시나리오 목록 불러오기 실패:", err);
      }
    };

    fetchScenarioList();
  }, []);

  useEffect(() => {
    const handleTransitionEnd = () => {
      setAnimating(false);
    };
    const node = boxRef.current;
    node?.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      node?.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, []);

  return (
    <Box
      ref={boxRef}
      sx={{
        width: collapsed ? 24 : 260,
        height: collapsed ? 865 : 865,
        borderRight: "1px solid #dce1e8",
        bgcolor: "#fdfefe",
        display: "flex",
        flexDirection: "column",
        alignItems: collapsed ? "center" : "stretch",
        transition: "width 0.2s ease",
        overflowY: "auto",
        borderRadius: 2,
        ml: 2,
        mt: 2,
        boxShadow: collapsed ? "none" : "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          p: 1,
        }}
      >
        <IconButton
          size="small"
          onMouseOver={() => {
            if (!animating) {
              setCollapsed((prev) => !prev);
              setAnimating(true);
            }
          }}
        >
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
                onClick={() => setOpenDialog(true)}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Divider sx={{ mt: 1 }} />

          <List dense sx={{ px: 2, pt: 1 }}>
            {scenarioList
              .filter((s) =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((s, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemButton
                    selected={selectedScenario?.id === s.id}
                    onClick={() => setSelectedScenario(s)}
                    sx={{
                      pl: 2,
                      pr: 1.2,
                      py: 0.8,
                      mb: 0.5,
                      borderRadius: 1.5,
                      bgcolor:
                        selectedScenario?.id === s.id
                          ? "#e5f0ff"
                          : "transparent",
                      "& .MuiListItemText-primary": {
                        fontWeight: selectedScenario?.id === s.id ? 600 : 400,
                        fontSize: "13px",
                        color:
                          selectedScenario?.id === s.id ? "#1a3d7c" : "#333",
                      },
                      "&:hover": {
                        backgroundColor: "#f4f6f9",
                      },
                    }}
                  >
                    <ListItemText primary={s.name} />
                    <ListItemSecondaryAction>
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>시나리오 추가</DialogTitle>
            <DialogContent>
              <TextField
                label="이름"
                fullWidth
                required
                size="small"
                sx={{ my: 1 }}
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>취소</Button>
              <Button
                onClick={handleAddScenario}
                variant="contained"
                disabled={!scenarioName.trim()}
              >
                추가
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}
