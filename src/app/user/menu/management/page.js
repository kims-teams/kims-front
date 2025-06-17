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

export default function Management() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error("사용자 목록 불러오기 실패:", err);
        alert("사용자 목록을 불러오지 못했습니다.");
      });
  }, []);

  const filtered = users.filter((u) => {
    const query = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(query) ||
      u.email?.toLowerCase().includes(query) ||
      u.position?.toLowerCase().includes(query) ||
      u.department?.toLowerCase().includes(query)
    );
  });

  const handleEdit = (row) => {
    console.log("수정 요청:", row);
  };

  const handleDelete = (row) => {
    if (confirm(`${row.name} 사용자를 삭제할까요?`)) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8080/api/user/${row.realId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("삭제 실패");
          setUsers((prev) => prev.filter((user) => user.id !== row.realId));
          alert("삭제가 완료되었습니다.");
        })
        .catch((err) => {
          console.error(err);
          alert("삭제 중 오류 발생");
        });
    }
  };

  const handleResetPassword = (row) => {
    alert(`${row.email}의 비밀번호 초기화 기능은 아직 구현되지 않았습니다.`);
  };

  const columns = [
    { field: "id", headerName: "순번", width: 80 },
    { field: "name", headerName: "이름", flex: 1 },
    { field: "email", headerName: "이메일", flex: 1.5 },
    { field: "department", headerName: "부서", flex: 1 },
    { field: "position", headerName: "직급", flex: 1 },
    { field: "phone", headerName: "연락처", flex: 1.2 },
    { field: "hireDate", headerName: "입사일", flex: 1 },
    { field: "role", headerName: "권한", flex: 0.8 },
    { field: "status", headerName: "상태", flex: 0.8 },
    {
      field: "edit",
      headerName: "수정",
      width: 80,
      renderCell: (params) => (
        <Tooltip title="수정">
          <IconButton onClick={() => handleEdit(params.row)} size="small">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "delete",
      headerName: "삭제",
      width: 80,
      renderCell: (params) => (
        <Tooltip title="삭제">
          <IconButton onClick={() => handleDelete(params.row)} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "reset",
      headerName: "비밀번호 초기화",
      width: 130,
      renderCell: (params) => (
        <Tooltip title="비밀번호 초기화">
          <IconButton
            onClick={() => handleResetPassword(params.row)}
            size="small"
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const rows = filtered.map((u, idx) => ({
    id: idx + 1,
    realId: u.id,
    name: u.name || "",
    email: u.email || "",
    department: u.department || "",
    position: u.position || "",
    phone: u.phone || "",
    hireDate: u.hireDate ? u.hireDate.split("T")[0] : "",
    role: u.role || "",
    status: u.status || "",
  }));

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="사용자 검색"
          sx={{ width: 300 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" size="small">
          + 사원 추가
        </Button>
      </Box>

      <Box sx={{ height: 550 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
}
