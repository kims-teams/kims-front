"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "index", headerName: "순번", flex: 0.6 },
  { field: "scenario", headerName: "시나리오", flex: 0.9 },
  { field: "mergeLotLogId", headerName: "MergeLotLogId", flex: 0.8 },
  { field: "salesOrderNo", headerName: "판매오더번호", flex: 1.1 },
  { field: "routingCode", headerName: "Routing코드", flex: 1 },
  { field: "operationCode", headerName: "공정코드", flex: 1 },
  { field: "operationName", headerName: "공정명", flex: 0.8 },
  { field: "beforeLotId", headerName: "변경전 LOT ID", flex: 0.9 },
  { field: "inputProductCode", headerName: "투입제품코드", flex: 0.9 },
  { field: "inputProductName", headerName: "투입제품명", flex: 0.8 },
  { field: "fromQty", headerName: "FromQTY", flex: 1.1 },
  { field: "fromUom", headerName: "FromUOM", flex: 1.1 },
  { field: "mergeLotId", headerName: "MergeLOTId", flex: 1.1 },
  { field: "outputProductCode", headerName: "생산제품코드", flex: 1.1 },
  { field: "outputProductName", headerName: "생산제품명", flex: 1.1 },
  { field: "toQty", headerName: "ToQty", flex: 1.1 },
  { field: "toUom", headerName: "ToUom", flex: 1.1 },
  { field: "mergeInTime", headerName: "MergeInTime", flex: 1.1 },
  { field: "createTime", headerName: "CreateTime", flex: 1.1 },
  { field: "updateTime", headerName: "UpdateTime", flex: 1.1 },
];

const rows = [];

export default function LotMergeHistorytView() {
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
