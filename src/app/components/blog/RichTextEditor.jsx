'use client';
import { forwardRef, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import debounce from 'lodash/debounce';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
import 'react-quill-new/dist/quill.snow.css';

const RichTextEditor = forwardRef(({ control, name, label, defaultValue = '' }, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    }),
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list', // Covers both bullet and ordered lists
    'link',
    'image',
  ];

  return (
    <Box className="blog-admin-editor">
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <ReactQuill
            theme="snow"
            value={value}
            onChange={debounce(onChange, 300)}
            modules={modules}
            formats={formats}
            style={{
              height: isMobile ? '300px' : '400px',
              marginBottom: isMobile ? '40px' : '60px',
            }}
          />
        )}
      />
    </Box>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;