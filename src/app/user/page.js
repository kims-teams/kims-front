"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import HeaderBar from "../../components/HeaderBar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/ResultSidebar";
import ScenarioPanel from "../../components/ScenarioPanel";
import { Box } from "@mui/material";

export default function UserDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/user/login"); 
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);


  if (!isAuthenticated) return null;

  const showScenarioPanel = [
    "/user/scenario",
    "/user/execute",
    "/user/result",
  ].includes(pathname);
  const showRightSidebar = pathname === "/user/result";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderBar />

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />

        {/* 가운데 시나리오 패널 */}
        {showScenarioPanel && <ScenarioPanel />}

        {/* 중앙 콘텐츠 */}
        <Box sx={{ flex: 1, padding: 2 }}></Box>

        {/* 오른쪽 결과 데이터 패널 */}
        {showRightSidebar && <RightSidebar />}
      </div>
    </div>
  );
}
