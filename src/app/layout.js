"use client";

import "./globals.css";
import HeaderBar from "../components/HeaderBar";
import { Box } from "@mui/material";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NNaF1cWWhOYVFpR2Nbek5zflZCallZVAciSV9jS3tTcEdmWXxddHFdR2ZdUk90Vg=="
);

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RVCS</title>
      </head>
      <body style={{ margin: 0, padding: 0, height: "100vh" }}>
        <HeaderBar />

        <Box
          sx={{
            pt: "50px",
            height: "calc(100vh - 50px)",
          }}
          component="main"
        >
          {children}
        </Box>
      </body>
    </html>
  );
}
