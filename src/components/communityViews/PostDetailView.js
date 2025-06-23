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
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PostDetailView() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState({
    title: "더미 제목입니다.",
    content: "이곳은 더미 게시글 내용입니다.",
    writerName: "홍길동",
    writerId: "1",
  });

  const [comments, setComments] = useState([
    {
      id: 1,
      content: "첫 번째 더미 댓글입니다.",
      writerName: "김철수",
      writerId: "1",
    },
    {
      id: 2,
      content: "두 번째 더미 댓글입니다.",
      writerName: "이영희",
      writerId: "2",
    },
  ]);

  const [commentInput, setCommentInput] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const userId = "1";
  const token = "dummy-token";

  useEffect(() => {
    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  }, []);

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: comments.length + 1,
      content: commentInput,
      writerName: "내 이름",
      writerId: userId,
    };
    setComments([...comments, newComment]);
    setCommentInput("");
  };

  const handleEditComment = (commentId) => {
    const updatedComments = comments.map((c) =>
      c.id === commentId ? { ...c, content: editingContent } : c
    );
    setComments(updatedComments);
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((c) => c.id !== commentId));
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
