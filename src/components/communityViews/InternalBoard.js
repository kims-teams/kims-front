"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Divider,
  Pagination,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function InternalBoard() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resp = await fetch("http://52.78.234.7:8080/api/post");
        const data = await resp.json();
        const sortedPosts = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const renderPostItem = (post) => {
    const createdAt = new Date(post.createdAt).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <Box
        key={post.id}
        onClick={() => router.push(`/user/menu/community/${post.id}`)}
        sx={{
          py: 1.5,
          px: 1,
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ mb: 0.5, color: "#1a3d7c" }}
        >
          {post.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {post.writerName || "작성자"} · {createdAt}
        </Typography>
      </Box>
    );
  };

  return (
    <Box p={4}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
          전체 게시글
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            size="small"
            placeholder="검색어를 입력해주세요."
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
        </Stack>
      </Stack>

      {filteredPosts.length === 0 ? (
        <Typography color="text.secondary">
          등록된 게시글이 없습니다.
        </Typography>
      ) : (
        <>
          <Box>
            {currentPosts.map((post, idx) => (
              <Box key={post.id}>
                {renderPostItem(post)}
                {idx !== currentPosts.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>

          {filteredPosts.length > postsPerPage && (
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
        </>
      )}
    </Box>
  );
}
