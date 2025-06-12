"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";

import HeaderBar from "../../../../components/HeaderBar";
import Sidebar from "../../../../components/Sidebar";
import ScenarioPanel from "../../../../components/ScenarioPanel";
import ScenarioSidebar from "../../../../components/ScenarioSidebar";

const viewComponentMap = {
  우선순위: dynamic(
    () => import("../../../../components/scenarioViews/PriorityView")
  ),
  "생산 라우팅": dynamic(
    () => import("../../../../components/scenarioViews/RoutingView")
  ),
  "작업장-도구 매핑관리": dynamic(
    () => import("../../../../components/scenarioViews/ToolMappingView")
  ),
  "작업장 마스터": dynamic(
    () => import("../../../../components/scenarioViews/WorkcenterMasterView")
  ),
  판매오더: dynamic(
    () => import("../../../../components/scenarioViews/SalesOrderView")
  ),
  공정순서: dynamic(
    () => import("../../../../components/scenarioViews/OperationSequenceView")
  ),
  "공정 마스터": dynamic(
    () => import("../../../../components/scenarioViews/OperationMasterView")
  ),
  "작업도구 마스터": dynamic(
    () => import("../../../../components/scenarioViews/ToolMasterView")
  ),
};

export default function ScenarioLayout({ children }) {
  const [selectedInput, setSelectedInput] = useState("우선순위");
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);

  const InputComponent = selectedInput ? viewComponentMap[selectedInput] : null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderBar />
      <Box sx={{ display: "flex", flex: 1, position: "relative" }}>
        <Sidebar />
        <ScenarioPanel />
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
            marginRight: isRightSidebarCollapsed ? "24px" : "260px",
            transition: "margin 0.2s ease",
          }}
        >
          {InputComponent ? (
            <InputComponent />
          ) : (
            <Typography>선택한 입력 항목이 유효하지 않습니다.</Typography>
          )}
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
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
          <ScenarioSidebar
            onSelect={setSelectedInput}
            collapsed={isRightSidebarCollapsed}
            setCollapsed={setIsRightSidebarCollapsed}
          />
        </Box>
      </Box>
    </Box>
  );
}
