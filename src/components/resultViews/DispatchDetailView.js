"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "index", headerName: "순번", flex: 0.6 },
  { field: "salesOrder", headerName: "시나리오", flex: 0.9 },
  { field: "mergeLotLogIndex", headerName: "VersionNo", flex: 0.8 },
  { field: "orderQuantity", headerName: "호기그룹", flex: 1.1 },
  { field: "plannedOrderNo", headerName: "작업장코드", flex: 1 },
  { field: "orderType", headerName: "호기명", flex: 1 },
  { field: "itemCode", headerName: "DispatchingTime", flex: 0.8 },
  { field: "plant", headerName: "PresetId", flex: 0.9 },
  { field: "operation", headerName: "InitWipCnt", flex: 0.9 },
  { field: "routingGroup", headerName: "FilteredWipCnt", flex: 0.8 },
  { field: "routingCounter", headerName: "SelectedWipCnt", flex: 1.1 },
  { field: "workCenter", headerName: "SelectedWip", flex: 1.1 },
  { field: "plannedQty", headerName: "DispatchWipLog", flex: 1.1 },
  { field: "plannedScrapQty", headerName: "WorkcenterDispatchLogId", flex: 1.1 },
  
];

const rows = [];

export default function DispatchDetailView() {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "auto",
      }}
    >
      <Box sx={{ minWidth: 1800 }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id || Math.random()}
          pageSize={50}
          rowHeight={40}
          disableRowSelectionOnClick
          sx={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
          }}
        />
      </Box>
    </Box>
  );
}
