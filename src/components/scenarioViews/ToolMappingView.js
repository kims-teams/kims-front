"use client";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const columns = [
  "순번",
  "Tool 사이즈",
  "시나리오",
  "품목명",
  "Tool Id",
  "플랜트",
  "품목코드",
];

export default function ToolMappingView() {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" gutterBottom sx={{ px: 1 }}>
        작업장-도구 매핑관리 입력 데이터
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          flex: 1,
          width: "100%",
          overflowX: "auto",
          border: "1px solid #ccc",
          maxHeight: "calc(100vh - 160px)",
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "13px",
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #ccc",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 140,
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {[...Array(20)].map((_, rowIdx) => (
              <TableRow key={rowIdx} hover>
                {columns.map((_, colIdx) => (
                  <TableCell
                    key={colIdx}
                    sx={{
                      fontSize: "12px",
                      border: "1px solid #ddd",
                    }}
                  >
                    -
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
