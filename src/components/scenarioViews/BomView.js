"use client";

import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "순번", width: 80 },
  { field: "to_part_id", headerName: "생산 제품 코드", width: 130 },
  { field: "operation_id", headerName: "공정 코드", width: 130 },
  { field: "out_qty", headerName: "생산 량", width: 100 },
  { field: "out_uom", headerName: "생산 단위", width: 100 },
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
