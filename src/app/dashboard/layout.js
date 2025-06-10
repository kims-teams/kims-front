"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ScenarioPanel from "../../components/ScenarioPanel";
import RightSidebar from "../../components/RightSidebar";
import { Box, Typography } from "@mui/material";

export default function DashboardLayout({ children }) {
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);

  const shouldShowScenarioPanel = [
    "시나리오 관리",
    "실행 관리",
    "실행 결과",
  ].includes(selectedTab);

  const shouldShowRightSidebar =
    selectedTab === "실행 결과" && isRightSidebarOpen;

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 50px)",
        paddingTop: "50px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Sidebar onSelect={setSelectedTab} />

      {shouldShowScenarioPanel && <ScenarioPanel />}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          marginRight:
            shouldShowRightSidebar && !isRightSidebarCollapsed
              ? "260px"
              : shouldShowRightSidebar && isRightSidebarCollapsed
                ? "24px"
                : 0,
          transition: "margin 0.2s ease",
        }}
      >
        {selectedTab === "실행 결과" && selectedResult ? (
          <Typography variant="h6">{selectedResult}</Typography>
        ) : (
          children
        )}
      </Box>

      {shouldShowRightSidebar && (
        <Box
          sx={{
            position: "absolute",
            top: "50px",
            bottom: 0,
            right: 0,
            width: isRightSidebarCollapsed ? 24 : 260,
            zIndex: 1200,
            bgcolor: "#fff",
            borderLeft: "1px solid #ddd",
            boxShadow: "-2px 0 4px rgba(0,0,0,0.05)",
            transition: "width 0.2s ease",
            overflow: "visible", 
          }}
        >
          <RightSidebar
            onSelect={setSelectedResult}
            collapsed={isRightSidebarCollapsed}
            setCollapsed={setIsRightSidebarCollapsed}
          />
        </Box>
      )}
    </Box>
  );
}
