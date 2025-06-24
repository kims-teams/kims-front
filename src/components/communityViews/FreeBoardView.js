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

export default function FreeBoardView() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    categoryName: "",
  });

  const router = useRouter();

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
    fetchPosts();
  }, []);

  const handleCreate = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (
      !form.title.trim() ||
      !form.content.trim() ||
      !form.categoryName.trim()
    ) {
      alert("제목, 내용, 카테고리를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          userId: parseInt(userId, 10),
          categoryName: form.categoryName,
        }),
      });

      if (res.ok) {
        setForm({ title: "", content: "", categoryName: "" });
        setOpenDialog(false);
        fetchPosts();
      } else {
        alert("게시글 등록에 실패했습니다.");
      }
    } catch (err) {
      console.error("게시글 등록 오류", err);
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
          <Button variant="contained">검색</Button>
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
              <TableCell>카테고리</TableCell>
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
                    <TableCell
                      sx={{ color: "#1e88e5", cursor: "pointer" }}
                      onClick={() =>
                        router.push(`/user/menu/community/post/${post.id}`)
                      }
                    >
                      {post.title}
                    </TableCell>
                    <TableCell>{post.category?.name || "-"}</TableCell>
                    <TableCell>{post.user?.name || "-"}</TableCell>
                    <TableCell>{post.user?.email || "-"}</TableCell>
                    <TableCell>
                      {post.createdAt?.split("T")[0] || "-"}
                    </TableCell>
                    <TableCell>{post.views ?? 0}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>새 글 작성</DialogTitle>
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
            rows={6}
            label="내용"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="카테고리"
            value={form.categoryName}
            onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
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
