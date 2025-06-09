'use client';

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  InputAdornment,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function RightSidebar() {
  const [open, setOpen] = useState({
    config: true,
    input: true,
    bop: true,
    resource: true,
    target: true,
    configSub: true,
  });

  const toggle = (key) => setOpen({ ...open, [key]: !open[key] });

  return (
    <Drawer
      anchor="right"
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          p: 2,
          right: 0,
          top: '50px', // ✅ 헤더 높이만큼 내려줌
          height: 'calc(100% - 50px)', // ✅ 남은 영역에만 표시
          position: 'fixed', // ✅ 명시적으로 지정
        },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        입력 데이터 목록
      </Typography>

      {/* 🔍 검색창 */}
      <TextField
        placeholder="검색"
        size="small"
        fullWidth
        
        
        
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <List disablePadding>
        <ListItemButton onClick={() => toggle('config')}>
          <ListItemText primary="Configurations" />
          {open.config ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.config}>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            <ListItemButton><ListItemText primary="엔진 실행 옵션" /></ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => toggle('input')}>
          <ListItemText primary="Input Data" />
          {open.input ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.input}>
          <ListItemButton onClick={() => toggle('bop')} sx={{ pl: 2 }}>
            <ListItemText primary="Bop" />
            {open.bop ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.bop}>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItemButton><ListItemText primary="생산 프로세스" /></ListItemButton>
              <ListItemButton><ListItemText primary="공정 마스터" /></ListItemButton>
              <ListItemButton><ListItemText primary="자재 마스터" /></ListItemButton>
              <ListItemButton><ListItemText primary="BOM" /></ListItemButton>
              <ListItemButton><ListItemText primary="플랜트 마스터" /></ListItemButton>
              <ListItemButton><ListItemText primary="공정 순서" /></ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => toggle('configSub')} sx={{ pl: 2 }}>
            <ListItemText primary="Config" />
            {open.configSub ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.configSub}>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItemButton><ListItemText primary="우선순위" /></ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => toggle('resource')} sx={{ pl: 2 }}>
            <ListItemText primary="Resource" />
            {open.resource ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.resource}>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItemButton><ListItemText primary="작업도구 마스터" /></ListItemButton>
              <ListItemButton><ListItemText primary="작업장 마스터" /></ListItemButton>
              <ListItemButton><ListItemText primary="생산 라우팅" /></ListItemButton>
              <ListItemButton><ListItemText primary="작업장-도구 매핑관리" /></ListItemButton>
            </List>
          </Collapse>
        </Collapse>

        <ListItemButton onClick={() => toggle('target')}>
          <ListItemText primary="Target" />
          {open.target ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.target}>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            <ListItemButton><ListItemText primary="판매오더" /></ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}
