"use client";

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Stack,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";

export default function NoticeView() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [targetPost, setTargetPost] = useState(null);
  const [targetPostId, setTargetPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const router = useRouter();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const loadNotices = async () => {
    const res = await fetch(
      "http://localhost:8080/api/post/post-category/\uC0AC\uB0B4\uACF5\uC9C0"
    );
    const data = await res.json();
    setNotices(data);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentNotices = filteredNotices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredNotices.length / postsPerPage);

  const renderDialog = ({
    open,
    title,
    onClose,
    onConfirm,
    confirmText = "\uD655\uC778",
    cancelText = "\uCDE8\uC18C",
    children,
    dialogType = "default",
  }) => (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={
        dialogType === "success" || dialogType === "confirm" ? "xs" : "sm"
      }
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          {title.includes("\uC644\uB8CC") && (
            <CheckCircleIcon sx={{ color: "green" }} />
          )}
          <Typography fontWeight="bold" fontSize="1.2rem">
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        {cancelText && (
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ borderColor: "#1a3d7c", color: "#1a3d7c" }}
          >
            {cancelText}
          </Button>
        )}
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{ bgcolor: "#1a3d7c", "&:hover": { bgcolor: "#162f5d" } }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box p={4}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={3}
        spacing={2}
      >
        <Typography variant="h5" fontWeight="bold">
          📌 공지 게시판
        </Typography>

        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            placeholder="제목 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={() => setCurrentPage(1)}
            sx={{ borderColor: "#1a3d7c", color: "#1a3d7c" }}
          >
            검색
          </Button>

          {role !== "USER" && (
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => setOpenDialog(true)}
              sx={{
                borderRadius: 2,
                bgcolor: "#1a3d7c",
                "&:hover": { bgcolor: "#162f5d" },
              }}
            >
              새 공지
            </Button>
          )}
        </Stack>
      </Stack>

      {filteredNotices.length === 0 ? (
        <Typography color="text.secondary">등록된 공지가 없습니다.</Typography>
      ) : (
        <Paper elevation={2}>
          <List>
            {currentNotices.map((post, idx) => (
              <Box key={post.id}>
                <ListItem
                  secondaryAction={
                    role !== "USER" && (
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          onClick={() => {
                            setTargetPost(post);
                            setForm({
                              title: post.title,
                              content: post.content,
                            });
                            setEditDialogOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setTargetPostId(post.id);
                            setConfirmDialogOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    )
                  }
                >
                  <ListItemText
                    onClick={() =>
                      router.push(`/user/menu/community/${post.id}`)
                    }
                    primary={
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                          cursor: "pointer",
                          transition: "color 0.2s ease",
                          "&:hover": {
                            color: "#1a3d7c",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {post.title}
                      </Typography>
                    }
                    secondary={`${post.writerName} · ${new Date(post.createdAt).toLocaleString()}`}
                  />
                </ListItem>
                {idx !== currentNotices.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      )}

      {filteredNotices.length > postsPerPage && (
        <Stack mt={4} alignItems="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            sx={{
              "& .MuiPaginationItem-root": { color: "#1a3d7c" },
              "& .Mui-selected": {
                bgcolor: "#1a3d7c",
                color: "white",
                "&:hover": {
                  bgcolor: "#162f5d",
                },
              },
            }}
          />
        </Stack>
      )}
    </Box>
  );
}
