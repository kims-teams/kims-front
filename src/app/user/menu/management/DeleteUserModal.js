"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function DeleteUserModal({ open, onClose, user, onDelete }) {
  if (!user) return null;

  const handleDelete = () => {
    onDelete(user);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>사용자 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText>
          정말로 <strong>{user.name}</strong> 사용자를 삭제하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          취소
        </Button>
        <Button onClick={handleDelete} color="error">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}
