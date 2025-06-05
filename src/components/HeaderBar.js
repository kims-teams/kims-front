'use client';

import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function HeaderBar() {
  return (
    <AppBar
      position="fixed"
      elevation={1}
      color="default"
      sx={{
        height: 50,
        bgcolor: '#e0e0e0', // ✅ 더 진한 회색
        justifyContent: 'center',
        px: 2,
        zIndex: 1300, // 사이드바보다 위로
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: '50px !important', px: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            전체 헤더
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
