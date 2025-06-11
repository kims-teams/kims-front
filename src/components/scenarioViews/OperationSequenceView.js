"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "순번", width: 80 },
  { field: "operation_id", headerName: "공정 코드", width: 130 },
  { field: "operation_seq", headerName: "공정 순서", width: 110 },
  { field: "operation_type", headerName: "공정 유형", width: 130 },
  { field: "operation_name", headerName: "공정 명", width: 130 },
  { field: "routing_id", headerName: "Routing코드", width: 130 },
  { field: "scenario_id", headerName: "시나리오", width: 120 },
  { field: "site_id", headerName: "플랜트", width: 100 },
];

const rows = [];

export default function OperationSequenceView() {
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
