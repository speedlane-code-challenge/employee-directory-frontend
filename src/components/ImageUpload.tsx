import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadData } from 'aws-amplify/storage';
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  IconButton,
  Alert,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface ImageUploadProps {
  value?: string;
  onChange: (imageUrl: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0 || disabled) return;

      const file = acceptedFiles[0];
      setUploading(true);
      setUploadError(null);

      try {
        // Generate unique filename
        const fileExtension = file.name.split('.').pop();
        const fileName = `employee-images/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

        // Upload to S3
        const result = await uploadData({
          key: fileName,
          data: file,
          options: {
            contentType: file.type,
          },
        }).result;

        // Save only the path, not the full URL
        const imagePath = `/public/${result.key}`;
        onChange(imagePath);
      } catch (error) {
        console.error('Upload failed:', error);
        setUploadError('Failed to upload image. Please try again.');
      } finally {
        setUploading(false);
      }
    },
    [onChange, disabled]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: disabled || uploading,
  });

  const handleRemoveImage = () => {
    onChange('');
    setUploadError(null);
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Profile Image
      </Typography>
      {value ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Avatar
            src={`${import.meta.env.VITE_WEB_APP_URL}${value}`}
            sx={{ width: 60, height: 60 }}
            alt="Employee"
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="success.main">
              Image uploaded successfully
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {`${import.meta.env.VITE_WEB_APP_URL}${value}`}
            </Typography>
          </Box>
          {!disabled && (
            <IconButton
              size="small"
              onClick={handleRemoveImage}
              color="error"
              disabled={uploading}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ) : (
        <Box
          {...getRootProps()}
          onBlur={onBlur}
          sx={{
            border: `2px dashed ${
              error ? 'error.main' : isDragActive ? 'primary.main' : 'grey.300'
            }`,
            borderRadius: 1,
            p: 3,
            textAlign: 'center',
            cursor: disabled || uploading ? 'not-allowed' : 'pointer',
            backgroundColor: isDragActive ? 'action.hover' : 'transparent',
            '&:hover': {
              backgroundColor: disabled || uploading ? 'transparent' : 'action.hover',
            },
          }}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={40} />
              <Typography variant="body2">Uploading...</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
              <Typography variant="body2">
                {isDragActive
                  ? 'Drop the image here...'
                  : 'Drag and drop an image here, or click to select'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supports: JPEG, PNG, GIF, WebP (Max 5MB)
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {uploadError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {uploadError}
        </Alert>
      )}

      {helperText && (
        <Typography
          variant="caption"
          color={error ? 'error' : 'text.secondary'}
          sx={{ mt: 0.5, display: 'block' }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};
