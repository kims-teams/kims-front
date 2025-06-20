"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  Stack,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CampaignIcon from "@mui/icons-material/Campaign";
import ForumIcon from "@mui/icons-material/Forum";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArticleIcon from "@mui/icons-material/Article";
import CelebrationIcon from "@mui/icons-material/Celebration";

const categories = [
  { label: "사내공지", icon: <CampaignIcon /> },
  { label: "자유게시판", icon: <ForumIcon /> },
  { label: "Q&A", icon: <HelpOutlineIcon /> },
  { label: "자료실", icon: <ArticleIcon /> },
  { label: "사내이벤트", icon: <CelebrationIcon /> },
];

export default function InternalBoardPage() {
  const [selectedCategory, setSelectedCategory] = useState("사내공지");
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <Box sx={{ display: "flex", height: "100%", bgcolor: "#f5f6f7" }}>
      {/* 좌측 카테고리 */}
      <Box
        sx={{
          width: 180,
          bgcolor: "#fff",
          borderRight: "1px solid #eee",
          py: 4,
          px: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" sx={{ px: 2, mb: 1 }}>
          사내 게시판
        </Typography>
        <List disablePadding sx={{ pb: 4 }}>
          {categories.map(({ label, icon }) => (
            <ListItemButton
              key={label}
              selected={selectedCategory === label}
              onClick={() => setSelectedCategory(label)}
              sx={{
                mb: 1,
                pl: 2,
                pr: 1,
                borderRadius: 2,
                bgcolor: selectedCategory === label ? "#e6f4ea" : "inherit",
                color: selectedCategory === label ? "#1e8f4d" : "inherit",
                fontWeight: selectedCategory === label ? "bold" : "normal",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                {icon}
                <Typography variant="body2">{label}</Typography>
              </Stack>
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* 우측 콘텐츠 */}
      <Box sx={{ flex: 1, p: 4 }}>
        {/* 🔍 검색창 */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="게시글 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* 게시판 카드 */}
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            자유롭게 작성해보세요 📝
          </Typography>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {selectedCategory}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            "{selectedCategory}"에 해당하는 사내 게시판 콘텐츠를 여기에
            표시합니다.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
