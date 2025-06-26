"use client";

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function NoticeView() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [targetPost, setTargetPost] = useState(null);
  const [targetPostId, setTargetPostId] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const loadNotices = async () => {
<<<<<<< rlayss-30
    const res = await fetch(
      "http://localhost:8080/api/post/post-category/사내공지"
    );
=======
    const res = await fetch("http://localhost:8080/api/post/post-category/사내공지");
>>>>>>> master
    const data = await res.json();
    setNotices(data);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleCreatePost = async () => {
    if (role === "USER") return;

    try {
      const res = await fetch(`http://localhost:8080/api/post?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          categoryName: "사내공지",
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        alert("작성 실패: " + msg);
        return;
      }

      setSuccessDialogOpen(true);
      setOpenDialog(false);
      setForm({ title: "", content: "" });
      loadNotices();
    } catch (err) {
      console.error("요청 중 오류 발생", err);
    }
  };

  const requestDelete = (id) => {
    setTargetPostId(id);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (role === "USER" || !targetPostId) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/post/${targetPostId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        alert("삭제 실패: " + msg);
        return;
      }

      setConfirmDialogOpen(false);
      setTargetPostId(null);
      loadNotices();
    } catch (err) {
      console.error("삭제 오류", err);
    }
  };

  const handleEdit = (post) => {
    setTargetPost(post);
    setForm({ title: post.title, content: post.content });
    setEditDialogOpen(true);
  };

  const handleUpdatePost = async () => {
    if (!targetPost) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/post/${targetPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: form.title,
            content: form.content,
          }),
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        alert("수정 실패: " + msg);
        return;
      }

      setEditDialogOpen(false);
      setForm({ title: "", content: "" });
      loadNotices();
    } catch (err) {
      console.error("수정 오류", err);
    }
  };

  const renderDialog = ({
    open,
    title,
    onClose,
    onConfirm,
    confirmText = "확인",
    cancelText = "취소",
    children,
    dialogType = "default",
  }) => (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={
        dialogType === "success" || dialogType === "confirm" ? "xs" : "sm"
      }
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          {title.includes("완료") && (
            <CheckCircleIcon sx={{ color: "green" }} />
          )}
          <Typography fontWeight="bold" fontSize="1.2rem">
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        {cancelText && (
          <Button onClick={onClose} variant="outlined" color="inherit">
            {cancelText}
          </Button>
        )}
        <Button onClick={onConfirm} variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          📌 공지 게시판
        </Typography>
        {role !== "USER" && (
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => setOpenDialog(true)}
            sx={{ borderRadius: 2 }}
          >
            새 공지
          </Button>
        )}
      </Stack>

      {notices.length === 0 ? (
        <Typography color="text.secondary">등록된 공지가 없습니다.</Typography>
      ) : (
        notices.map((post) => (
          <Paper
            key={post.id}
            elevation={1}
            sx={{ p: 3, mb: 2, borderRadius: 2, backgroundColor: "#fafafa" }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {post.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.writerName} · {post.createdAt}
                </Typography>
              </Box>
              {role !== "USER" && (
                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => handleEdit(post)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => requestDelete(post.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              )}
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Typography sx={{ whiteSpace: "pre-wrap" }}>
              {post.content}
            </Typography>
          </Paper>
        ))
      )}

      {renderDialog({
        open: openDialog,
        title: "📝 새 공지 작성",
        onClose: () => setOpenDialog(false),
        onConfirm: handleCreatePost,
        confirmText: "등록",
        children: (
          <Stack spacing={2} mt={1}>
            <TextField
              label="제목"
              fullWidth
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextField
              label="내용"
              fullWidth
              multiline
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </Stack>
        ),
      })}

      {renderDialog({
        open: successDialogOpen,
        title: "작성 완료",
        onClose: () => setSuccessDialogOpen(false),
        onConfirm: () => setSuccessDialogOpen(false),
        cancelText: "",
        confirmText: "확인",
        dialogType: "success",
        children: <Typography>공지글이 성공적으로 등록되었습니다.</Typography>,
      })}

      {renderDialog({
        open: editDialogOpen,
        title: "✏️ 공지 수정",
        onClose: () => setEditDialogOpen(false),
        onConfirm: handleUpdatePost,
        confirmText: "저장",
        children: (
          <Stack spacing={2} mt={1}>
            <TextField
              label="제목"
              fullWidth
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextField
              label="내용"
              fullWidth
              multiline
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </Stack>
        ),
      })}

      {renderDialog({
        open: confirmDialogOpen,
        title: "⚠️ 삭제 확인",
        onClose: () => setConfirmDialogOpen(false),
        onConfirm: confirmDelete,
        confirmText: "삭제",
        dialogType: "confirm",
        children: (
          <>
            <Typography>
              <b>
                {notices.find((n) => n.id === targetPostId)?.title || "공지"}
              </b>
              를 삭제하시겠습니까?
            </Typography>
            <Typography fontSize="0.9rem" color="text.secondary">
              삭제 후에는 복구할 수 없습니다.
            </Typography>
          </>
        ),
      })}
    </Box>
  );
}
