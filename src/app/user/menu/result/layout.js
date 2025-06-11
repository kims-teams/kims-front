"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";

import HeaderBar from "../../../../components/HeaderBar";
import Sidebar from "../../../../components/Sidebar";
import ScenarioPanel from "../../../../components/ScenarioPanel";
import ResultSidebar from "../../../../components/ResultSidebar";

// 결과 항목 매핑
const viewComponentMap = {
  "작업도구 사용 내역": dynamic(
    () => import("../../../../components/resultViews/ToolUsageView")
  ),
  "공정 별 생산 수량 조회": dynamic(
    () => import("../../../../components/resultViews/ProductionCountView")
  ),
  "LOT 병합 이력": dynamic(
    () => import("../../../../components/resultViews/LotMergeHistoryView")
  ),
  "계획오더 조회": dynamic(
    () => import("../../../../components/resultViews/OrderPlanView")
  ),
  "작업장별 Dispatch 내역": dynamic(
    () => import("../../../../components/resultViews/DispatchDetailView")
  ),
  "투입 재공 내역": dynamic(
    () => import("../../../../components/resultViews/InputWipView")
  ),
  "작업장별 생산 계획": dynamic(
    () => import("../../../../components/resultViews/WorkcenterPlanView")
  ),
  "일별 투입 계획": dynamic(
    () => import("../../../../components/resultViews/DailyInputPlanView")
  ),
  "작업장 가동 현황": dynamic(
    () => import("../../../../components/resultViews/WorkcenterStatusView")
  ),
};

export default function ResultLayout({ children }) {
  const [selectedResult, setSelectedResult] = useState(null);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);

  const ResultComponent = selectedResult
    ? viewComponentMap[selectedResult]
    : null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderBar />
      <Box sx={{ display: "flex", flex: 1, position: "relative" }}>
        <Sidebar />
        <ScenarioPanel />
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
            marginRight: isRightSidebarOpen
              ? isRightSidebarCollapsed
                ? "24px"
                : "260px"
              : 0,
            transition: "margin 0.2s ease",
          }}
        >
          {selectedResult ? (
            ResultComponent ? (
              <ResultComponent />
            ) : (
              <Typography>선택한 결과 항목이 유효하지 않습니다.</Typography>
            )
          ) : (
            children
          )}
        </Box>
        {isRightSidebarOpen && (
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
            <ResultSidebar
              onSelect={setSelectedResult}
              collapsed={isRightSidebarCollapsed}
              setCollapsed={setIsRightSidebarCollapsed}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
