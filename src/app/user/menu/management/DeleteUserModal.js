"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function DeleteUserModal({ open, onClose, user, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) return null;

  const handleDelete = async () => {
    if (isDeleting || !user?.id) return;

    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/user/${user.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "삭제 실패");
      }

      alert("✅ 사용자 삭제 완료");
      onDelete(user);
      onClose();
    } catch (err) {
      console.error("❌ 삭제 실패:", err);
      alert(`❌ 삭제 실패: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
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
        <Button onClick={onClose} color="inherit" disabled={isDeleting}>
          취소
        </Button>
        <Button onClick={handleDelete} color="error" disabled={isDeleting}>
          {isDeleting ? "삭제 중..." : "삭제"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
