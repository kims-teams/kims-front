"use client";

import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "순번", width: 80 },
  { field: "operation_id", headerName: "공정 코드", width: 130 },
  { field: "operation_name", headerName: "공정 명", width: 130 },
  { field: "run_time", headerName: "공정 실행 시간", width: 130 },
  { field: "run_time_uom", headerName: "실행 시간 단위", width: 130 },
  { field: "operation_seq", headerName: "공정 순서", width: 110 },
  { field: "operation_type", headerName: "공정 유형", width: 130 },
  { field: "sourcing_type", headerName: "SourcingType", width: 130 },
  { field: "scenario_id", headerName: "시나리오", width: 120 },
  { field: "bop_id", headerName: "Bop 아이디", width: 100 },
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
