"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  Divider,
  Paper,
  CircularProgress,
} from "@mui/material";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPostDetail = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/post/${id}`);
      const data = await res.json();
      setPost(data);
    } catch (err) {
      console.error("게시글 상세 조회 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6">게시글을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", py: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          {post.title}
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="body2" color="text.secondary">
            작성자: {post.user?.name || "-"} ({post.user?.email || "-"})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            작성일: {post.createdAt?.split("T")[0] || "-"}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          카테고리: {post.category?.name || "-"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {post.content}
        </Typography>
      </Paper>
    </Box>
  );
}
