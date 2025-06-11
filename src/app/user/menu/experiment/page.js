"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "version", headerName: "버전", flex: 1 },
  { field: "status", headerName: "상태", flex: 0.6 },
  { field: "duration", headerName: "소요시간", flex: 0.6 },
  { field: "startTime", headerName: "시작 시간", flex: 1 },
  { field: "endTime", headerName: "종료 시간", flex: 1 },
  { field: "error", headerName: "에러 메시지", flex: 1 },
  { field: "schedule", headerName: "스케줄", flex: 1 },
  { field: "userId", headerName: "사용자 ID", flex: 1 },
  { field: "result", headerName: "결과", flex: 0.5 },
  { field: "log", headerName: "로그", flex: 0.5 },
];

const rows = [];

export default function ExperimentPage() {
  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      <DataGrid
        autoHeight
        rows={rows}
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
