"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "순번", width: 80 },
  { field: "demand_id", headerName: "판매오더번호", width: 140 },
  { field: "part_id", headerName: "품목코드", width: 120 },
  { field: "part_name", headerName: "품목명", width: 130 },
  { field: "customer_id", headerName: "고객사", width: 130 },
  { field: "due_date", headerName: "납기일", width: 120 },
  { field: "demand_qty", headerName: "주문수량", width: 100 },
  { field: "uom", headerName: "단위", width: 80 },
  { field: "order_type", headerName: "주문유형", width: 120 },
  { field: "order_type_name", headerName: "주문유형내역", width: 140 },
  { field: "header_creation_date", headerName: "오더생성일(헤더)", width: 160 },
  { field: "scenario_id", headerName: "시나리오", width: 120 },
  { field: "site_id2", headerName: "플랜트", width: 100 },
];

const rows = [];

export default function SalesOrderView() {
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
