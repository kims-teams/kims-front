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
  Stack,
  IconButton,
  Divider,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";

export default function NoticeView() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [targetPost, setTargetPost] = useState(null);
  const [targetPostId, setTargetPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const router = useRouter();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const loadNotices = async () => {
    const res = await fetch(
      "http://localhost:8080/api/post/post-category/사내공지"
    );
    const data = await res.json();
    setNotices(data);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentNotices = filteredNotices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredNotices.length / postsPerPage);

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
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          justifyContent: "flex-end",
          gap: 1.5,
        }}
      >
        {cancelText && (
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ borderColor: "#1a3d7c", color: "#1a3d7c" }}
          >
            {cancelText}
          </Button>
        )}
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: "#1a3d7c",
            "&:hover": { bgcolor: "#162f5d" },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box p={4}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={3}
        spacing={2}
      >
        <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
          공지 게시판
        </Typography>

        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            placeholder="제목 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 240 }}
          />
          <Button
            onClick={() => setCurrentPage(1)}
            variant="outlined"
            sx={{
              color: "#1a3d7c",
              borderColor: "#1a3d7c",
              "&:hover": {
                backgroundColor: "#f0f4fa",
                borderColor: "#162f5d",
              },
              fontWeight: "bold",
            }}
          >
            검색
          </Button>
          {role !== "USER" && (
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => setOpenDialog(true)}
              sx={{
                borderRadius: 2,
                bgcolor: "#1a3d7c",
                "&:hover": { bgcolor: "#162f5d" },
              }}
            >
              새 공지
            </Button>
          )}
        </Stack>
      </Stack>

      {/* 게시글 리스트 */}
      {filteredNotices.length === 0 ? (
        <Typography color="text.secondary">등록된 공지가 없습니다.</Typography>
      ) : (
        <Box>
          {currentNotices.map((post, idx) => (
            <Box key={post.id}>
              <Box
                sx={{
                  py: 1.6,
                  px: 1,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    onClick={() =>
                      router.push(`/user/menu/community/${post.id}`)
                    }
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ color: "#1a3d7c", mb: 0.2 }}
                    >
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.writerName || "작성자"} ·{" "}
                      {new Date(post.createdAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>

                  {role !== "USER" && (
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => {
                          setTargetPost(post);
                          setForm({ title: post.title, content: post.content });
                          setEditDialogOpen(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setTargetPostId(post.id);
                          setConfirmDialogOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  )}
                </Stack>
              </Box>
              {idx !== currentNotices.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      )}

      {/* 페이지네이션 */}
      {filteredNotices.length > postsPerPage && (
        <Stack mt={4} alignItems="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#1a3d7c",
                fontWeight: 600,
                borderRadius: "50%",
                minWidth: 36,
                height: 36,
                "&.Mui-selected": {
                  backgroundColor: "#1a3d7c",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#162f5d",
                  },
                },
              },
            }}
          />
        </Stack>
      )}

      {/* 다이얼로그들: 등록 / 완료 / 수정 / 삭제 */}
      {renderDialog({
        open: openDialog,
        title: "📝 새 공지 작성",
        onClose: () => setOpenDialog(false),
        onConfirm: async () => {
          if (role === "USER") return;
          try {
            const res = await fetch(
              `http://localhost:8080/api/post?email=${email}`,
              {
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
              }
            );
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
            console.error("작성 오류", err);
          }
        },
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
        onConfirm: async () => {
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
        },
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
        onConfirm: async () => {
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
        },
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
