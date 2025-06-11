"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "priority_id", headerName: "순번", width: 140 },
  { field: "factor_id", headerName: "우선순위 그룹", width: 150 },
  { field: "Field", headerName: "우선순위 순서", width: 150 },
  { field: "order_type", headerName: "주문유형", width: 150 },
  { field: "description", headerName: "설명", width: 200 },
  { field: "scenario_id", headerName: "시나리오", width: 150 },
];

const rows = [];

export default function PriorityView() {
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
