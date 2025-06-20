"use client";

import { Box } from "@mui/material";
import HeaderBar from "../../../../components/HeaderBar";
import Sidebar from "../../../../components/Sidebar";

export default function CommunityLayout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Box sx={{ flex: 1, p: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
