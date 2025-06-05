'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import RightSidebar from '../../components/RightSidebar';
import ScenarioPanel from '../../components/ScenarioPanel';

export default function DashboardLayout({ children }) {
  const [selectedMenu, setSelectedMenu] = useState('');

  const showScenarioPanel = ['시나리오 관리', '실행 관리'].includes(selectedMenu);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 왼쪽 사이드바 */}
      <Sidebar onSelect={setSelectedMenu} />

      {/* 조건부 중앙 사이드바 */}
      {showScenarioPanel && <ScenarioPanel />}

      {/* 메인 콘텐츠 */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {children}
      </Box>

      {/* 오른쪽 사이드바 */}
      <RightSidebar />
    </Box>
  );
}
