import CampaignIcon from "@mui/icons-material/Campaign";
import ForumIcon from "@mui/icons-material/Forum";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, List, ListItemButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const categories = [
  { label: "사내공지", icon: <CampaignIcon /> },
  { label: "자유게시판", icon: <ForumIcon /> },
];

export default function CommunityPanel({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <Box
      component="aside"
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

      <List disablePadding>
        <ListItemButton
          key="기본"
          selected={selectedCategory === "기본"}
          onClick={() => setSelectedCategory("기본")}
          sx={{
            mb: 1,
            pl: 2,
            pr: 1,
            borderRadius: 2,
            bgcolor: selectedCategory === "기본" ? "#e6f4ea" : "inherit",
            color: selectedCategory === "기본" ? "#1e8f4d" : "inherit",
            fontWeight: selectedCategory === "기본" ? "bold" : "normal",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <HelpOutlineIcon />
            <Typography variant="body2">전체 게시글</Typography>
          </Stack>
        </ListItemButton>

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
  );
}
