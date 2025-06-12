"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Input,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "priority_id", headerName: "순번", width: 140 },
  { field: "factor_id", headerName: "우선순위 그룹", width: 150 },
  { field: "Field", headerName: "우선순위 순서", width: 150 },
  { field: "order_type", headerName: "주문유형", width: 150 },
  { field: "description", headerName: "설명", width: 200 },
  { field: "scenario_id", headerName: "시나리오", width: 150 },
];

export default function PriorityView() {
  const [rows, setRows] = useState([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpenDialog = () => setUploadDialogOpen(true);
  const handleCloseDialog = () => {
    setUploadDialogOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setRows(data);
      handleCloseDialog();
    } catch (err) {
      console.error("파일 업로드 실패", err);
    }
  };

  const handleSave = async () => {
    try {
      await fetch("/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rows),
      });
      alert("저장 완료");
    } catch (err) {
      console.error("저장 실패", err);
    }
  };

  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={handleOpenDialog}>
          데이터 가져오기
        </Button>
        <Button variant="outlined" onClick={handleSave}>
          저장
        </Button>
      </Stack>

      <Dialog open={uploadDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>파일 업로드</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 1 }}>
            클릭하거나 파일을 선택해서 업로드하세요.
          </Typography>
          <Input type="file" onChange={handleFileChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            업로드
          </Button>
        </DialogActions>
      </Dialog>

      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        getRowId={(row) => row.priority_id || Math.random()}
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
