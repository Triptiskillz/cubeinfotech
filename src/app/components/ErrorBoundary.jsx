'use client';
import { Component } from 'react';
import { Box, Typography, Button } from '@mui/material';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <Typography variant="h5" className="text-red-600 mb-4">Something went wrong.</Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Reload
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}