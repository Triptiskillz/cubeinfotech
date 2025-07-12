"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Container,
  Drawer,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import BlogForm from "../components/blog/BlogForm";
import BlogList from "../components/blog/BlogList";
import ErrorBoundary from "../components/ErrorBoundary";
import styles from "./Admin.module.css";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const blogCache = useMemo(() => new Map(), []);

  const fetchBlogs = useCallback(async () => {
    const cacheKey = `${search}_${page}_${pageSize}`;
    if (blogCache.has(cacheKey)) {
      const { blogs, pagination } = blogCache.get(cacheKey);
      setBlogs(blogs);
      setPagination(pagination);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/blogs?search=${encodeURIComponent(
          search
        )}&page=${page}&limit=${pageSize}`
      );
      const data = await response.json();
      if (response.ok) {
        setBlogs(data.blogs);
        setPagination(data.pagination);
        blogCache.set(cacheKey, {
          blogs: data.blogs,
          pagination: data.pagination,
        });
      } else {
        setSnackbar({
          open: true,
          message: data.message || "Failed to fetch blogs",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to fetch blogs",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [search, page, pageSize, blogCache]);

  const fetchSingleBlog = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${id}`);
      const data = await response.json();
      if (response.ok) {
        setSelectedBlog(data.blog);
      } else {
        setSnackbar({
          open: true,
          message: data.message || "Failed to fetch blog",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to fetch blog",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleEdit = useCallback(
    async (blog) => {
      await fetchSingleBlog(blog._id);
      if (isMobile) setDrawerOpen(false);
    },
    [fetchSingleBlog, isMobile]
  );

  const handleDelete = useCallback(
    async (id, isCurrentBlog) => {
      setLoading(true);
      try {
        const response = await fetch("/api/blogs", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: id }),
        });
        if (response.ok) {
          setSnackbar({
            open: true,
            message: "Blog deleted successfully",
            severity: "success",
          });
          blogCache.clear();
          fetchBlogs();
          if (isCurrentBlog) {
            setSelectedBlog(null);
          }
        } else {
          const errorData = await response.json();
          setSnackbar({
            open: true,
            message: errorData.message || "Failed to delete blog",
            severity: "error",
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to delete blog",
          severity: "error",
        });
      } finally {
        setLoading(false);
        if (isMobile) setDrawerOpen(false);
      }
    },
    [fetchBlogs, blogCache]
  );

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
  }, [snackbar]);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [drawerOpen]);

  const resetForm = useCallback(() => {
    setSelectedBlog(null);
    setIsFormDirty(false);
  }, []);

  return (
    <ErrorBoundary>
      <Box className={styles.dashboard}>
        {isMobile ? (
          <>
            <IconButton onClick={toggleDrawer} className={styles.menuButton}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer}
              className={styles.drawer}
            >
              <Box className={styles.drawerContent}>
                <BlogList
                  blogs={blogs}
                  search={search}
                  setSearch={setSearch}
                  loading={loading}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  pagination={pagination}
                  setPage={setPage}
                  resetForm={resetForm}
                  selectedBlog={selectedBlog}
                  fetchBlogs={fetchBlogs}
                  isFormDirty={isFormDirty}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                />
              </Box>
            </Drawer>
          </>
        ) : (
          <Box className={styles.sidebar}>
            <BlogList
              blogs={blogs}
              search={search}
              setSearch={setSearch}
              loading={loading}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              pagination={pagination}
              setPage={setPage}
              resetForm={resetForm}
              selectedBlog={selectedBlog}
              fetchBlogs={fetchBlogs}
              isFormDirty={isFormDirty}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </Box>
        )}
        <Box className={styles.mainContent}>
          <Container maxWidth="lg">
            <BlogForm
              selectedBlog={selectedBlog}
              setSelectedBlog={setSelectedBlog}
              fetchBlogs={fetchBlogs}
              setSnackbar={setSnackbar}
              onEditRequest={handleEdit}
              onDeleteSuccess={resetForm}
              setIsFormDirty={setIsFormDirty}
            />
          </Container>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ErrorBoundary>
  );
}
