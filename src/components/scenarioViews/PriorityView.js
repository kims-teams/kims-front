"use client";

import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "순번", width: 100 },
  { field: "priority_id", headerName: "우선순위 그룹", width: 150 },
  { field: "factor_id", headerName: "우선순위", width: 150 },
  { field: "sequence", headerName: "우선순위 순서", width: 150 },
  { field: "description", headerName: "설명", width: 200 },
  { field: "scenario_id", headerName: "시나리오", width: 150 },
  { field: "config_id", headerName: "Config 아이디", width: 130 },
];

const rows = [];

export default function RoutingView() {
  const handleFetch = () => {
    console.log("🔍 데이터 가져오기 버튼 클릭됨");
    // 여기에 fetch() API 호출 가능
  };

  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      {/* 버튼 영역 */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
        <Button variant="outlined" onClick={handleFetch}>
          🔍 데이터 가져오기
        </Button>
      </Box>

      {/* 테이블 */}
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
