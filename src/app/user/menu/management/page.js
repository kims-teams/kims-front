"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function Management() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://192.169.10.152:8080/api/user", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, []);

  const filteredUsers = user.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.position.toLowerCase().includes(search.toLowerCase())
  );

  // 버튼 핸들러
  const handleEdit = (row) => {
    console.log("✏️ 수정:", row);
  };

  const handleDelete = (row) => {
    if (confirm(`${row.name} 사용자를 삭제할까요?`)) {
      console.log("🗑️ 삭제:", row);
    }
  };

  const handleResetPassword = (row) => {
    if (confirm(`${row.email} 비밀번호 초기화할까요?`)) {
      console.log("🔁 비밀번호 초기화:", row);
    }
  };

  const columns = [
    { field: "id", headerName: "순번", width: 80 },
    { field: "email", headerName: "사용자 ID", flex: 1 },
    { field: "name", headerName: "이름", flex: 1 },
    { field: "position", headerName: "역할", flex: 1.5 },
    {
      field: "edit",
      headerName: "수정",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="수정">
          <IconButton
            onClick={() => handleEdit(params.row)}
            size="small"
            sx={{ color: "#666" }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "delete",
      headerName: "삭제",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="삭제">
          <IconButton
            onClick={() => handleDelete(params.row)}
            size="small"
            sx={{ color: "#666" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "reset",
      headerName: "Reset Password",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="비밀번호 초기화">
          <IconButton
            onClick={() => handleResetPassword(params.row)}
            size="small"
            sx={{ color: "#666" }}
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const rows = filteredUsers.map((u, idx) => ({
    id: idx + 1,
    email: u.email,
    name: u.name,
    position: u.position,
  }));

  return (
    <Box sx={{ p: 2 }}>
      {/* 검색 및 추가 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="검색"
          sx={{ width: 300 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "#999" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" size="small">
          + 추가
        </Button>
      </Box>

      {/* 테이블 */}
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
}

export default Management;
