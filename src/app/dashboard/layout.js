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
    <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* 상단 헤더 고정 */}
      <HeaderBar />

      {/* 전체 콘텐츠 (헤더 아래에 위치) */}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: '50px', height: 'calc(100% - 50px)' }}>
        {/* 왼쪽 사이드바 */}
        <Sidebar onSelect={setSelectedMenu} />

        {/* 시나리오 패널 (조건부) */}
        {showScenarioPanel && <ScenarioPanel />}

        {/* 중앙 콘텐츠 */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          {children}
        </Box>

        {/* 오른쪽 사이드바 */}
        <RightSidebar />
      </Box>
    </Box>
  );
}
