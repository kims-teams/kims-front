"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import Image from "next/image";

export default function HeaderBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!localStorage.getItem("token")) router.push("/user/login");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogin = () => {
    router.push("/user/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/user/login");
  };

  if (!isClient) return null;

  return (
    <AppBar
      position="fixed"
      elevation={1}
      color="default"
      sx={{
        height: 50,
        bgcolor: "#ffffff", 
        justifyContent: "center",
        px: 2,
        zIndex: 1300,
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: "50px !important", px: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/logo.png"
            alt="KIMSTEAMS 로고"
            priority
            width={170}
            height={45}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="outlined"
          size="small"
          onClick={isLoggedIn ? handleLogout : handleLogin}
          sx={{
            borderColor: "#1B2A40", 
            color: "#1B2A40", 
            backgroundColor: "#ffffff", 
            "&:hover": {
              borderColor: "#1B2A40",
              backgroundColor: "#f4f6f9", 
            },
          }}
        >
          {isLoggedIn ? "로그아웃" : "로그인"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
