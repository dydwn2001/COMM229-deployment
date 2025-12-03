import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, Typography, Button, Stack, Chip, Snackbar, Alert } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, ElectricBolt as ElectricBoltIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  // Mapeo de imágenes según nombre
  const imageMap = {
    sneakers: '/sneakers.png',
    notebook: '/notebook.png',
    globes: '/globes.png',
    mug: '/mug.png',
    backpack: '/backpack.png',
    keychain: '/keychain.png',
    socks: '/socks.png',
    cap: '/cap.png',
    tshirt: '/tshirt.png',
    hoodie: '/hoodie.png',
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setSnackbar({ open: true, message: 'Failed to fetch products', severity: 'error' });
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!currentUser) {
      setSnackbar({
        open: true,
        message: 'Please log in or register to add items to the cart.',
        severity: 'warning',
      });
      return;
    }

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id, productId, quantity: 1 }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to add item to cart');

      setSnackbar({ open: true, message: 'Item added to cart!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" mb={3}>Shop Products</Typography>

      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <img
                  src={imageMap[product.image] || '/placeholder.png'}
                  alt={product.name}
                  style={{ width: '100%', maxWidth: '150px', borderRadius: '8px' }}
                />
              </Box>
              <Typography variant="h6" fontWeight={600}>{product.name}</Typography>
              <Chip
                label={product.category}
                size="small"
                color="warning"
                icon={<ElectricBoltIcon fontSize="small" />}
                sx={{ width: 'fit-content', mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary" flexGrow={1}>{product.description}</Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                <Typography variant="h5" color="primary" fontWeight={700}>${product.price}</Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
