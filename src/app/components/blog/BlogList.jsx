'use client';
import { useCallback, useState } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  CircularProgress,
  Typography,
  Card,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit, Delete, Refresh } from '@mui/icons-material';
import debounce from 'lodash/debounce';
import { Pagination } from '@mui/material';
import styles from './BlogList.module.css';

export default function BlogList({
  blogs,
  search,
  setSearch,
  loading,
  handleEdit,
  handleDelete,
  pagination,
  setPage,
  resetForm,
  selectedBlog,
  fetchBlogs,
  isFormDirty,
  pageSize,
  setPageSize,
}) {
  const [itemLoading, setItemLoading] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmDirtyDelete, setConfirmDirtyDelete] = useState(null);

  const debouncedSetSearch = useCallback(
    debounce((value) => setSearch(value), 50),
    [setSearch]
  );

  const handleItemEdit = useCallback(
    async (blog) => {
      setItemLoading((prev) => ({ ...prev, [blog._id]: 'edit' }));
      try {
        await handleEdit(blog);
      } finally {
        setItemLoading((prev) => ({ ...prev, [blog._id]: null }));
      }
    },
    [handleEdit]
  );

  const handleItemDelete = useCallback(
    async (id, isCurrentBlog) => {
      setItemLoading((prev) => ({ ...prev, [id]: 'delete' }));
      try {
        await handleDelete(id, isCurrentBlog);
        if (isCurrentBlog) {
          resetForm();
        }
      } finally {
        setItemLoading((prev) => ({ ...prev, [id]: null }));
      }
    },
    [handleDelete, resetForm]
  );

  const handleReset = useCallback(() => {
    setSearch('');
    setPage(1);
    fetchBlogs();
  }, [setSearch, setPage, fetchBlogs]);

  const confirmDeleteAction = useCallback(() => {
    handleItemDelete(confirmDelete.id, confirmDelete.isCurrentBlog);
    setConfirmDelete(null);
    setConfirmDirtyDelete(null);
  }, [confirmDelete, handleItemDelete]);

  const handleDeleteClick = useCallback(
    (id) => {
      const isCurrentBlog = selectedBlog && selectedBlog._id === id;
      if (isFormDirty) {
        setConfirmDirtyDelete({ id, isCurrentBlog });
      } else {
        setConfirmDelete({ id, isCurrentBlog });
      }
    },
    [selectedBlog, isFormDirty]
  );

  const handlePageSizeChange = useCallback(
    (event) => {
      setPageSize(event.target.value);
      setPage(1);
      fetchBlogs();
    },
    [setPageSize, setPage, fetchBlogs]
  );

  return (
    <Card className={styles.blogList}>
      <Box className={styles.header}>
        <Typography variant="h6" className={styles.headerTitle}>
          Blog Posts
        </Typography>
        <Fab
          size="small"
          color="primary"
          onClick={handleReset}
          disabled={loading}
          className={styles.resetButton}
        >
          <Refresh />
        </Fab>
      </Box>
      <TextField
        fullWidth
        label="Search Blogs"
        value={search}
        onChange={(e) => debouncedSetSearch(e.target.value)}
        disabled={loading}
        size="small"
        className={styles.searchInput}
        InputProps={{ className: styles.searchInputProps }}
        InputLabelProps={{ shrink: !!search || undefined, className: styles.searchLabel }}
      />
      {loading ? (
        <Box className={styles.loader}>
          <CircularProgress size={24} className={styles.loaderIcon} />
        </Box>
      ) : (
        <>
          {blogs.length === 0 ? (
            <Typography className={styles.noBlogs}>No blogs found</Typography>
          ) : (
            <List className={styles.blogListItems}>
              {blogs.map((blog) => (
                <ListItem
                  key={blog._id}
                  className={`${styles.blogItem} ${selectedBlog?._id === blog._id ? styles.selected : ''}`}
                >
                  {itemLoading[blog._id] ? (
                    <CircularProgress size={20} className={styles.loaderIcon} />
                  ) : (
                    <Box className={styles.itemContent}>
                      <Box className={styles.itemActions}>
                        <IconButton
                          onClick={() => handleItemEdit(blog)}
                          disabled={loading || itemLoading[blog._id]}
                          className={styles.editButton}
                          aria-label="Edit blog"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(blog._id)}
                          disabled={loading || itemLoading[blog._id]}
                          className={styles.deleteButton}
                          aria-label="Delete blog"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                      <Box className={styles.itemDetails}>
                        <Typography className={styles.itemTitle}>
                          {blog.title}
                        </Typography>
                        <Box className={styles.itemStatusContainer}>
                          <span
                            className={styles.statusIndicator}
                            style={{
                              backgroundColor: blog.isActive ? 'var(--Five-Color, #22c55e)' : '#eab308',
                            }}
                          />
                          <Typography className={styles.itemStatus}>
                            {blog.isActive ? 'Published' : 'Draft'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>
          )}
          {pagination.pages >= 0 && (
            <Box className={styles.pagination}>
              <FormControl size="small" className={styles.pageSizeSelect}>
                <InputLabel>Page Size</InputLabel>
                <Select
                  value={pageSize}
                  label="Page Size"
                  onChange={handlePageSizeChange}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
              <Pagination
                count={pagination.pages}
                page={pagination.page}
                onChange={(e, value) => setPage(value)}
                className={styles.paginationControl}
                size="small"
              />
            </Box>
          )}
        </>
      )}
      <Dialog
        open={confirmDelete !== null && confirmDirtyDelete === null}
        onClose={() => setConfirmDelete(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this blog? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button
            onClick={confirmDeleteAction}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDirtyDelete !== null}
        onClose={() => setConfirmDirtyDelete(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            You have unsaved changes. Do you want to proceed and delete this blog?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDirtyDelete(null)}>Cancel</Button>
          <Button
            onClick={() => {
              setConfirmDelete(confirmDirtyDelete);
              setConfirmDirtyDelete(null);
            }}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}