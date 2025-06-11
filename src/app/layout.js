"use client";

import "./globals.css";
import HeaderBar from "../components/HeaderBar";
import { Box } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RVCS</title>
      </head>
      <body>
        {/* 항상 고정되는 헤더 */}
        <HeaderBar />

        {/* 페이지 본문 */}
        <Box sx={{ pt: "50px", height: "100vh", overflow: "hidden" }}>
          {children}
        </Box>
      </body>
    </html>
  );
}
