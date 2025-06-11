"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "순번", width: 80 },
  { field: "workcenter_id", headerName: "작업장코드", width: 130 },
  { field: "workcenter_name", headerName: "호기명", width: 120 },
  { field: "workcenter_group", headerName: "호기그룹", width: 120 },
  { field: "workcenter_type", headerName: "호기유형", width: 120 },
  { field: "dispatcher_type", headerName: "디스패칭방식", width: 130 },
  { field: "workcenter_state", headerName: "호기상태", width: 120 },
  { field: "automation", headerName: "자동화 장비", width: 120 },
  { field: "scenario_id", headerName: "시나리오", width: 120 },
  { field: "site_id", headerName: "플랜트", width: 100 },
  { field: "factor_id", headerName: "우선순위 그룹", width: 130 },
];

const rows = [];

export default function WorkcenterMasterView() {
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
