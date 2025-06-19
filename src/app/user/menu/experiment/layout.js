"use client";

import { Box } from "@mui/material";
import HeaderBar from "../../../../components/HeaderBar";
import Sidebar from "../../../../components/Sidebar";
import ScenarioPanel from "../../../../components/ScenarioPanel";
import useAuthRedirect from "../../../../hooks/useAuthRedirect";

export default function ScenarioLayout({ children }) {
  useAuthRedirect();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderBar />
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <ScenarioPanel />
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
