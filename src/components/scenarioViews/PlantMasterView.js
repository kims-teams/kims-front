"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "순번", width: 80 },
  { field: "site_id", headerName: "플랜트", width: 100 },
  { field: "site_name", headerName: "사이트명", width: 150 },
  { field: "scenario_id", headerName: "시나리오", width: 100 },
  { field: "bop_id", headerName: "Bop 아이디", width: 100 },
];

export default function PlantMasterView() {
  const [rows, setRows] = useState([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // or "error"

  const handleOpenDialog = () => setUploadDialogOpen(true);
  const handleCloseDialog = () => {
    setUploadDialogOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage(" 파일을 선택해주세요");
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    const fileName = selectedFile.name;

    try {
      const res = await fetch(
        `http://127.0.0.1:8080/api/input-file/${fileName}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("업로드 실패");

      const data = await res.json();
      setRows(data);
      setMessage(" 파일 업로드 성공!");
      setMessageType("success");
      handleCloseDialog();
    } catch (err) {
      console.error("파일 업로드 실패", err);
      setMessage(" 업로드 중 문제가 발생했습니다.");
      setMessageType("error");
    }
  };

  const handleSave = async () => {
    try {
      await fetch("http://127.0.0.1:8080/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rows),
      });
      setMessage(" 저장 완료");
      setMessageType("success");
    } catch (err) {
      console.error("저장 실패", err);
      setMessage(" 저장 중 오류가 발생했습니다.");
      setMessageType("error");
    }
  };

  return (
    <Box sx={{ width: "100%", overflow: "auto", p: 2 }}>
      {message && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Alert
            severity={messageType}
            onClose={() => setMessage("")}
            sx={{ maxWidth: 400, width: "100%" }}
          >
            {message}
          </Alert>
        </Box>
      )}

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
