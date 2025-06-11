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
  "VersionNo",
  "Tool Id",
  "작업장코드",
  "SeizeTime",
  "ReleaseTime",
  "ToolList",
  "Availables",
  "Capacity",
  "시나리오",
  "ToolSeizeLogId",
];

export default function ToolUsageView() {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" gutterBottom sx={{ px: 1 }}>
        작업도구 사용 내역
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          flex: 1,
          overflow: "auto",
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
