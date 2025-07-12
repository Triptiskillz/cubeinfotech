'use client';
import { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import ImageCropper from './ImageCropper';

/**
 * Image upload component with preview and cropping functionality.
 * @param {Object} props - Component props
 * @param {Object} props.register - react-hook-form register
 * @param {Function} props.setValue - react-hook-form setValue
 * @param {Object} props.errors - Form errors
 * @param {string} props.defaultValue - Default image URL
 * @param {boolean} props.disabled - Disable input
 * @param {Function} props.setSnackbar - Set Snackbar state
 * @param {Function} props.setPreviewImage - Set preview image state
 * @param {string} props.previewImage - Current preview image URL
 * @returns {JSX.Element} Image upload component
 */
export default function ImageUpload({ register, setValue, errors, defaultValue, disabled, setSnackbar, setPreviewImage, previewImage }) {
  const [showCropper, setShowCropper] = useState(false);

  const handleFileChange = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setSnackbar({ open: true, message: 'Invalid file type. Only JPEG, PNG, or GIF allowed.', severity: 'error' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSnackbar({ open: true, message: 'File size exceeds 5MB limit.', severity: 'error' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setPreviewImage(result);
      setValue('featuredImage', result, { shouldDirty: true });
    };
    reader.readAsDataURL(file);
  }, [setValue, setSnackbar, setPreviewImage]);

  const handleCrop = useCallback((croppedImage) => {
    setPreviewImage(croppedImage);
    setValue('featuredImage', croppedImage, { shouldDirty: true });
    setShowCropper(false);
    setSnackbar({ open: true, message: 'Image cropped successfully', severity: 'success' });
  }, [setValue, setSnackbar, setPreviewImage]);

  const handleEditClick = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (previewImage) {
      setShowCropper(true);
    } else {
      setSnackbar({ open: true, message: 'No image to crop', severity: 'error' });
    }
  }, [previewImage, setSnackbar]);

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="blog-admin-image-upload">
      {previewImage && (
        <Box style={{ position: 'relative', width: '192px', height: '192px' }}>
          <img src={previewImage} alt="Preview" className="blog-admin-image-upload" />
          <button
            onClick={handleEditClick}
            disabled={disabled || !previewImage}
            className="blog-admin-button"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              backgroundColor: 'var(--Primary-Color)',
              color: 'var(--Fourth-Color)',
              borderRadius: '50%',
              padding: '8px',
            }}
            aria-label="Edit image"
          >
            <Edit fontSize="small" />
          </button>
        </Box>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/gif"
        onChange={handleFileChange}
        disabled={disabled}
        className="blog-admin-file-input"
      />
      {errors.featuredImage && (
        <Typography style={{ color: '#dc2626', fontSize: '12px' }}>
          {errors.featuredImage.message}
        </Typography>
      )}
      {showCropper && previewImage && (
        <ImageCropper
          image={previewImage}
          onCrop={handleCrop}
          onCancel={() => setShowCropper(false)}
        />
      )}
    </Box>
  );
}