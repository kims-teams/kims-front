"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppBar, Box, Toolbar, Button } from "@mui/material";

export default function HeaderBar() {
  const router = useRouter();

  const handleAddEmployee = () => {
    router.push("/user/add-employee");
  };

  const handleLogin = () => {
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
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          size="small"
          sx={{
            mr: 1,
            borderColor: "black",
            color: "black",
            "&:hover": {
              borderColor: "black",
              backgroundColor: "#f0f0f0",
            },
          }}
          onClick={handleAddEmployee}
        >
          사원추가
        </Button>

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
      </Toolbar>
    </AppBar>
  );
}
