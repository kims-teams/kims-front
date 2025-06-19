"use client";

import { Typography, Box } from "@mui/material";
import useAuthRedirect from "../../../../hooks/useAuthRedirect";

export default function ScenarioPage() {
  useAuthRedirect();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        시나리오 관리
      </Typography>
    </Box>
  );
}
