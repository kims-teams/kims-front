"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "순번", width: 80 },
  { field: "run_time", headerName: "공정 실행 시간", width: 130 },
  { field: "run_time_uom", headerName: "실행 시간 단위", width: 130 },
  { field: "wait_time_uom", headerName: "대기 시간 단위", width: 130 },
  { field: "transfer_time_uom", headerName: "이동 시간 단위", width: 130 },
  { field: "scenario_id", headerName: "시나리오", width: 120 },
  { field: "sourcing_type", headerName: "SourcingType", width: 130 },
  { field: "operation_id", headerName: "공정 코드", width: 130 },
  { field: "operation_name", headerName: "공정 명", width: 130 },
  { field: "operation_type", headerName: "공정 유형", width: 130 },
  { field: "operation_seq", headerName: "공정 순서", width: 120 },
  { field: "site_id2", headerName: "플랜트", width: 100 },
];

const rows = [];

export default function OperationMasterView() {
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
