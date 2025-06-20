"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CommunityPanel from "components/CommunityPanel";

const viewComponentMap = {
  기본: dynamic(
    () => import("../../../../components/communityViews/InternalBoard")
  ),
  사내공지: dynamic(
    () => import("../../../../components/communityViews/NoticeView")
  ),
  자유게시판: dynamic(
    () => import("../../../../components/communityViews/FreeBoardView")
  ),
  "Q&A": dynamic(() => import("../../../../components/communityViews/QnaView")),
  자료실: dynamic(
    () => import("../../../../components/communityViews/ArchiveView")
  ),
  사내이벤트: dynamic(
    () => import("../../../../components/communityViews/EventView")
  ),
};

export default function ({ categories = [] }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("기본");
  const CurrentView = viewComponentMap[selectedCategory] || null;

  return (
    <Box sx={{ display: "flex", height: "100%", bgcolor: "#f5f6f7" }}>
      <CommunityPanel
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Box sx={{ flex: 1, p: 4 }}>
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

        {CurrentView ? (
          <CurrentView keyword={searchKeyword} category={selectedCategory} />
        ) : (
          <Typography>게시판 컴포넌트를 불러올 수 없습니다.</Typography>
        )}
      </Box>
    </Box>
  );
}
