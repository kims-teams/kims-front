"use client";

import { Box } from "@mui/material";
import HeaderBar from "../../../../components/HeaderBar";
import Sidebar from "../../../../components/Sidebar";
import ScenarioPanel from "../../../../components/ScenarioPanel";

export default function ScenarioLayout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderBar />
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <ScenarioPanel />
        <Box sx={{ flex: 1, p: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
