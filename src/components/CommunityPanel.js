import { Box, List, ListItemButton, Stack, Typography } from "@mui/material";
import React from "react";

// 카테고리 정의 (아이콘 제거됨)
const categories = [{ label: "사내공지" }, { label: "자유게시판" }];

// 색상 상수
const NAVY = "#002c5f";
const NAVY_LIGHT = "#e3ecf9";
const TEXT_GRAY = "#333";

export default function CommunityPanel({
  selectedCategory,
  setSelectedCategory,
}) {
  const isSelected = (label) => selectedCategory === label;

  return (
    <Box
      component="aside"
      sx={{
        width: 180,
        bgcolor: "#ffffff",
        boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
        py: 4,
        px: 2,
        borderRadius: "12px 0 0 12px",
      }}
    >
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{ px: 0.5, mb: 2, color: TEXT_GRAY, fontSize: "15px" }}
      >
        ▾ 게시판 목록
      </Typography>

      <List disablePadding>
        {/* 전체 게시글 */}
        <ListItemButton
          selected={isSelected("기본")}
          onClick={() => setSelectedCategory("기본")}
          sx={{
            mb: 1,
            px: 2,
            py: 1.2,
            borderRadius: 2,
            bgcolor: isSelected("기본") ? NAVY_LIGHT : "transparent",
            color: isSelected("기본") ? NAVY : TEXT_GRAY,
            fontWeight: isSelected("기본") ? "bold" : 500,
            "&:hover": {
              bgcolor: NAVY_LIGHT,
            },
          }}
        >
          <Typography variant="body2" sx={{ fontSize: "14px" }}>
            전체 게시글
          </Typography>
        </ListItemButton>

        {/* 사내공지 / 자유게시판 */}
        {categories.map(({ label }) => (
          <ListItemButton
            key={label}
            selected={isSelected(label)}
            onClick={() => setSelectedCategory(label)}
            sx={{
              mb: 1,
              px: 2,
              py: 1.2,
              borderRadius: 2,
              bgcolor: isSelected(label) ? NAVY_LIGHT : "transparent",
              color: isSelected(label) ? NAVY : TEXT_GRAY,
              fontWeight: isSelected(label) ? "bold" : 500,
              "&:hover": {
                bgcolor: NAVY_LIGHT,
              },
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "14px" }}>
              {label}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
