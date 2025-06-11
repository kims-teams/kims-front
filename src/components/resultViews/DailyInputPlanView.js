"use client";

import { Box, Typography, Paper } from "@mui/material";

export default function UnusedWipView() {
  return (
    <Box component={Paper} elevation={1} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        히히
      </Typography>
    </Box>
  );
}
