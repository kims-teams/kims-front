"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuthRedirect from "hooks/useAuthRedirect";

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

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    console.log("userId:", storedUserId);
    console.log("token:", storedToken);

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

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("댓글 삭제 실패");
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={3} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {post && (
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            작성자: {post.writerName} ({post.writerId})
          </Typography>
          <Typography mt={2}>{post.content}</Typography>
        </Paper>
      )}

      <Box>
        <Typography variant="h6">댓글</Typography>
        {comments.map((comment) => (
          <Paper key={comment.id} sx={{ p: 2, mt: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">
                {comment.writerName} ({comment.writerId})
              </Typography>
              {parseInt(comment.writerId) === parseInt(userId) && (
                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditingContent(comment.content);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteComment(comment.id)}>
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
                />
                <Stack direction="row" spacing={1} mt={1}>
                  <Button
                    variant="contained"
                    onClick={() => handleEditComment(comment.id)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setEditingCommentId(null)}
                  >
                    취소
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Typography mt={1}>{comment.content}</Typography>
            )}
          </Paper>
        ))}

        <TextField
          fullWidth
          placeholder="댓글 입력"
          multiline
          rows={3}
          sx={{ mt: 3 }}
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Button sx={{ mt: 1 }} variant="contained" onClick={handleAddComment}>
          댓글 등록
        </Button>
      </Box>
    </Box>
  );
}
