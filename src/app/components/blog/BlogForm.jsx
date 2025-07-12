'use client';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, FormControlLabel, Switch, CircularProgress } from '@mui/material';
import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';
import ImageCropper from './ImageCropper';

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
  const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      content: '',
      featuredImage: '',
      metaTitle: '',
      metaDescription: '',
      isActive: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (selectedBlog) {
      setValue('title', selectedBlog.title);
      setValue('content', selectedBlog.content);
      setValue('featuredImage', selectedBlog.featuredImage || '');
      setValue('metaTitle', selectedBlog.metaTitle || '');
      setValue('metaDescription', selectedBlog.metaDescription || '');
      setValue('isActive', selectedBlog.isActive);
    }
  }, [selectedBlog, setValue]);

  const handleImageSelect = useCallback((file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
      setCropperOpen(true);
    }
  }, []);

  const handleImageCrop = useCallback(async (croppedFile) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', croppedFile);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        const imageUrl = data.imageUrl;
        if (!/^\/uploads\/.+\.(jpg|jpeg|png|gif)$/.test(imageUrl)) {
          throw new Error('Invalid image URL returned from server');
        }
        setValue('featuredImage', imageUrl, { shouldValidate: true });
        setCropperOpen(false);
        setImageSrc(null);
      } else {
        setSnackbar({ open: true, message: data.message || 'Failed to upload image', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to upload image: ' + error.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [setValue, setSnackbar]);

  const onSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      const url = selectedBlog ? `/api/blogs/${selectedBlog._id}` : '/api/blogs';
      const method = selectedBlog ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setSnackbar({ open: true, message: result.message, severity: 'success' });
        reset();
        setSelectedBlog(null);
        fetchBlogs();
      } else {
        setSnackbar({ open: true, message: result.message || 'Failed to save blog', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to save blog: ' + error.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [selectedBlog, setSelectedBlog, fetchBlogs, reset, setSnackbar]);

  return (
    <Box className="blog-admin-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Title"
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 3, message: 'Title must be at least 3 characters' },
            maxLength: { value: 200, message: 'Title cannot exceed 200 characters' },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
        />
        <Box sx={{ my: 2 }}>
          <RichTextEditor
            control={control}
            name="content"
            label="Content"
            defaultValue=""
          />
        </Box>
        <ImageUpload
          onImageSelect={handleImageSelect}
          currentImage={control._formValues.featuredImage}
          error={errors.featuredImage?.message}
        />
        <ImageCropper
          open={cropperOpen}
          imageSrc={imageSrc}
          onCrop={handleImageCrop}
          onClose={() => setCropperOpen(false)}
        />
        <TextField
          fullWidth
          label="Meta Title"
          {...register('metaTitle', {
            maxLength: { value: 70, message: 'Meta title cannot exceed 70 characters' },
          })}
          error={!!errors.metaTitle}
          helperText={errors.metaTitle?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Meta Description"
          {...register('metaDescription', {
            maxLength: { value: 160, message: 'Meta description cannot exceed 160 characters' },
          })}
          error={!!errors.metaDescription}
          helperText={errors.metaDescription?.message}
          margin="normal"
        />
        <FormControlLabel
          control={<Switch {...register('isActive')} />}
          label="Publish"
        />
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className="blog-admin-button"
            sx={{ backgroundColor: 'var(--Primary-Color)', color: 'var(--Fourth-Color)' }}
          >
            {loading ? <CircularProgress size={24} /> : selectedBlog ? 'Update Blog' : 'Create Blog'}
          </Button>
          {selectedBlog && (
            <Button
              variant="outlined"
              onClick={() => {
                reset();
                setSelectedBlog(null);
              }}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}