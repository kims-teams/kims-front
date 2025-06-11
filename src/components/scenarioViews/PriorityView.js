"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "priority_id", headerName: "순번", flex: 1 },
  { field: "factor_id", headerName: "우선순위 그룹", flex: 1 },
  { field: "Field", headerName: "우선순위 순서", flex: 1 },
  { field: "order_type", headerName: "주문유형", flex: 1 },
  { field: "description", headerName: "설명", flex: 1 },
  { field: "scenario_id", headerName: "시나리오", flex: 1 },
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
