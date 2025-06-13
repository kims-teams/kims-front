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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ScenarioPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [scenarioName, setScenarioName] = useState("");
  const [scenarioList, setScenarioList] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const addScenario = async () => {
    if (!scenarioName.trim()) return;

    try {
      const res = await fetch("http://localhost:8080/api/scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: scenarioName,
        }),
      });

      if (!res.ok) throw new Error("시나리오 생성 실패");

      const result = await res.json();

     const scenarioWithData = {
  scenario: {
    id: result.scenario.id,
    name: result.scenario.name,
    bop: result.bop,
    config: result.config,
    resource: result.resource,
    target: result.target,
  },
};

      setScenarioList((prev) => [...prev, scenarioWithData]);
      setSelectedScenario(scenarioWithData);

      setScenarioName("");
      setOpenDialog(false);
    } catch (err) {
      console.error("시나리오 추가 실패:", err);
    }
  };

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
      <Box sx={{ display: "flex", justifyContent: collapsed ? "center" : "flex-end", p: 1 }}>
        <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ArrowForwardIosIcon fontSize="small" /> : <ArrowBackIosNewIcon fontSize="small" />}
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
              <IconButton size="small" sx={{ ml: 1 }} onClick={() => setOpenDialog(true)}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Divider />

          <List dense sx={{ px: 2, pt: 1 }}>
            {scenarioList
              .filter((s) =>
                s.scenario.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((s, idx) => (
                <ListItem
                  key={idx}
                  disablePadding
                  button
                  onClick={() => setSelectedScenario(s)}
                >
                  <ListItemText primary={s.scenario.name} />
                  <ListItemSecondaryAction>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
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
                onClick={addScenario}
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
