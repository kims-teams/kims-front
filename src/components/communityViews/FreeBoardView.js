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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [targetPost, setTargetPost] = useState(null);
  const categoryName = "자유게시판";

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const fetchPosts = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/post/post-category/자유게시판`);
      const data = await res.json();
      setPosts(data);
      console.log("data:", data);
    } catch (err) {
      console.error("게시글 불러오기 실패", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const formatCreatedAt = (dateString) => {
    if (!dateString) return "-";
    const created = new Date(dateString);
    const now = new Date();
    const isToday =
      created.getFullYear() === now.getFullYear() &&
      created.getMonth() === now.getMonth() &&
      created.getDate() === now.getDate();

    return isToday
      ? created.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : created.toISOString().split("T")[0];
  };

  const handleCreate = async () => {
    const res = await fetch(
      "http://localhost:8080/api/post?email=" + localStorage.getItem("email"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          categoryName: categoryName,
        }),
      }
    );
    if (res.ok) {
      setForm({ title: "", content: "" });
      setOpenDialog(false);
      fetchPosts();
    }
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;

    const res = await fetch(
      `http://localhost:8080/api/post/${selectedPost.id}`,
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

    if (res.ok) {
      setForm({ title: "", content: "" });
      setSelectedPost(null);
      setOpenDialog(false);
      fetchPosts();
    } else {
      alert("수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!targetPost) return;
    console.log(targetPost.id);
    const res = await fetch(`http://localhost:8080/api/post/${targetPost.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      fetchPosts();
      setOpenDeleteDialog(false);
      setTargetPost(null);
    } else {
      alert("삭제에 실패했습니다.");
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4a4a4a",
              color: "#f8f8f0",
              "&:hover": { backgroundColor: "#3a3a3a" },
            }}
          >
            검색
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4a4a4a",
              color: "#f8f8f0",
              "&:hover": { backgroundColor: "#3a3a3a" },
              height: "40px",
            }}
            onClick={() => {
              setForm({ title: "", content: "" });
              setSelectedPost(null);
              setOpenDialog(true);
            }}
          >
            글쓰기
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#4a4a4a" }}>
            <TableRow>
              <TableCell align="center" sx={{ width: 50, color: "#f8f8f0" }}>
                번호
              </TableCell>
              <TableCell align="left" sx={{ width: 220, color: "#f8f8f0" }}>
                제목
              </TableCell>
              <TableCell align="center" sx={{ width: 100, color: "#f8f8f0" }}>
                사원이름
              </TableCell>
              <TableCell align="center" sx={{ width: 180, color: "#f8f8f0" }}>
                이메일
              </TableCell>
              <TableCell align="center" sx={{ width: 100, color: "#f8f8f0" }}>
                작성일
              </TableCell>
              <TableCell align="center" sx={{ width: 80, color: "#f8f8f0" }}>
                수정
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: 60, color: "#f8f8f0" }}
              ></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {posts.length > 0 ? (
              posts
                .filter((post) =>
                  post.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((post, index) => (
                  <TableRow key={post.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        color: "#1e88e5",
                        cursor: "pointer",
                        textDecoration: "underline",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() =>
                        router.push(`/user/menu/community/${post.id}`)
                      }
                    >
                      {post.title}
                    </TableCell>
                    <TableCell align="center">
                      {post.writerName || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {post.writerEmail || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {formatCreatedAt(post.createdAt)}
                    </TableCell>
                    <TableCell align="center">
                      {Number(post.writerId) === Number(userId) && (
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            setSelectedPost(post);
                            setForm({
                              title: post.title,
                              content: post.content,
                            });
                            setOpenDialog(true);
                          }}
                        >
                          수정
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {Number(post.writerId) === Number(userId) && (
                        <Button
                          size="small"
                          color="error"
                          onClick={() => {
                            setTargetPost(post);
                            setOpenDeleteDialog(true);
                          }}
                        >
                          삭제
                        </Button>
                      )}
                    </TableCell>
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
            rows={6}
            label="내용"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setSelectedPost(null);
              setForm({ title: "", content: "" });
            }}
          >
            취소
          </Button>
          <Button
            variant="contained"
            onClick={selectedPost ? handleUpdate : handleCreate}
          >
            {selectedPost ? "수정" : "등록"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          // setTargetPost(null); ← 여기서 바로 null로 초기화하지 않음
        }}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            pb: 1,
          }}
        >
          🗑️ 게시글 삭제 확인
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" sx={{ mb: 1 }}>
            다음 게시글을 삭제하시겠습니까?
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              backgroundColor: "#f5f5f5",
              p: 1.5,
              borderRadius: 1,
              color: "#333",
            }}
          >
            {targetPost?.title || "(제목 없음)"}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            mt={1}
            display="block"
          >
            삭제된 게시글은 복구할 수 없습니다.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-end", pt: 2 }}>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false);
              setTimeout(() => setTargetPost(null), 300);
            }}
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDelete();
            }}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
