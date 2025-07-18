"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import ModifyUserModal from "app/user/menu/management/ModifyUserModal";
import AddUserModal from "app/user/menu/management/AddUserModal";
import DeleteUserModal from "app/user/menu/management/DeleteUserModal";
import useAuthRedirect from "../../../../hooks/useAuthRedirect";

export default function Management() {
  useAuthRedirect();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("http://52.78.234.7:8080/api/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error("사용자 목록 불러오기 실패:", err);
      });
  }, []);

  const filtered = users.filter((u) => {
    const query = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(query) ||
      u.email?.toLowerCase().includes(query) ||
      u.position?.toLowerCase().includes(query)
    );
  });

  const handleEdit = (row) => {
    setSelectedUser({ ...row, id: row.realId });
    setEditModalOpen(true);
  };

  const handleDelete = (row) => {
    setSelectedUser({ ...row, id: row.realId });
    setDeleteModalOpen(true);
  };

  const handleResetPassword = (row) => {
    alert(`${row.email}의 비밀번호 초기화 기능은 아직 구현되지 않았습니다.`);
  };

  const handleAddUser = (newUser) => {
    const token = localStorage.getItem("token");
    fetch("http://52.78.234.7:8080/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) throw new Error("등록 실패");
        return res.json();
      })
      .then((data) => {
        alert("사용자 등록 완료");
        setUsers((prev) => [...prev, data]);
      })
      .catch((err) => {
        console.error(err);
        alert("등록 실패");
      });
  };

  const handleUpdateUser = (savedUser) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === savedUser.id ? { ...user, ...savedUser } : user
      )
    );
    setEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "순번", width: 80 },
    { field: "name", headerName: "이름", flex: 1 },
    { field: "email", headerName: "이메일", flex: 1.5 },
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
    position: u.position || "",
    phone: u.phone || "",
    hireDate: u.hireDate ? u.hireDate.split("T")[0] : "",
    role: u.role || "",
    status: u.status || "",
  }));

  const emailListForEdit = users
    .filter((u) => u.id !== selectedUser?.realId)
    .map((u) => u.email);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Stack direction="row" spacing={1}>
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
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              console.log("검색:", search);
            }}
          >
            검색
          </Button>
        </Stack>
        <Button
          variant="contained"
          size="small"
          onClick={() => setAddModalOpen(true)}
        >
          + 사원 추가
        </Button>
      </Box>
      <Box sx={{ height: 785, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Box>

      <ModifyUserModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        userData={selectedUser}
        onSave={handleUpdateUser}
        emailList={emailListForEdit}
      />

      <AddUserModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddUser}
        emailList={users.map((u) => u.email)}
      />

      <DeleteUserModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        user={selectedUser}
        onDelete={(user) => {
          setUsers((prev) => prev.filter((u) => u.id !== user.id));
        }}
      />
    </Box>
  );
}
