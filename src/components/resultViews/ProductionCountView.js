"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "index", headerName: "순번", flex: 0.6 },
  { field: "versionNo", headerName: "VersionNo", flex: 0.9 },
  { field: "toolId", headerName: "품목코드", flex: 0.8 },
  { field: "workcenterCode", headerName: "품목명", flex: 1.1 },
  { field: "seizeTime", headerName: "공정코드", flex: 1 },
  { field: "releaseTime", headerName: "공정명", flex: 1 },
  { field: "toolList", headerName: "투입량", flex: 0.8 },
  { field: "availables", headerName: "투입량단위", flex: 0.9 },
  { field: "capacity", headerName: "생산량", flex: 0.9 },
  { field: "quantityUnit", headerName: "생산량단위", flex: 0.8 },
  { field: "targetDate", headerName: "TargetDate", flex: 1.1 },
  { field: "inboundTarget", headerName: "입고목표", flex: 1.1 },
  { field: "orderNo", headerName: "주문번호", flex: 1.1 },
  { field: "model", headerName: "기종", flex: 1.1 },
  {field: "materialInfo",headerName: "자재(모품)내역",flex: 1.1, },
  {field: "orderMaterialCode", headerName: "주문자재코드", flex: 1.1,},
  { field: "shipmentDate", headerName: "출하예정일", flex: 1.1 },
  { field: "stepTargetId",headerName: "StepTargetId", flex: 1.1,},
  { field: "productCode", headerName: "생산제품코드", flex: 1.1 },
  { field: "productName", headerName: "생산제품명", flex: 1.1 },
  { field: "orderQty", headerName: "주문수량", flex: 1.1 },
  { field: "partType", headerName: "Part유형", flex: 1.1 },
  { field: "scenario", headerName: "시나리오", flex: 1.1 },
];

const rows = [];

export default function ProductionCountView() {
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
