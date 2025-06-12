"use client";

import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "순번", width: 80 },
  { field: "routing_id", headerName: "Routing코드", width: 130 },
  { field: "part_id", headerName: "품목코드", width: 120 },
  { field: "operation_id", headerName: "공정 코드", width: 120 },
  { field: "routing_group", headerName: "Routing그룹", width: 120 },
  { field: "workcenter_id", headerName: "작업장코드", width: 130 },
  { field: "tact_time", headerName: "생산 간격", width: 120 },
  { field: "tact_time_uom", headerName: "생산 간격 단위", width: 130 },
  { field: "scenario_id", headerName: "시나리오", width: 120 },
  { field: "resource_id", headerName: "Resource 아이디", width: 130 },
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
