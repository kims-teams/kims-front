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

const columns = [
  { field: "id", headerName: "순번", width: 100 },
  { field: "operationId", headerName: "공정 코드", width: 140 },
  { field: "operationName", headerName: "공정 명", width: 140 },
  { field: "runTime", headerName: "공정 실행 시간", width: 140 },
  { field: "runTimeUom", headerName: "실행 시간 단위", width: 140 },
  { field: "operationSeq", headerName: "공정 순서", width: 140 },
  { field: "operationType", headerName: "공정 유형", width: 140 },
  { field: "sourcingType", headerName: "SourcingType", width: 140 },
  { field: "scenarioId", headerName: "시나리오", width: 140 },
  { field: "bopId", headerName: "Bop 아이디", width: 140 },
];

export default function OperationMasterView() {
  const { selectedScenario } = useScenarioStore();
  const [rows, setRows] = useState([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const entity = "operation";

  useEffect(() => {
    const fetchOperationData = async () => {
      if (!selectedScenario?.id) return;
      try {
        const res = await fetch(
          `http://52.78.234.7:8080/api/input/${entity}/${selectedScenario.id}`
        );
        if (!res.ok) throw new Error("Operation Master 불러오기 실패");
        const data = await res.json();
        const numberedRows = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setRows(numberedRows);
      } catch (err) {
        console.error("로딩 실패:", err);
      }
    };
    fetchOperationData();
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
      setRows(json.data);
      setMessage("파일 업로드 성공!");
      setMessageType("success");
      handleCloseDialog();
    } catch (err) {
      console.error("업로드 실패:", err);
      setMessage("업로드 중 오류가 발생했습니다.");
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
          data: rows,
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
          rows={rows}
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
