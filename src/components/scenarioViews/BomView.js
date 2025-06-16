"use client";

import { useEffect, useState } from "react";
import useScenarioStore from "../../hooks/useScenarioStore";
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
  { field: "to_part_id", headerName: "생산 제품 코드", width: 130 },
  { field: "operation_id", headerName: "공정 코드", width: 130 },
  { field: "out_qty", headerName: "생산 량", width: 100 },
  { field: "out_uom", headerName: "생산량 단위", width: 100 },
  { field: "from_part_id", headerName: "투입 제품 코드", width: 130 },
  { field: "in_qty", headerName: "투입 량", width: 100 },
  { field: "in_uom", headerName: "투입 량 단위", width: 100 },
  { field: "to_part_name", headerName: "생산 제품명", width: 130 },
  { field: "from_part_name", headerName: "투입 제품명", width: 130 },
  { field: "zseq", headerName: "순서", width: 80 },
  { field: "scenario_id", headerName: "시나리오", width: 100 },
  { field: "from_part_level", headerName: "FromPartLevel", width: 120 },
  { field: "to_part_level", headerName: "ToPartLevel", width: 120 },
  { field: "bop_id", headerName: "Bop 아이디", width: 100 },
];

export default function BomView() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const { selectedScenarioId, bomData, setBomData, resetBomData } =
    useScenarioStore();

  // 🔥 시나리오가 선택될 때마다 BOM 데이터 패치
  useEffect(() => {
    const fetchBomData = async () => {
      if (!selectedScenarioId) return;
      try {
        const res = await fetch(
          `http://localhost:8080/api/bom/${selectedScenarioId}`
        );
        if (!res.ok) throw new Error("BOM 데이터 불러오기 실패");

        const data = await res.json();
        setBomData(data);
      } catch (err) {
        console.error("BOM 로딩 실패:", err);
      }
    };
    fetchBomData();
  }, [selectedScenarioId]);

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
      setBomData(data); // 🔥 전역 상태로 저장
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
    if (!selectedScenarioId) {
      setMessage("시나리오가 선택되지 않았습니다.");
      setMessageType("error");
      return;
    }

    try {
      await fetch("http://127.0.0.1:8080/api/input-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario_id: selectedScenarioId,
          category: "bom",
          data: bomData,
        }),
      });

      setMessage(" 저장 완료!");
      setMessageType("success");
    } catch (err) {
      console.error("저장 실패", err);
      setMessage(" 저장 중 오류가 발생했습니다.");
      setMessageType("error");
    }
  };

  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
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
        rows={bomData || []}
        columns={columns}
        getRowId={(row) => row.id || Math.random()}
        pageSize={10}
        rowHeight={40}
        disableRowSelectionOnClick
        sx={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
      />
    </Box>
  );
}
