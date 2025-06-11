"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "순번", flex: 1 },
  { field: "part_id", headerName: "품목코드", flex: 1 },
  { field: "operation_id", headerName: "공정 코드", flex: 1 },
  { field: "routing_group", headerName: "Routing그룹", flex: 1 },
  { field: "routing_version", headerName: "Routing버전", flex: 1 },
  { field: "std_qty", headerName: "기본수량", flex: 1 },
  { field: "std_value", headerName: "표준값", flex: 1 },
  { field: "tact_time", headerName: "생산 간격", flex: 1 },
  { field: "tact_time_oum", headerName: "생산 간격 단위", flex: 1 },
  { field: "proc_time", headerName: "Unit당 생산 시간", flex: 1 },
  { field: "proc_time_oum", headerName: "단위당 생산 시간 단위", flex: 1 },
  { field: "utilization", headerName: "가동률", flex: 1 },
  { field: "efficiency", headerName: "효율", flex: 1 },
  { field: "scenario_id", headerName: "시나리오", flex: 1 },
  { field: "routing_id", headerName: "Routing코드", flex: 1 },
  { field: "workcenter_id", headerName: "작업장코드", flex: 1 },
  { field: "site_id", headerName: "플랜트", flex: 1 },
];

const rows = [];

export default function RoutingView() {
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
