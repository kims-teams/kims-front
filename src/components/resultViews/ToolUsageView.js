"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "index", headerName: "순번", flex: 0.6 },
  { field: "versionNo", headerName: "VersionNo", flex: 0.9 },
  { field: "toolId", headerName: "Tool Id", flex: 0.8 },
  { field: "workcenterCode", headerName: "작업장코드", flex: 1.1 },
  { field: "seizeTime", headerName: "SeizeTime", flex: 1 },
  { field: "releaseTime", headerName: "ReleaseTime", flex: 1 },
  { field: "toolList", headerName: "ToolList", flex: 0.8 },
  { field: "availables", headerName: "Availables", flex: 0.9 },
  { field: "capacity", headerName: "Capacity", flex: 0.9 },
  { field: "scenario", headerName: "시나리오", flex: 0.8 },
  { field: "toolSeizeLogId", headerName: "ToolSeizeLogId", flex: 1.1 },
];

const rows = [];

export default function ToolUsageView() {
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
