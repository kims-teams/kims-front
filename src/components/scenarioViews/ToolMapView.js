"use client";

import { useEffect, useState } from "react";
import {
  Box, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Input, Stack, Alert
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useScenarioStore } from "../../hooks/useScenarioStore";

export default function ToolMapView() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [data, setData] = useState([]);

  const { selectedScenario } = useScenarioStore();

  useEffect(() => {
    const scenarioId = selectedScenario?.scenario?.id;
    if (!scenarioId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/tool-map/${scenarioId}`);
        if (!res.ok) throw new Error("작업장-도구 매핑 데이터 불러오기 실패");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedScenario]);

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch(`http://localhost:8080/api/input-file/${selectedFile.name}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("업로드 실패");
      const result = await res.json();
      setData(result);
      setMessage("업로드 성공!");
      setMessageType("success");
      setUploadDialogOpen(false);
    } catch (err) {
      setMessage("업로드 실패");
      setMessageType("error");
    }
  };

  const handleSave = async () => {
    const scenarioId = selectedScenario?.scenario?.id;
    if (!scenarioId) return;

    try {
      await fetch("http://localhost:8080/api/input-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario_id: scenarioId,
          category: "tool-map",
          data: data,
        }),
      });

      setMessage("저장 완료!");
      setMessageType("success");
    } catch (err) {
      setMessage("저장 실패");
      setMessageType("error");
    }
  };

  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      {message && (
        <Alert severity={messageType} onClose={() => setMessage("")}>
          {message}
        </Alert>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setUploadDialogOpen(true)}>
          데이터 가져오기
        </Button>
        <Button variant="outlined" onClick={handleSave}>
          저장
        </Button>
      </Stack>

      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
        <DialogTitle>파일 업로드</DialogTitle>
        <DialogContent>
          <Input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>취소</Button>
          <Button onClick={handleUpload} variant="contained">업로드</Button>
        </DialogActions>
      </Dialog>

      <DataGrid
        autoHeight
        rows={data || []}
        columns={Object.keys(data[0] || {}).map((key) => ({
          field: key,
          headerName: key,
          width: 120,
        }))}
        getRowId={(row) => row.id || Math.random()}
        pageSize={10}
      />
    </Box>
  );
}
