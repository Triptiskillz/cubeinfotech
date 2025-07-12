'use client';
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Box, Dialog, DialogActions, DialogContent, Slider, Typography, IconButton } from '@mui/material';
import { Close, Fullscreen, FullscreenExit } from '@mui/icons-material';
import getCroppedImg from './getCroppedImg';

/**
 * Image cropper component using react-easy-crop.
 * @param {Object} props - Component props
 * @param {string} props.image - Image data URL
 * @param {Function} props.onCrop - Callback for cropped image
 * @param {Function} props.onCancel - Callback to close cropper
 * @returns {JSX.Element} Image cropper component
 */
export default function ImageCropper({ image, onCrop, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(16 / 9);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCrop(croppedImage);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  }, [image, croppedAreaPixels, onCrop]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  return (
    <Dialog
      open={!!image}
      onClose={handleCancel}
      maxWidth={isFullScreen ? false : 'lg'}
      fullWidth
      style={isFullScreen ? { margin: 0, width: '100%', height: '100%' } : { width: '80%', maxWidth: '1200px', height: '80%' }}
    >
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'var(--Primary-Color)', color: 'var(--Fourth-Color)' }}>
        <Typography variant="h6" style={{ fontWeight: 700 }}>Crop Image</Typography>
        <Box style={{ display: 'flex', gap: '8px' }}>
          <IconButton
            onClick={() => setIsFullScreen(!isFullScreen)}
            style={{ color: 'var(--Fourth-Color)' }}
            className="blog-admin-button"
            aria-label={isFullScreen ? 'Exit full screen' : 'Enter full screen'}
          >
            {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
          <IconButton
            onClick={handleCancel}
            style={{ color: 'var(--Fourth-Color)' }}
            className="blog-admin-button"
            aria-label="Close cropper"
          >
            <Close />
          </IconButton>
        </Box>
      </Box>
      <DialogContent style={{ padding: 0 }}>
        <Box style={{ position: 'relative', height: '60vh' }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            restrictPosition={aspect === null ? false : true}
            showGrid
          />
        </Box>
        <Box style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography style={{ color: '#374151' }}>Zoom</Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, value) => setZoom(value)}
            style={{ color: 'var(--Primary-Color)' }}
          />
          <Typography style={{ color: '#374151' }}>Aspect Ratio</Typography>
          <Box style={{ display: 'flex', gap: '8px' }}>
            <button
              className="blog-admin-button"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: aspect === 16 / 9 ? 'var(--Primary-Color)' : '#e5e7eb',
                color: aspect === 16 / 9 ? 'var(--Fourth-Color)' : '#374151',
              }}
              onClick={() => setAspect(16 / 9)}
            >
              16:9
            </button>
            <button
              className="blog-admin-button"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: aspect === 4 / 3 ? 'var(--Primary-Color)' : '#e5e7eb',
                color: aspect === 4 / 3 ? 'var(--Fourth-Color)' : '#374151',
              }}
              onClick={() => setAspect(4 / 3)}
            >
              4:3
            </button>
            <button
              className="blog-admin-button"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: aspect === 1 / 1 ? 'var(--Primary-Color)' : '#e5e7eb',
                color: aspect === 1 / 1 ? 'var(--Fourth-Color)' : '#374151',
              }}
              onClick={() => setAspect(1 / 1)}
            >
              1:1
            </button>
            <button
              className="blog-admin-button"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: aspect === null ? 'var(--Primary-Color)' : '#e5e7eb',
                color: aspect === null ? 'var(--Fourth-Color)' : '#374151',
              }}
              onClick={() => setAspect(null)}
            >
              Free
            </button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions style={{ padding: '16px' }}>
        <button
          onClick={handleCancel}
          className="blog-admin-button"
          style={{
            backgroundColor: 'var(--Secondary-Color)',
            color: 'var(--Fourth-Color)',
            borderRadius: '8px',
            padding: '8px 24px',
            fontWeight: 600,
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleCrop}
          className="blog-admin-button"
          style={{
            backgroundColor: 'var(--Primary-Color)',
            color: 'var(--Fourth-Color)',
            borderRadius: '8px',
            padding: '8px 24px',
            fontWeight: 600,
          }}
        >
          Crop
        </button>
      </DialogActions>
    </Dialog>
  );
}