"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
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

  const columns = [
    { field: "id", headerName: "순번", width: 80 },
    { field: "email", headerName: "이메일", flex: 1 },
    { field: "name", headerName: "이름", flex: 1 },
    { field: "position", headerName: "역할", flex: 1.5 },
    {
      field: "edit",
      headerName: "수정",
      width: 120,
      renderCell: () => (
        <IconButton>
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "삭제",
      width: 120,
      renderCell: () => (
        <IconButton>
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: "reset",
      headerName: "Reset Password",
      width: 120,
      renderCell: () => (
        <IconButton>
          <RestartAltIcon fontSize="small" />
        </IconButton>
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
      {/* 상단 검색 및 추가 버튼 */}
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

      {/* 데이터 그리드 */}
      <Box sx={{ height: 400, width: "100%" }}>
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
