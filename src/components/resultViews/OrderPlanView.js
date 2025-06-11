"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "index", headerName: "순번", flex: 0.6 },
  { field: "salesOrder", headerName: "영업오더", flex: 0.9 },
  { field: "mergeLotLogIndex", headerName: "순번", flex: 0.8 },
  { field: "orderQuantity", headerName: "주문수량", flex: 1.1 },
  { field: "plannedOrderNo", headerName: "계획오더번호", flex: 1 },
  { field: "orderType", headerName: "오더유형", flex: 1 },
  { field: "itemCode", headerName: "품목코드", flex: 0.8 },
  { field: "plant", headerName: "플랜트", flex: 0.9 },
  { field: "operation", headerName: "작업공정", flex: 0.9 },
  { field: "routingGroup", headerName: "라우팅그룹", flex: 0.8 },
  { field: "routingCounter", headerName: "라우팅그룹카운터", flex: 1.1 },
  { field: "workCenter", headerName: "작업장", flex: 1.1 },
  { field: "plannedQty", headerName: "계획수량", flex: 1.1 },
  { field: "plannedScrapQty", headerName: "계획된스크랩수량", flex: 1.1 },
  { field: "unit", headerName: "단위", flex: 1.1 },
  { field: "startDate", headerName: "시작일자", flex: 1.1 },
  { field: "plannedTime", headerName: "계획시간", flex: 1.1 },
  { field: "endDate", headerName: "종료일자", flex: 1.1 },
  { field: "plannedEndTime", headerName: "계획종료시간", flex: 1.1 },
  { field: "sapMemo", headerName: "메모(SAP)", flex: 1.1 },
  { field: "scenario", headerName: "시나리오", flex: 1.1 },
  { field: "plantRepeat", headerName: "플랜트", flex: 1.1 },
  { field: "salesOrderNo", headerName: "판매오더번호", flex: 1.1 },
  { field: "model", headerName: "기종", flex: 1.1 },
  { field: "materialInfo", headerName: "자재(모품)내역", flex: 1.1 },
  { field: "priority", headerName: "우선순위", flex: 1.1 },
  { field: "customer", headerName: "고객사", flex: 1.1 },
  { field: "itemCodeRepeat", headerName: "품목코드", flex: 1.1 },
  { field: "operationCode", headerName: "공정코드", flex: 1.1 },
  { field: "operationName", headerName: "공정명", flex: 1.1 },
  { field: "workcenterCode", headerName: "작업장코드", flex: 1.1 },
  { field: "equipment", headerName: "호기명", flex: 1.1 },
  { field: "pldorId", headerName: "PldorId", flex: 1.1 },
  { field: "lockNo", headerName: "로크번호", flex: 1.1 },
  { field: "dueDate", headerName: "납기일", flex: 1.1 },
  { field: "spec", headerName: "규격", flex: 1.1 },
  { field: "blendType", headerName: "블렌딩타입", flex: 1.1 },
  { field: "printType", headerName: "인쇄유형", flex: 1.1 },
  { field: "capColor", headerName: "CAP색상", flex: 1.1 },
  { field: "bodyColor", headerName: "BODY색상", flex: 1.1 },
  { field: "inkCapColor", headerName: "잉크색상(CAP)", flex: 1.1 },
  { field: "inkBodyColor", headerName: "잉크색상(BODY)", flex: 1.1 },
  { field: "drollCode", headerName: "D/ROLL코드", flex: 1.1 },
  { field: "partType2", headerName: "PartType2", flex: 1.1 },
  { field: "customerName", headerName: "고객", flex: 1.1 },
  { field: "itemName", headerName: "품명", flex: 1.1 },
  { field: "totalProduction", headerName: "생산량누계", flex: 1.1 },
  { field: "lotNo", headerName: "로트번호", flex: 1.1 },
  { field: "orderSeq", headerName: "오더순번", flex: 1.1 },
];

const rows = [];

export default function OrderPlanView() {
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
