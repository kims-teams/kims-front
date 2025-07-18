"use client";

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
import { useEffect, useState } from "react";
import { useScenarioStore } from "../../hooks/useScenarioStore";
import { eachWeekOfInterval } from "date-fns";

const columns = [
  { field: "id", headerName: "순번", width: 100 },
  { field: "toPartId", headerName: "생산 제품 코드", width: 120 },
  { field: "outQty", headerName: "생산 량", width: 120 },
  { field: "outUom", headerName: "생산량 단위", width: 120 },
  { field: "fromPartId", headerName: "투입 제품 코드", width: 120 },
  { field: "inQty", headerName: "투입 량", width: 120 },
  { field: "inUom", headerName: "투입 량 단위", width: 120 },
  { field: "toPartName", headerName: "생산 제품명", width: 120 },
  { field: "zseq", headerName: "순서", width: 120 },
  { field: "fromPartLevel", headerName: "FromPartLevel", width: 120 },
  { field: "toPartLevel", headerName: "ToPartLevel", width: 120 },
];

export default function BomView() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const { selectedScenario } = useScenarioStore();
  const [bomData, setBomData] = useState([]);
  const entity = "bom";

  useEffect(() => {
    const fetchBomData = async () => {
      if (!selectedScenario?.id) return;
      try {
        const res = await fetch(
          `http://52.78.234.7:8080/api/input/bom/${selectedScenario.id}`
        );
        if (!res.ok) throw new Error("BOM 데이터 불러오기 실패");
        const data = await res.json();
        const numberedRows = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setBomData(numberedRows);
      } catch (err) {
        console.error("BOM 로딩 실패:", err);
      }
    };
    fetchBomData();
  }, [selectedScenario]);

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
      setMessage("파일을 선택해주세요");
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch(
        `http://52.78.234.7:5000/api/input-file/${entity}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("업로드 실패");
      const json = await res.json();

      setBomData(json.data);

      setMessage("파일 업로드 성공!");
      setMessageType("success");
      handleCloseDialog();
    } catch (err) {
      console.error("파일 업로드 실패", err);
      setMessage("업로드 중 문제가 발생했습니다.");
      setMessageType("error");
    }
  };

  const handleSave = async () => {
    const scenarioId = selectedScenario?.id;
    if (!scenarioId) {
      setMessage("시나리오가 선택되지 않았습니다.");
      setMessageType("error");
      return;
    }

    try {
      const res = await fetch(`http://52.78.234.7:8080/api/input/${entity}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario_id: scenarioId,
          category: entity,
          data: bomData,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`서버 오류: ${res.status} - ${errorText}`);
      }

      setMessage("저장 완료!");
      setMessageType("success");
    } catch (err) {
      console.error("❌ 저장 실패", err);
      setMessage("저장 중 오류가 발생했습니다.");
      setMessageType("error");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
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
        <Button
          variant="contained"
          onClick={handleOpenDialog}
          sx={{
            bgcolor: "#1a3d7c",
            color: "#fff",
            "&:hover": {
              bgcolor: "#162f5d",
            },
          }}
        >
          데이터 가져오기
        </Button>
        <Button
          variant="outlined"
          onClick={handleSave}
          sx={{
            color: "#1a3d7c",
            borderColor: "#1a3d7c",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "#f0f4fa",
              borderColor: "#162f5d",
              color: "#162f5d",
            },
          }}
        >
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

      <Box
        sx={{
          height: "calc(100vh - 150px)",
          width: "100%",
          overflow: "auto",
          overflowY: "hidden",
        }}
      >
        <DataGrid
          rows={bomData}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={10}
          rowHeight={40}
          disableRowSelectionOnClick
          sx={{
            width: "100%",
            height: "100%",
            border: "1px solid #ccc",
          }}
        />
      </Box>
    </Box>
  );
}
