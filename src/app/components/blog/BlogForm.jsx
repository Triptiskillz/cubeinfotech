'use client';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert,
  Slider,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add,
  Crop,
  Close,
  Fullscreen,
  FullscreenExit,
  Visibility,
} from '@mui/icons-material';
import Cropper from 'react-easy-crop';
import dynamic from 'next/dynamic';
import RichTextEditor from './RichTextEditor';
import getCroppedImg from './getCroppedImg';
import styles from './BlogForm.module.css';
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
import 'react-quill-new/dist/quill.bubble.css';

export default function BlogForm({
  selectedBlog,
  setSelectedBlog,
  fetchBlogs,
  setSnackbar,
  onEditRequest,
  onDeleteSuccess,
  setIsFormDirty,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm({
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
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(16 / 9);
  const [isCropperFullScreen, setIsCropperFullScreen] = useState(false);
  const [confirmStatusChange, setConfirmStatusChange] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const isActive = watch('isActive');

  useEffect(() => {
    if (selectedBlog) {
      setValue('title', selectedBlog.title, { shouldDirty: false });
      setValue('content', selectedBlog.content, { shouldDirty: false });
      setValue('featuredImage', selectedBlog.featuredImage || '', {
        shouldDirty: false,
      });
      setValue('metaTitle', selectedBlog.metaTitle || '', {
        shouldDirty: false,
      });
      setValue('metaDescription', selectedBlog.metaDescription || '', {
        shouldDirty: false,
      });
      setValue('isActive', selectedBlog.isActive, { shouldDirty: false });
      setOriginalImage(selectedBlog.featuredImage || null);
      setTempImage(selectedBlog.featuredImage || null);
      setImageSrc(selectedBlog.featuredImage || null);
    } else {
      reset();
      setOriginalImage(null);
      setTempImage(null);
      setImageSrc(null);
    }
  }, [selectedBlog, setValue, reset]);

  useEffect(() => {
    setIsFormDirty(isDirty);
  }, [isDirty, setIsFormDirty]);

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result);
          setTempImage(reader.result);
          setCropperOpen(true);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const reader = new FileReader();
      reader.onload = () => {
        setTempImage(reader.result);
        setValue('featuredImage', reader.result, { shouldValidate: true });
        setCropperOpen(false);
      };
      reader.readAsDataURL(croppedImage);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to crop image',
        severity: 'error',
      });
    }
  }, [imageSrc, croppedAreaPixels, setValue, setSnackbar]);

  const handleUndo = useCallback(() => {
    setTempImage(originalImage);
    setValue('featuredImage', originalImage, { shouldValidate: true });
    setCropperOpen(false);
  }, [originalImage, setValue]);

  const handleCreateNew = useCallback(() => {
    if (isDirty) {
      setConfirmClear(true);
    } else {
      reset();
      setSelectedBlog(null);
      setOriginalImage(null);
      setTempImage(null);
      setImageSrc(null);
    }
  }, [isDirty, reset, setSelectedBlog]);

  const confirmClearAction = useCallback(() => {
    reset();
    setSelectedBlog(null);
    setOriginalImage(null);
    setTempImage(null);
    setImageSrc(null);
    setConfirmClear(false);
  }, [reset, setSelectedBlog]);

  const handleEditRequest = useCallback(
    (blog) => {
      if (isDirty) {
        setConfirmEdit(blog);
      } else {
        onEditRequest(blog);
      }
    },
    [isDirty, onEditRequest]
  );

  const confirmEditAction = useCallback(() => {
    reset();
    onEditRequest(confirmEdit);
    setConfirmEdit(null);
  }, [confirmEdit, onEditRequest, reset]);

  const handleStatusChange = useCallback(
    (event) => {
      if (selectedBlog) {
        setConfirmStatusChange(event.target.checked);
      } else {
        setValue('isActive', event.target.checked, { shouldValidate: true });
      }
    },
    [selectedBlog, setValue]
  );

  const confirmStatusAction = useCallback(() => {
    setValue('isActive', confirmStatusChange, { shouldValidate: true });
    setConfirmStatusChange(null);
  }, [confirmStatusChange, setValue]);

  const handleViewOpen = useCallback(() => {
    setViewOpen(true);
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      setLoading(true);
      try {
        let imageUrl = data.featuredImage;
        if (data.featuredImage && data.featuredImage.startsWith('data:')) {
          const formData = new FormData();
          const blob = await fetch(data.featuredImage).then((res) => res.blob());
          formData.append('file', blob, `blog-image-${Date.now()}.jpg`);
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          const uploadResult = await uploadResponse.json();
          if (!uploadResponse.ok) {
            throw new Error(uploadResult.message || 'Failed to upload image');
          }
          imageUrl = uploadResult.imageUrl;
        }

        const blogData = { ...data, featuredImage: imageUrl };
        const url = selectedBlog ? `/api/blogs/${selectedBlog._id}` : '/api/blogs';
        const method = selectedBlog ? 'PUT' : 'POST';
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogData),
        });
        const result = await response.json();
        if (response.ok) {
          setSnackbar({
            open: true,
            message: result.message,
            severity: 'success',
          });
          reset();
          setSelectedBlog(null);
          setOriginalImage(null);
          setTempImage(null);
          setImageSrc(null);
          fetchBlogs();
        } else {
          setSnackbar({
            open: true,
            message: result.message || 'Failed to save blog',
            severity: 'error',
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to save blog: ' + error.message,
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [selectedBlog, setSelectedBlog, fetchBlogs, reset, setSnackbar]
  );

  const aspectRatios = [
    { label: '16:9', value: 16 / 9 },
    { label: '4:3', value: 4 / 3 },
    { label: '1:1', value: 1 },
    { label: 'Free', value: null },
  ];

  return (
    <Box className={styles.blogForm}>
      <Box className={styles.header}>
        <Box className={styles.headerContent}>
          <Typography variant="h6" className={styles.headerTitle}>
            {selectedBlog ? 'Edit Blog' : 'Create Blog'}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                {...register('isActive')}
                checked={isActive}
                onChange={handleStatusChange}
                className={styles.statusCheckbox}
              />
            }
            label={isActive ? 'Published' : 'Draft'}
          />
        </Box>
        <Box className={styles.headerActions}>
          {selectedBlog && (
            <Button
              variant="outlined"
              startIcon={<Visibility />}
              onClick={handleViewOpen}
              className={styles.viewButton}
            >
              View
            </Button>
          )}
          <Fab
            size="small"
            color="primary"
            onClick={handleCreateNew}
            disabled={loading}
            className={styles.createButton}
          >
            <Add />
          </Fab>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Meta Title"
          {...register('metaTitle', {
            maxLength: {
              value: 70,
              message: 'Meta title cannot exceed 70 characters',
            },
          })}
          error={!!errors.metaTitle}
          helperText={errors.metaTitle?.message}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Meta Description"
          {...register('metaDescription', {
            maxLength: {
              value: 160,
              message: 'Meta description cannot exceed 160 characters',
            },
          })}
          error={!!errors.metaDescription}
          helperText={errors.metaDescription?.message}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Title"
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters',
            },
            maxLength: {
              value: 200,
              message: 'Title cannot exceed 200 characters',
            },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Box className={styles.imageManager}>
          <Typography variant="subtitle1" gutterBottom>
            Featured Image
          </Typography>
          {tempImage ? (
            <Box className={styles.preview}>
              <Box className={styles.imageContainer}>
                <img src={tempImage} alt="Featured" className={styles.image} />
                <IconButton
                  onClick={() => setCropperOpen(true)}
                  className={styles.cropButton}
                >
                  <Crop />
                </IconButton>
              </Box>
              <Button
                variant="outlined"
                onClick={() => document.getElementById('imageInput').click()}
                className={styles.changeButton}
              >
                Change Image
              </Button>
              <input
                id="imageInput"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
            </Box>
          ) : (
            <Box className={styles.noImage}>
              <Typography variant="caption" color="textSecondary">
                No image selected
              </Typography>
              <Button
                variant="outlined"
                onClick={() => document.getElementById('imageInput').click()}
                className={styles.uploadButton}
              >
                Upload Image
              </Button>
              <input
                id="imageInput"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
            </Box>
          )}
          {errors.featuredImage && (
            <Typography color="error" variant="caption">
              {errors.featuredImage.message}
            </Typography>
          )}
          {!control._formValues.featuredImage && selectedBlog && (
            <Alert severity="error" className={styles.imageWarning}>
              Featured image is required
            </Alert>
          )}
        </Box>
        <RichTextEditor
          control={control}
          name="content"
          label="Content"
          defaultValue=""
        />
        <Box className={styles.actions}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : selectedBlog ? (
              'Update Blog'
            ) : (
              'Create Blog'
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={handleCreateNew}
            disabled={!isDirty || loading}
            className={styles.clearButton}
          >
            Clear
          </Button>
        </Box>
      </form>
      <Dialog
        open={cropperOpen}
        onClose={handleUndo}
        maxWidth="md"
        fullWidth
        fullScreen={isCropperFullScreen}
        className={styles.cropperDialog}
      >
        <DialogTitle className={styles.cropperTitle}>
          Crop Image
          <Box className={styles.cropperActions}>
            <FormControl size="small" className={styles.aspectSelect}>
              <InputLabel>Aspect Ratio</InputLabel>
              <Select
                value={aspect}
                label="Aspect Ratio"
                onChange={(e) =>
                  setAspect(e.target.value === 'null' ? null : e.target.value)
                }
              >
                {aspectRatios.map((ratio) => (
                  <MenuItem key={ratio.label} value={ratio.value}>
                    {ratio.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton
              onClick={() => setIsCropperFullScreen(!isCropperFullScreen)}
            >
              {isCropperFullScreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
            <IconButton onClick={handleUndo}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {imageSrc && (
            <Box className={styles.cropperContainer}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                restrictPosition={true}
                cropShape="rect"
                showGrid={true}
                minZoom={0.5}
              />
            </Box>
          )}
          <Slider
            value={zoom}
            min={0.5}
            max={3}
            step={0.1}
            onChange={(e, value) => setZoom(value)}
            aria-labelledby="Zoom"
            className={styles.zoomSlider}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUndo} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleCrop}
            variant="contained"
            className={styles.popupCropButton}
          >
            Crop
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmClear}
        onClose={() => setConfirmClear(false)}
      >
        <DialogTitle>Confirm Clear</DialogTitle>
        <DialogContent>
          <Typography>Your unsaved changes will be lost. Proceed?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmClear(false)}>Cancel</Button>
          <Button
            onClick={confirmClearAction}
            color="error"
            variant="contained"
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmStatusChange !== null}
        onClose={() => setConfirmStatusChange(null)}
      >
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to change the status to{' '}
            {confirmStatusChange ? 'Published' : 'Draft'}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmStatusChange(null)}>Cancel</Button>
          <Button
            onClick={confirmStatusAction}
            color="primary"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmEdit !== null}
        onClose={() => setConfirmEdit(null)}
      >
        <DialogTitle>Confirm Edit</DialogTitle>
        <DialogContent>
          <Typography>
            You have unsaved changes. Do you want to proceed and lose these changes?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmEdit(null)}>Cancel</Button>
          <Button
            onClick={confirmEditAction}
            color="primary"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        maxWidth="md"
        fullWidth
        className={styles.viewModal}
      >
        <DialogTitle className={styles.viewModalTitle}>
          {watch('title') || 'Blog Preview'}
          <IconButton onClick={() => setViewOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {tempImage ? (
            <img
              src={tempImage}
              alt="Featured"
              className={styles.viewModalImage}
            />
          ) : (
            <Typography variant="caption" color="textSecondary">
              No image available
            </Typography>
          )}
          <Typography variant="h6" gutterBottom>
            {watch('title')}
          </Typography>
          <ReactQuill
            value={watch('content')}
            readOnly
            theme="bubble"
            className={styles.viewModalContent}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}