"use client";

import "./globals.css";
import HeaderBar from "../components/HeaderBar";
import { Box } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* 항상 고정되는 헤더 */}
        <HeaderBar />

        {/* 아래 내용 */}
        <Box sx={{ pt: "50px", height: "100vh", overflow: "hidden" }}>
          {children}
        </Box>
      </body>
    </html>
  );
}
