'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Drawer, IconButton, Snackbar, Alert, useMediaQuery, useTheme, Box, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import BlogForm from '../components/blog/BlogForm';
import BlogList from '../components/blog/BlogList';
import ErrorBoundary from '../components/ErrorBoundary';

/**
 * Admin dashboard for managing blog posts.
 * @returns {JSX.Element} Admin dashboard component
 */
export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Cache blogs to avoid redundant fetches
  const blogCache = useMemo(() => new Map(), []);

  // Fetch blogs with pagination and search
  const fetchBlogs = useCallback(async () => {
    const cacheKey = `${search}_${page}`;
    if (blogCache.has(cacheKey)) {
      const { blogs, pagination } = blogCache.get(cacheKey);
      setBlogs(blogs);
      setPagination(pagination);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/blogs?search=${encodeURIComponent(search)}&page=${page}&limit=10`);
      const data = await response.json();
      if (response.ok) {
        setBlogs(data.blogs);
        setPagination(data.pagination);
        blogCache.set(cacheKey, { blogs: data.blogs, pagination: data.pagination });
      } else {
        setSnackbar({ open: true, message: data.message || 'Failed to fetch blogs', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to fetch blogs', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [search, page, blogCache]);

  // Fetch a single blog for editing
  const fetchSingleBlog = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${id}`);
      const data = await response.json();
      if (response.ok) {
        setSelectedBlog(data.blog);
      } else {
        setSnackbar({ open: true, message: data.message || 'Failed to fetch blog', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to fetch blog', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle edit action
  const handleEdit = useCallback(
    async (blog) => {
      await fetchSingleBlog(blog._id);
      if (isMobile) setDrawerOpen(false);
    },
    [fetchSingleBlog, isMobile]
  );

  // Handle delete action
  const handleDelete = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const response = await fetch('/api/blogs', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: id }),
        });
        if (response.ok) {
          setSnackbar({ open: true, message: 'Blog deleted successfully', severity: 'success' });
          blogCache.clear(); // Clear cache on delete
          fetchBlogs();
        } else {
          const errorData = await response.json();
          setSnackbar({ open: true, message: errorData.message || 'Failed to delete blog', severity: 'error' });
        }
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to delete blog', severity: 'error' });
      } finally {
        setLoading(false);
        if (isMobile) setDrawerOpen(false);
      }
    },
    [fetchBlogs, blogCache]
  );

  // Close Snackbar
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
  }, [snackbar]);

  // Toggle mobile drawer
  const toggleDrawer = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [drawerOpen]);

  return (
    <ErrorBoundary>
      <Box style={{ minHeight: '100vh', backgroundColor: 'var(--Secondary-Color-Background)', display: 'flex' }}>
        {isMobile ? (
          <>
            <IconButton
              onClick={toggleDrawer}
              className="blog-admin-menu"
              style={{ position: 'fixed', top: '16px', left: '16px', zIndex: 50 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer}
              style={{ width: '80%', maxWidth: '320px' }}
            >
              <Box style={{ padding: '12px', backgroundColor: 'var(--Primary-Color-Background)' }}>
                <Typography variant="h6" style={{ fontWeight: 700, marginBottom: '12px', color: 'var(--Primary-Color)' }}>
                  Blog Posts
                </Typography>
                <BlogList
                  blogs={blogs}
                  search={search}
                  setSearch={setSearch}
                  loading={loading}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  pagination={pagination}
                  setPage={setPage}
                />
              </Box>
            </Drawer>
          </>
        ) : (
          <Box style={{ width: '320px', flexShrink: 0 }}>
            <BlogList
              blogs={blogs}
              search={search}
              setSearch={setSearch}
              loading={loading}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              pagination={pagination}
              setPage={setPage}
            />
          </Box>
        )}
        <Box style={{ flexGrow: 1, padding: '16px' }}>
          <Container maxWidth="lg">
            <BlogForm
              selectedBlog={selectedBlog}
              setSelectedBlog={setSelectedBlog}
              fetchBlogs={fetchBlogs}
              setSnackbar={setSnackbar}
            />
          </Container>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            style={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ErrorBoundary>
  );
}