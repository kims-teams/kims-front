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

const navy = "#1a3d7c";
const lightNavy = "#dce5f6";
const darkNavy = "#132c5a";

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
      const res = await fetch(`http://3.34.136.158:8080/api/post/${id}`);
      const data = await res.json();
      setPost(data);
    } catch (err) {
      console.error("게시글 로딩 실패", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `http://3.34.136.158:8080/api/comment/post/${id}`
      );
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("댓글 로딩 실패", err);
    }
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;
    try {
      const res = await fetch(`http://3.34.136.158:8080/api/comment`, {
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
        `http://3.34.136.158:8080/api/comment/${commentId}`,
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
    try {
      const res = await fetch(
        `http://3.34.136.158:8080/api/comment/${commentIdToDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
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
    <Box p={4} maxWidth={900} mx="auto">
      {post && (
        <>
          <Paper sx={{ p: 4, mb: 5, borderRadius: 3, boxShadow: 3 }}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography variant="h4" fontWeight={700} sx={{ color: navy }}>
                {post.title}
              </Typography>
              <Box textAlign="right">
                <Typography variant="subtitle2" fontWeight="600">
                  작성자: {post.writerName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {dayjs(post.createdAt).format("YYYY.MM.DD HH:mm")}
                </Typography>
              </Box>
            </Stack>
            <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
              {post.content}
            </Typography>
          </Paper>

          {post.categoryName === "자유게시판" && (
            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{
                  mb: 2,
                  pb: 1,
                  borderBottom: `2px solid ${navy}`,
                  color: navy,
                }}
              >
                댓글 ({comments.length})
              </Typography>

              {comments.map((comment) => (
                <Paper key={comment.id} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle2" fontWeight={600}>
                      {comment.writerName}
                    </Typography>
                    {parseInt(comment.writerId) === parseInt(userId) && (
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditingContent(comment.content);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setCommentIdToDelete(comment.id);
                            setOpenDeleteDialog(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    )}
                  </Stack>

                  {editingCommentId === comment.id ? (
                    <>
                      <TextField
                        fullWidth
                        multiline
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        sx={{ mt: 1 }}
                      />
                      <Stack direction="row" spacing={1} mt={1}>
                        <Button
                          variant="outlined"
                          onClick={() => handleEditComment(comment.id)}
                          sx={{ color: navy, borderColor: navy }}
                        >
                          수정
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setEditingCommentId(null)}
                          sx={{ color: navy, borderColor: navy }}
                        >
                          취소
                        </Button>
                      </Stack>
                    </>
                  ) : (
                    <Typography mt={1}>{comment.content}</Typography>
                  )}
                </Paper>
              ))}

              <Box mt={4}>
                <TextField
                  fullWidth
                  multiline
                  placeholder="댓글을 입력하세요..."
                  rows={3}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleAddComment}
                  sx={{
                    mt: 2,
                    bgcolor: navy,
                    "&:hover": { bgcolor: darkNavy },
                  }}
                >
                  댓글 등록
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>댓글 삭제 확인</DialogTitle>
        <DialogContent>
          <Typography>정말 이 댓글을 삭제하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>취소</Button>
          <Button onClick={handleDeleteComment} color="error">
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
