'use client';
import { useState, useCallback } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Slider, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Cropper from 'react-easy-crop';
import { Close, Fullscreen, FullscreenExit } from '@mui/icons-material';
import getCroppedImg from './getCroppedImg';

export default function ImageCropper({ open, imageSrc, onCrop, onClose }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(16 / 9);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCrop(croppedImage);
    } catch (error) {
      console.error('ImageCropper - Crop error:', error);
    }
  }, [imageSrc, croppedAreaPixels, onCrop]);

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen((prev) => !prev);
  }, []);

  const aspectRatios = [
    { label: '16:9', value: 16 / 9 },
    { label: '4:3', value: 4 / 3 },
    { label: '1:1', value: 1 },
    { label: 'Free', value: null },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isFullScreen ? false : 'sm'}
      fullWidth={!isFullScreen}
      fullScreen={isFullScreen}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'var(--Primary-Color-Background)',
          borderRadius: isFullScreen ? 0 : '8px',
        },
        '& .MuiDialogTitle-root': {
          backgroundColor: 'var(--Primary-Color)',
          color: 'var(--Fourth-Color)',
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }}
    >
      <DialogTitle>
        Crop Image
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Aspect Ratio</InputLabel>
            <Select
              value={aspect}
              label="Aspect Ratio"
              onChange={(e) => setAspect(e.target.value === 'null' ? null : e.target.value)}
            >
              {aspectRatios.map((ratio) => (
                <MenuItem key={ratio.label} value={ratio.value}>
                  {ratio.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={toggleFullScreen} sx={{ color: 'var(--Fourth-Color)' }}>
            {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
          <IconButton onClick={onClose} sx={{ color: 'var(--Fourth-Color)' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {imageSrc && (
          <Box sx={{ position: 'relative', width: '100%', height: isFullScreen ? '80vh' : 300, my: 2 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              restrictPosition={false} // Allows free-form cropping when aspect is null
              cropShape="rect"
              showGrid={true}
            />
          </Box>
        )}
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, value) => setZoom(value)}
          aria-labelledby="Zoom"
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleCrop}
          variant="contained"
          sx={{ backgroundColor: 'var(--Primary-Color)', color: 'var(--Fourth-Color)' }}
        >
          Crop
        </Button>
      </DialogActions>
    </Dialog>
  );
}