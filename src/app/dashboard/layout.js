'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import RightSidebar from '../../components/RightSidebar';
import ScenarioPanel from '../../components/ScenarioPanel';
import HeaderBar from '../../components/HeaderBar';

export default function DashboardLayout({ children }) {
  const [selectedMenu, setSelectedMenu] = useState('');
  const showScenarioPanel = ['시나리오 관리', '실행 관리'].includes(selectedMenu);

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden' }}>
      {/* ✅ 최상단 고정 헤더 */}
      <HeaderBar />

      {/* ✅ 헤더 높이만큼 패딩 주고 본문 구성 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          pt: '50px', // 헤더 높이만큼 밀어냄
        }}
      >
        <Sidebar onSelect={setSelectedMenu} />
        {showScenarioPanel && <ScenarioPanel />}
        <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
          {children}
        </Box>
        <RightSidebar />
      </Box>
    </Box>
  );
}
