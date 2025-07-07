"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useScenarioStore } from "hooks/useScenarioStore";
import { useEffect, useState } from "react";

const columns = [
  { field: "index", headerName: "순번", flex: 0.6 },
  { field: "toolId", headerName: "Tool Id", flex: 0.8 },
  { field: "durationMinute", headerName: "사용시간", flex: 1 },
  { field: "startTime", headerName: "시작시간", flex: 0.9 },
  { field: "endTime", headerName: "종료시간", flex: 0.9 },
  { field: "remarks", headerName: "비고", flex: 1.1 },
];

export default function ToolUsageView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedScenario } = useScenarioStore();

  useEffect(() => {
    if (!selectedScenario) return;

    const token = localStorage.getItem("token");
    fetch(
      `http://52.78.234.7:8080/api/simulation/tool-usage?scenario-id=${selectedScenario.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("서버 오류");
        return res.json();
      })
      .then((data) => {
        const withIndex = data.map((item, idx) => ({
          ...item,
          index: idx + 1,
        }));
        setData(withIndex);
        setLoading(false);
      })
      .catch((err) => {
        console.error("데이터 받아오기 실패", err);
        setLoading(false);
      });
  }, [selectedScenario]);

  if (loading) return <div>로딩 중...</div>;
  return (
    <Box sx={{ width: "100%", overflow: "auto", mt: 6 }}>
      <DataGrid
        autoHeight
        rows={data}
        columns={columns}
        getRowId={(row) => row.id || Math.random()}
        pageSize={10}
        rowHeight={40}
        disableRowSelectionOnClick
        sx={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
        }}
      />
    </Box>
  );
}
