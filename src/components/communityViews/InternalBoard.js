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
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function InternalBoard() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        fetch("http://localhost:8080/api/post")
          .then((resp) => resp.json())
          .then((data) => setPosts(data));
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    };

    fetchPosts();
  }, []);

  const renderPostItem = (post) => (
    <ListItem
      key={post.id}
      button
      onClick={() => router.push(`/user/menu/community/${post.id}`)}
    >
      <ListItemText
        primary={
          <Box display="flex" gap={1} alignItems="center">
            <Typography variant="body2" color="secondary">
              [{post.categoryName}]
            </Typography>
            <Typography variant="body1" fontWeight="bold">
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
      <Typography variant="h5" fontWeight="bold" mb={3}>
        📌 전체 게시글
      </Typography>
      {posts.length === 0 ? (
        <Typography color="text.secondary">
          등록된 게시글이 없습니다.
        </Typography>
      ) : (
        <Paper elevation={2}>
          <List>
            {posts.map((post, idx) => (
              <Box key={post.id}>
                {renderPostItem(post)}
                {idx !== posts.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
