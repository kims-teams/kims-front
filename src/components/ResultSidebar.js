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

const simulationItems = ["작업도구 사용 내역", "작업장별 생산 계획"];

export default function RightSidebar({ onSelect, collapsed, setCollapsed }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
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
        bgcolor: "#fff",
      }}
    >
      <IconButton
        size="small"
        onClick={toggleCollapse}
        sx={{
          position: "absolute",
          top: 6,
          left: 6,
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
            sx={{ px: 4, color: "gray", fontSize: "15px", mt: 3 }}
          >
            입력 데이터 목록
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
                primaryTypographyProps={{
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              />
              {openGroup.output ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openGroup.output} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => toggleGroup("simulation")}
                  sx={{ pl: 2 }}
                >
                  <ListItemText
                    primary="Simulation"
                    primaryTypographyProps={{
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
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
                          selected={selectedItem === item}
                          onClick={() => {
                            setSelectedItem(item);
                            onSelect?.(item);
                          }}
                          sx={{
                            pl: 4,
                            py: 0.5,
                            my: 0.25,
                            borderRadius: 1,
                            ...(selectedItem === item && {
                              backgroundColor: "#e0e0e0",
                              "& .MuiListItemText-primary": {
                                fontWeight: "bold",
                                color: "#1a237e",
                              },
                            }),
                            "&:hover": {
                              backgroundColor: "#f5f5f5",
                            },
                          }}
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
          </List>
        </>
      )}
    </Box>
  );
}
