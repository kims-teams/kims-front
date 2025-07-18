"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import CommunityPanel from "components/CommunityPanel";
import useAuthRedirect from "hooks/useAuthRedirect";

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
};

export default function CommunityPage({ categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("기본");
  const CurrentView = viewComponentMap[selectedCategory] || null;

  useAuthRedirect();

  useEffect(() => {
    console.log("✅ selectedCategory:", selectedCategory);
  }, [selectedCategory]);

  return (
    <Box sx={{ display: "flex", height: "100%", bgcolor: "#f5f6f7" }}>
      <CommunityPanel
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Box sx={{ flex: 1, p: 4 }}>
        {CurrentView ? (
          <CurrentView category={selectedCategory} />
        ) : (
          <Typography>게시판 컴포넌트를 불러올 수 없습니다.</Typography>
        )}
      </Box>
    </Box>
  );
}
