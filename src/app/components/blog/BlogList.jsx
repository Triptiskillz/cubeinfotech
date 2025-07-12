'use client';
import { useCallback, useState } from 'react';
import { Box, TextField, List, ListItem, ListItemText, CircularProgress, Typography, Card } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import debounce from 'lodash/debounce';
import { Pagination } from '@mui/material';

/**
 * Blog list component for displaying published blogs in a sticky sidebar.
 * @param {Object} props - Component props
 * @param {Array} props.blogs - List of blog posts
 * @param {string} props.search - Search query
 * @param {Function} props.setSearch - Set search query
 * @param {boolean} props.loading - Global loading state
 * @param {Function} props.handleEdit - Edit blog handler
 * @param {Function} props.handleDelete - Delete blog handler
 * @param {Object} props.pagination - Pagination data
 * @param {Function} props.setPage - Set current page
 * @returns {JSX.Element} Blog list component
 */
export default function BlogList({ blogs, search, setSearch, loading, handleEdit, handleDelete, pagination, setPage }) {
  const [itemLoading, setItemLoading] = useState({});

  const debouncedSetSearch = useCallback(
    debounce((value) => setSearch(value), 300),
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
    async (id) => {
      setItemLoading((prev) => ({ ...prev, [id]: 'delete' }));
      try {
        await handleDelete(id);
      } finally {
        setItemLoading((prev) => ({ ...prev, [id]: null }));
      }
    },
    [handleDelete]
  );

  return (
    <Card className="blog-admin-list">
      <Box style={{ padding: '16px' }}>
        <Typography variant="h6" style={{ fontWeight: 700, color: 'var(--Primary-Color)', marginBottom: '16px' }}>
          Blog Posts
        </Typography>
        <TextField
          fullWidth
          label="Search Blogs"
          value={search}
          onChange={(e) => debouncedSetSearch(e.target.value)}
          disabled={loading}
          size="small"
          style={{ width: '100%', backgroundColor: '#f9fafb', borderRadius: '8px' }}
          InputProps={{ style: { borderRadius: '8px', borderColor: '#d1d5db' } }}
          InputLabelProps={{ shrink: !!search || undefined, style: { color: '#6b7280' } }}
        />
        {loading ? (
          <Box style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
            <CircularProgress size={24} style={{ color: 'var(--Primary-Color)' }} />
          </Box>
        ) : (
          <>
            {blogs.length === 0 ? (
              <Typography style={{ color: '#6b7280', marginTop: '16px' }}>No blogs found</Typography>
            ) : (
              <List style={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto', padding: 0 }}>
                {blogs.map((blog) => (
                  <ListItem
                    key={blog._id}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb',
                      marginBottom: '4px',
                      transition: 'background-color 0.2s ease',
                    }}
                    className="blog-admin-list-item"
                    secondaryAction={
                      itemLoading[blog._id] ? (
                        <CircularProgress size={20} style={{ color: 'var(--Primary-Color)' }} />
                      ) : (
                        <Box style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleItemEdit(blog)}
                            disabled={loading || itemLoading[blog._id]}
                            className="blog-admin-button"
                            style={{
                              backgroundColor: 'var(--Primary-Color)',
                              color: 'var(--Fourth-Color)',
                              borderRadius: '50%',
                              padding: '8px',
                            }}
                            aria-label="Edit blog"
                          >
                            <Edit fontSize="small" />
                          </button>
                          <button
                            onClick={() => handleItemDelete(blog._id)}
                            disabled={loading || itemLoading[blog._id]}
                            className="blog-admin-button"
                            style={{
                              backgroundColor: 'var(--Secondary-Color)',
                              color: 'var(--Fourth-Color)',
                              borderRadius: '50%',
                              padding: '8px',
                            }}
                            aria-label="Delete blog"
                          >
                            <Delete fontSize="small" />
                          </button>
                        </Box>
                      )
                    }
                  >
                    <ListItemText
                      primary={
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            variant="body2"
                            style={{ fontWeight: 500, paddingRight: '16px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {blog.title}
                          </Typography>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              marginLeft: '8px',
                              backgroundColor: blog.isActive ? 'var(--Five-Color)' : '#eab308',
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          style={{ color: blog.isActive ? 'var(--Five-Color)' : '#6b7280' }}
                        >
                          {blog.isActive ? 'Published' : 'Draft'}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
            {pagination.pages > 1 && (
              <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Pagination
                  count={pagination.pages}
                  page={pagination.page}
                  onChange={(e, value) => setPage(value)}
                  style={{ color: 'var(--Primary-Color)' }}
                  size="small"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Card>
  );
}