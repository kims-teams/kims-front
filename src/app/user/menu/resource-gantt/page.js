"use client";

import useAuthRedirect from "../../../../hooks/useAuthRedirect";

import { Typography, Box } from "@mui/material";

export default function ScenarioPage() {
  useAuthRedirect();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        자원운영간트
      </Typography>
    </Box>
  );
}
