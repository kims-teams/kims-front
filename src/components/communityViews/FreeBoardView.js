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
} from "@mui/material";
import useAuthRedirect from "hooks/useAuthRedirect";

export default function FreeBoardView() {
  useAuthRedirect();

  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [targetPost, setTargetPost] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const categoryName = "자유게시판";

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/post/post-category/${categoryName}`
      );
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("게시글 불러오기 실패", err);
    }
  };

  useEffect(() => {
    if (token) fetchPosts();
  }, [token]);

  const formatCreatedAt = (dateString) => {
    if (!dateString) return "-";
    const created = new Date(dateString);
    return created.toISOString().split("T")[0];
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
            sx={{
              width: 300,
              backgroundColor: "transparent",
              border: "1px solid #1a3d7c",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
              "& input": {
                padding: "8px 10px",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "#1a3d7c", color: "#fff" }}
          >
            검색
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#1a3d7c", color: "#fff" }}
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
          <TableHead sx={{ backgroundColor: "#e6ecf8" }}>
            <TableRow>
              {[
                "번호",
                "제목",
                "사원이름",
                "이메일",
                "작성일",
                "수정",
                "삭제",
              ].map((col, i) => (
                <TableCell
                  key={i}
                  align={col === "제목" ? "left" : "center"}
                  sx={{ color: "#1a3d7c", fontWeight: "bold" }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
              .filter((p) =>
                p.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((post, idx) => (
                <TableRow key={post.id}>
                  <TableCell align="center">{idx + 1}</TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "#1a3d7c",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() =>
                      router.push(`/user/menu/community/${post.id}`)
                    }
                  >
                    {post.title}
                  </TableCell>
                  <TableCell align="center">{post.writerName || "-"}</TableCell>
                  <TableCell align="center">
                    {post.writerEmail || "-"}
                  </TableCell>
                  <TableCell align="center">
                    {formatCreatedAt(post.createdAt)}
                  </TableCell>
                  <TableCell align="center">
                    {String(post.writerId) === String(userId) && (
                      <Button
                        size="small"
                        sx={{ color: "#1a3d7c" }}
                        onClick={() => {
                          setSelectedPost(post);
                          setForm({ title: post.title, content: post.content });
                          setOpenDialog(true);
                        }}
                      >
                        수정
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {String(post.writerId) === String(userId) && (
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
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderColor: "#1a3d7c",
            color: "#1a3d7c",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#f0f4fa",
              borderColor: "#1a3d7c",
            },
          }}
        >
          이전
        </Button>
        <Typography variant="body2" sx={{ color: "#1a3d7c", fontWeight: 600 }}>
          1 page / 1 pages
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderColor: "#1a3d7c",
            color: "#1a3d7c",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#f0f4fa",
              borderColor: "#1a3d7c",
            },
          }}
        >
          다음
        </Button>
      </Stack>
    </Box>
  );
}
