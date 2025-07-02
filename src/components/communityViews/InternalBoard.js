"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Stack,
  TextField,
  Button,
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
        const resp = await fetch("http://localhost:8080/api/post");
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

  const renderPostItem = (post) => (
    <ListItem
      key={post.id}
      button
      onClick={() => router.push(`/user/menu/community/${post.id}`)}
    >
      <ListItemText
        primary={
          <Box display="flex" gap={1} alignItems="center">
            <Typography
              variant="body2"
              sx={{ color: "#1a3d7c", fontWeight: 600 }}
            >
              [{post.categoryName}]
            </Typography>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                cursor: "pointer",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#1a3d7c",
                  textDecoration: "underline",
                },
              }}
            >
              {post.title}
            </Typography>
          </Box>
        }
        secondary={new Date(post.createdAt).toLocaleString()}
      />
    </ListItem>
  );

  return (
    <Box p={4}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={3}
        spacing={2}
      >
        <Typography variant="h5" fontWeight="bold">
          📌 전체 게시글
        </Typography>

        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            placeholder="제목 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <Paper elevation={2}>
            <List>
              {currentPosts.map((post, idx) => (
                <Box key={post.id}>
                  {renderPostItem(post)}
                  {idx !== currentPosts.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>

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
