'use client';

import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function ScenarioPanel() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        width: collapsed ? 24 : 260,
        minHeight: '100vh',
        borderRight: '1px solid #ddd',
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: collapsed ? 'center' : 'stretch',
        transition: 'width 0.2s ease',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', p: 1 }}>
        <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ArrowForwardIosIcon fontSize="small" /> : <ArrowBackIosNewIcon fontSize="small" />}
        </IconButton>
      </Box>

      {!collapsed && (
        <Typography variant="body2" sx={{ px: 2, color: 'gray' }}>
          시나리오 패널입니다
        </Typography>
      )}
    </Box>
  );
}
