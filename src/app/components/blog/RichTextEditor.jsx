'use client';
import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import debounce from 'lodash/debounce';

/**
 * Reusable rich text editor component using React Quill New.
 * @param {Object} props - Component props
 * @param {boolean} props.disabled - Disable editor
 * @param {boolean} props.error - Error state
 * @param {string} props.helperText - Error message
 * @param {Object} props.control - react-hook-form control
 * @param {string} props.name - Field name
 * @returns {JSX.Element} Rich text editor component
 */
const RichTextEditor = forwardRef(({ disabled, error, helperText, control, name }, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Debounce onChange to optimize performance
  const debouncedOnChange = debounce((value, onChangeFn) => {
    onChangeFn(value === '<p><br></p>' ? '' : value); // Handle Quill's empty state
  }, 300);

  return (
    <Box className="blog-admin-editor border rounded-lg overflow-hidden border-gray-300">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactQuill
            value={field.value || ''}
            onChange={(value) => debouncedOnChange(value, field.onChange)}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image', 'code-block'],
                ['clean'],
              ],
            }}
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'indent', // Replaced 'bullet' with 'list'
              'link', 'image', 'code-block',
            ]}
            readOnly={disabled}
            theme="snow"
            ref={ref}
            className={`bg-white ${disabled ? 'bg-gray-100' : ''}`}
            style={{ height: isMobile ? '200px' : '250px' }}
          />
        )}
      />
      {error && (
        <Typography color="error" variant="caption" className="pl-4 pb-2 pt-2">
          {helperText}
        </Typography>
      )}
    </Box>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;