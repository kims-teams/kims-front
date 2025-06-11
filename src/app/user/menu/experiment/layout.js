"use client";

import { Box } from "@mui/material";
import HeaderBar from "../../../../components/HeaderBar";
import Sidebar from "../../../../components/Sidebar";

export default function ExperimentLayout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderBar />
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Box sx={{ flex: 1, p: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
