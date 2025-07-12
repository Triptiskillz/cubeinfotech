'use client';
import { useCallback } from 'react';
import { Box, Typography } from '@mui/material';

export default function ImageUpload({ onImageSelect, currentImage, error }) {
  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  return (
    <Box className="blog-admin-image-upload" sx={{ my: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Featured Image
      </Typography>
      {currentImage && (
        <Box sx={{ mb: 2 }}>
          <img src={currentImage} alt="Featured" style={{ width: '192px', height: '192px', objectFit: 'cover' }} />
        </Box>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/gif"
        onChange={handleFileChange}
        className="blog-admin-file-input"
      />
      {error && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
    </Box>
  );
}