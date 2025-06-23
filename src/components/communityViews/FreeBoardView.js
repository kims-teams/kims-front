"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import useAuthRedirect from "hooks/useAuthRedirect";

export default function FreeBoardView() {
  useAuthRedirect();

  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/post");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("게시글 불러오기 실패", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const handleCreate = async () => {
    const res = await fetch("http://localhost:8080/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: form.title,
        content: form.content,
        userId: localStorage.getItem("userId"),
      }),
    });
    if (res.ok) {
      setForm({ title: "", content: "" });
      setOpenDialog(false);
      fetchPosts();
    }
  };

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={600}>
          자유게시판
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            placeholder="검색어를 입력해주세요."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ width: "300px" }}
          />
          <Button variant="contained" onClick={() => {}}>
            검색
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            sx={{ height: "40px" }}
          >
            글쓰기
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>아이디</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>조회수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length > 0 ? (
              posts
                .filter((post) =>
                  post.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.id}</TableCell>
                    <TableCell sx={{ color: "#1e88e5", cursor: "pointer" }}>
                      {post.title}
                    </TableCell>
                    <TableCell>{post.writerName || "-"}</TableCell>
                    <TableCell>{post.writerId || "-"}</TableCell>
                    <TableCell>
                      {post.createdAt ? post.createdAt.split("T")[0] : "-"}
                    </TableCell>
                    <TableCell>{post.views || 0}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  게시글이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <Button variant="outlined" size="small">
          이전
        </Button>
        <Typography variant="body2">1 page / 1 pages</Typography>
        <Button variant="outlined" size="small">
          다음
        </Button>
      </Stack>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedPost ? "게시글 수정" : "새 글 작성"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="제목"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            label="내용"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button variant="contained" onClick={handleCreate}>
            등록
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
