"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar, Box, Toolbar, Button, Typography } from "@mui/material";

export default function HeaderBar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    router.push("/user/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/user/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      color="default"
      sx={{
        height: 50,
        bgcolor: "#e0e0e0",
        justifyContent: "center",
        px: 2,
        zIndex: 1300,
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: "50px !important", px: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          KIMSTEAMS
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        {isLoggedIn ? (
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "#f0f0f0",
              },
            }}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "#f0f0f0",
              },
            }}
            onClick={handleLogin}
          >
            로그인
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
