"use client";

import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "순번", width: 80 },
  { field: "to_part_id", headerName: "생산 제품 코드", width: 130 },
  { field: "operation_id", headerName: "공정 코드", width: 130 },
  { field: "out_qty", headerName: "생산 량", width: 100 },
  { field: "out_uom", headerName: "생산 단위", width: 100 },
  { field: "from_part_id", headerName: "투입 제품 코드", width: 130 },
  { field: "in_qty", headerName: "투입 량", width: 100 },
  { field: "in_uom", headerName: "투입 량 단위", width: 100 },
  { field: "to_part_name", headerName: "생산 제품명", width: 130 },
  { field: "from_part_name", headerName: "투입 제품명", width: 130 },
  { field: "zseq", headerName: "순서", width: 80 },
  { field: "scenario_id", headerName: "시나리오", width: 100 },
  { field: "from_part_level", headerName: "FromPartLevel", width: 120 },
  { field: "to_part_level", headerName: "ToPartLevel", width: 120 },
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
