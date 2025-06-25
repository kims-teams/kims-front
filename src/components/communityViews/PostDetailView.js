"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuthRedirect from "hooks/useAuthRedirect";
import dayjs from "dayjs";

const charcoalLight = "#4a4a4a";
const charcoalLighter = "#6e6e6e";
const charcoalBg = "#f8f8f8";

export default function PostDetailView() {
  const { id } = useParams();
  useAuthRedirect();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);


  const [commentIdToDelete, setCommentIdToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    setUserId(storedUserId);
    setToken(storedToken);

    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/post/${id}`);
      const data = await res.json();
      setPost(data);
    } catch (err) {
      console.error("게시글 로딩 실패", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/comment/post/${id}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("댓글 로딩 실패", err);
    }
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;

    try {
      const res = await fetch(`http://localhost:8080/api/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: commentInput,
          postId: id,
          userId: localStorage.getItem("userId"),
        }),
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        console.error("댓글 등록 실패:", errorMsg);
        return;
      }

      setCommentInput("");
      fetchComments();
    } catch (err) {
      console.error("댓글 등록 중 에러:", err);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/comment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: editingContent,
            postId: parseInt(id),
            userId: parseInt(userId),
          }),
        }
      );
      if (!res.ok) throw new Error("댓글 수정 실패");
      setEditingCommentId(null);
      setEditingContent("");
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async () => {
    if (!commentIdToDelete) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/comment/${commentIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("댓글 삭제 실패");
      fetchComments();
      setOpenDeleteDialog(false);
      setCommentIdToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      p={3}
      sx={{
        backgroundColor: charcoalBg,
        minHeight: "100vh",
        maxWidth: 900,
        mx: "auto",
        fontFamily: "'Noto Sans KR', sans-serif",
        color: charcoalLight,
      }}
    >
      
      {post && (
        <Paper
          sx={{
            p: 4,
            mb: 5,
            borderRadius: 3,
            boxShadow: "0 4px 10px rgb(0 0 0 / 0.1)",
            backgroundColor: "#fff",
            color: charcoalLight,
          }}
          elevation={0}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="h4"
              fontWeight="700"
              sx={{ color: charcoalLight }}
              gutterBottom
            >
              {post.title}
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="subtitle2"
                sx={{ color: charcoalLight, fontWeight: "600" }}
              >
                작성자: {post.writerName}
              </Typography>
              <Typography variant="caption" sx={{ color: charcoalLighter }}>
                {post.createdAt
                  ? dayjs(post.createdAt).format("YYYY.MM.DD HH:mm")
                  : ""}
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: 1.6,
              color: charcoalLight,
            }}
          >
            {post.content}
          </Typography>
        </Paper>
      )}

      
      <Box>
        <Typography
          variant="h6"
          fontWeight="600"
          sx={{
            mb: 2,
            color: charcoalLight,
            borderBottom: `2px solid ${charcoalLight}`,
            pb: 1,
          }}
        >
          댓글 ({comments.length})
        </Typography>

        {comments.map((comment) => (
          <Paper
            key={comment.id}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              backgroundColor: "#fff",
              boxShadow: "0 1px 5px rgb(0 0 0 / 0.08)",
              position: "relative",
              color: charcoalLight,
            }}
            elevation={0}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "600", color: charcoalLight }}
              >
                {comment.writerName}
              </Typography>

              {parseInt(comment.writerId) === parseInt(userId) && (
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="댓글 수정"
                    size="small"
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditingContent(comment.content);
                    }}
                    sx={{
                      color: charcoalLight,
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "#e0e0e0" },
                      transition: "all 0.2s",
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    aria-label="댓글 삭제"
                    size="small"
                    onClick={() => {
                      setCommentIdToDelete(comment.id);
                      setOpenDeleteDialog(true);
                    }}
                    sx={{
                      color: "#b33a3a",
                      "&:hover": { backgroundColor: "#fceaea" },
                      transition: "all 0.2s",
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              )}
            </Stack>

            {editingCommentId === comment.id ? (
              <Box mt={1}>
                <TextField
                  fullWidth
                  multiline
                  size="small"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  sx={{
                    mt: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: charcoalBg,
                    },
                    color: charcoalLight,
                  }}
                  inputProps={{ style: { color: charcoalLight } }}
                />
                <Stack direction="row" spacing={1} mt={1}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: charcoalLight,
                      color: "#fff",
                      textTransform: "none",
                      fontWeight: "600",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: charcoalLighter,
                        boxShadow: "0 4px 12px rgb(74 74 74 / 0.4)",
                      },
                    }}
                    onClick={() => handleEditComment(comment.id)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: charcoalLight,
                      borderColor: charcoalLight,
                      textTransform: "none",
                      fontWeight: "600",
                      "&:hover": {
                        backgroundColor: charcoalBg,
                        borderColor: charcoalLighter,
                      },
                    }}
                    onClick={() => setEditingCommentId(null)}
                  >
                    취소
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Typography
                mt={1}
                sx={{
                  whiteSpace: "pre-line",
                  color: charcoalLight,
                  lineHeight: 1.5,
                }}
              >
                {comment.content}
              </Typography>
            )}
          </Paper>
        ))}

        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: "0 4px 14px rgb(0 0 0 / 0.08)",
          }}
        >
          <TextField
            fullWidth
            placeholder="댓글을 입력하세요..."
            multiline
            rows={3}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: charcoalBg,
              },
              color: charcoalLight,
            }}
            inputProps={{ style: { color: charcoalLight } }}
          />
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: charcoalLight,
              color: "#fff",
              textTransform: "none",
              fontWeight: "700",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: charcoalLighter,
                boxShadow: "0 6px 18px rgb(74 74 74 / 0.5)",
              },
            }}
            onClick={handleAddComment}
          >
            댓글 등록
          </Button>
        </Box>
      </Box>

      
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>댓글 삭제 확인</DialogTitle>
        <DialogContent>
          <Typography>정말 이 댓글을 삭제하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            sx={{
              color: charcoalLight,
              borderColor: charcoalLight,
              textTransform: "none",
              fontWeight: "600",
            }}
          >
            취소
          </Button>
          <Button
            onClick={handleDeleteComment}
            sx={{
              backgroundColor: "#b33a3a",
              color: "#fff",
              textTransform: "none",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "#8c2a2a",
              },
            }}
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
