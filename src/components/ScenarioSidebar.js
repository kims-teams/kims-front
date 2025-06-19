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

const inputSubGroups = {
  Bop: [
    "생산 프로세스",
    "공정 마스터",
    "자재 마스터",
    "BOM",
    "플랜트 마스터",
    "공정순서",
  ],
  Config: ["우선순위"],
  Resource: [
    "작업도구 마스터",
    "작업장 마스터",
    "생산 라우팅",
    "작업장-도구 매핑관리",
  ],
  Target: ["판매오더"],
};

const categoryMap = {
  Configurations: ["엔진 실행 옵션"],
  "Input Data": Object.entries(inputSubGroups),
};

export default function ScenarioSidebar({ onSelect, collapsed, setCollapsed }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [openGroup, setOpenGroup] = useState(
    Object.fromEntries(
      Object.keys(categoryMap)
        .flatMap((key) =>
          key === "Input Data" ? [key, ...Object.keys(inputSubGroups)] : [key]
        )
        .map((k) => [k, true])
    )
  );

  const toggleGroup = (key) =>
    setOpenGroup((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleCollapse = () => setCollapsed((prev) => !prev);

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
            <ListItemButton onClick={() => toggleGroup("Configurations")}>
              <ListItemText
                primary="Configurations"
                primaryTypographyProps={{ fontSize: "13px" }}
              />
              {openGroup.Configurations ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse
              in={openGroup.Configurations}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {categoryMap.Configurations.map((item, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemButton
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
                      onClick={() => {
                        setSelectedItem(item);
                        onSelect?.(item);
                      }}
                      selected={selectedItem === item}
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

            <ListItemButton onClick={() => toggleGroup("Input Data")}>
              <ListItemText
                primary="Input Data"
                primaryTypographyProps={{ fontSize: "13px" }}
              />
              {openGroup["Input Data"] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openGroup["Input Data"]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {categoryMap["Input Data"].map(([subGroup, items]) => (
                  <div key={subGroup}>
                    <ListItemButton
                      onClick={() => toggleGroup(subGroup)}
                      sx={{ pl: 2 }}
                    >
                      <ListItemText
                        primary={subGroup}
                        primaryTypographyProps={{
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                        sx={{ pl: 2 }}
                      />
                      {openGroup[subGroup] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse
                      in={openGroup[subGroup]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {items.map((item, idx) => (
                          <ListItem key={idx} disablePadding>
                            <ListItemButton
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
                              onClick={() => {
                                setSelectedItem(item);
                                onSelect?.(item);
                              }}
                              selected={selectedItem === item}
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
                  </div>
                ))}
              </List>
            </Collapse>
          </List>
        </>
      )}
    </Box>
  );
}
