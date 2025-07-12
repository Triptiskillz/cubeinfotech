'use client';
import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Checkbox, FormControlLabel, CircularProgress, Typography, Card, Divider } from '@mui/material';
import RichTextEditor from './RichTextEditor.jsx';
import ImageUpload from './ImageUpload.jsx';
import slugify from 'slugify';

/**
 * Blog form for creating or editing blog posts.
 * @param {Object} props - Component props
 * @param {Object} props.selectedBlog - Blog data for editing
 * @param {Function} props.setSelectedBlog - Set selected blog state
 * @param {Function} props.fetchBlogs - Function to refetch blogs
 * @param {Function} props.setSnackbar - Function to set Snackbar state
 * @returns {JSX.Element} Blog form component
 */
export default function BlogForm({ selectedBlog, setSelectedBlog, fetchBlogs, setSnackbar }) {
  const { register, handleSubmit, formState: { errors, isDirty }, reset, setValue, control } = useForm({
    defaultValues: {
      title: '',
      featuredImage: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      isActive: false,
    },
    mode: 'onChange',
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Strip HTML tags for content length validation
  const stripHtml = (html) => {
    if (!html || html === '<p><br></p>') return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Populate form with selected blog data
  useEffect(() => {
    if (selectedBlog) {
      setValue('title', selectedBlog.title || '', { shouldDirty: false });
      setValue('featuredImage', selectedBlog.featuredImage || '', { shouldDirty: false });
      setValue('content', selectedBlog.content || '', { shouldDirty: false });
      setValue('metaTitle', selectedBlog.metaTitle || '', { shouldDirty: false });
      setValue('metaDescription', selectedBlog.metaDescription || '', { shouldDirty: false });
      setValue('isActive', selectedBlog.isActive ?? false, { shouldDirty: false });
      setPreviewImage(selectedBlog.featuredImage || null);
    } else {
      reset();
      setPreviewImage(null);
    }
  }, [selectedBlog, setValue, reset]);

  // Handle form submission for create/update
  const onSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      // Validate content length after HTML stripping
      const cleanContent = stripHtml(data.content);
      if (cleanContent.length < 10) {
        setSnackbar({
          open: true,
          message: 'Content must be at least 10 characters (excluding HTML)',
          severity: 'error',
        });
        return;
      }

      const method = selectedBlog ? 'PUT' : 'POST';
      const url = selectedBlog ? `/api/blogs/${selectedBlog._id}` : '/api/blogs';
      const body = {
        title: data.title,
        content: data.content,
        featuredImage: data.featuredImage,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        slug: slugify(data.title, { lower: true, strict: true }),
        isActive: data.isActive,
      };

      console.log('Submitting to:', url, 'Method:', method, 'Body:', {
        ...body,
        featuredImage: body.featuredImage ? `${body.featuredImage.slice(0, 30)}...` : null, // Truncate for readability
      }); // Debug log

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log('Response:', result); // Debug log

      if (response.ok) {
        setSnackbar({ open: true, message: `Blog ${selectedBlog ? 'updated' : 'created'} successfully`, severity: 'success' });
        await fetchBlogs();
        if (!selectedBlog) {
          setSelectedBlog(result.blog);
          setValue('title', result.blog.title, { shouldDirty: false });
          setValue('featuredImage', result.blog.featuredImage, { shouldDirty: false });
          setValue('content', result.blog.content || '', { shouldDirty: false });
          setValue('metaTitle', result.blog.metaTitle || '', { shouldDirty: false });
          setValue('metaDescription', result.blog.metaDescription || '', { shouldDirty: false });
          setValue('isActive', result.blog.isActive ?? false, { shouldDirty: false });
          setPreviewImage(result.blog.featuredImage || null);
        } else {
          setSelectedBlog(null);
          reset();
        }
      } else {
        throw new Error(result.message || `Operation failed: ${result.errors ? JSON.stringify(result.errors) : response.statusText}`);
      }
    } catch (error) {
      console.error('Submit error:', error); // Debug log
      setSnackbar({
        open: true,
        message: error.message || 'Failed to save blog. Please check your input and try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [selectedBlog, fetchBlogs, setSelectedBlog, reset, setValue, setSnackbar]);

  return (
    <Card className="blog-admin-form">
      <Typography variant="h5" style={{ color: 'var(--Primary-Color)', fontWeight: 700, marginBottom: '24px' }}>
        {selectedBlog ? 'Edit Blog' : 'Create Blog'}
      </Typography>
      <Divider style={{ marginBottom: '24px', borderColor: '#e5e7eb' }} />
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Box>
          <Typography variant="subtitle1" style={{ fontWeight: 500, marginBottom: '8px', color: '#374151' }}>
            Content
          </Typography>
          <TextField
            fullWidth
            label="Title"
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 3, message: 'Minimum 3 characters' },
              maxLength: { value: 200, message: 'Maximum 200 characters' },
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={loading}
            size="small"
            style={{ width: '100%' }}
            InputProps={{ style: { borderRadius: '8px', borderColor: '#d1d5db' } }}
            InputLabelProps={{ shrink: !!selectedBlog || undefined, style: { color: '#6b7280' } }}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" style={{ fontWeight: 500, marginBottom: '8px', color: '#374151' }}>
            Featured Image
          </Typography>
          <ImageUpload
            register={register}
            setValue={setValue}
            errors={errors}
            defaultValue={selectedBlog?.featuredImage}
            disabled={loading}
            setSnackbar={setSnackbar}
            setPreviewImage={setPreviewImage}
            previewImage={previewImage}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" style={{ marginBottom: '8px', color: '#374151' }}>
            Blog Content
          </Typography>
          <RichTextEditor
            disabled={loading}
            error={!!errors.content}
            helperText={errors.content?.message}
            control={control}
            name="content"
            register={register('content', {
              required: 'Content is required',
              validate: {
                minLength: (value) => stripHtml(value).length >= 10 || 'Content must be at least 10 characters (excluding HTML)',
              },
            })}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" style={{ fontWeight: 500, marginBottom: '8px', color: '#374151' }}>
            SEO
          </Typography>
          <TextField
            fullWidth
            label="Meta Title"
            {...register('metaTitle', { maxLength: { value: 70, message: 'Maximum 70 characters' } })}
            error={!!errors.metaTitle}
            helperText={errors.metaTitle?.message}
            disabled={loading}
            size="small"
            style={{ width: '100%' }}
            InputProps={{ style: { borderRadius: '8px', borderColor: '#d1d5db' } }}
            InputLabelProps={{ shrink: !!selectedBlog || undefined, style: { color: '#6b7280' } }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Meta Description"
            multiline
            rows={2}
            {...register('metaDescription', { maxLength: { value: 160, message: 'Maximum 160 characters' } })}
            error={!!errors.metaDescription}
            helperText={errors.metaDescription?.message}
            disabled={loading}
            size="small"
            style={{ width: '100%' }}
            InputProps={{ style: { borderRadius: '8px', borderColor: '#d1d5db' } }}
            InputLabelProps={{ shrink: !!selectedBlog || undefined, style: { color: '#6b7280' } }}
          />
        </Box>
        <Box>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} disabled={loading} style={{ color: 'var(--Primary-Color)' }} />}
                label="Publish"
                style={{ marginTop: '8px', color: '#374151' }}
              />
            )}
          />
        </Box>
        <Box style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <button
            type="submit"
            disabled={loading || !isDirty}
            className="blog-admin-button"
            style={{
              backgroundColor: 'var(--Primary-Color)',
              color: 'var(--Fourth-Color)',
              borderRadius: '8px',
              padding: '8px 24px',
              fontWeight: 600,
            }}
          >
            {loading ? <CircularProgress size={20} style={{ color: 'var(--Fourth-Color)' }} /> : (selectedBlog ? 'Update' : 'Create')}
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedBlog(null);
              reset();
              setPreviewImage(null);
            }}
            disabled={loading || !isDirty}
            className="blog-admin-button"
            style={{
              border: '1px solid var(--Secondary-Color)',
              color: 'var(--Secondary-Color)',
              borderRadius: '8px',
              padding: '8px 24px',
              fontWeight: 600,
            }}
          >
            Clear
          </button>
        </Box>
      </form>
    </Card>
  );
}