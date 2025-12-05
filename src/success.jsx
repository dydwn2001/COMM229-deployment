import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" color="green" mb={3}>
        ✅ Payment Successful!
      </Typography>
      <Typography variant="h6" mb={4}>
        Thank you for your purchase.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/products')}>
        Continue Shopping
      </Button>
    </Box>
  );
}
