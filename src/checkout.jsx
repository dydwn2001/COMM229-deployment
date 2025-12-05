import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUser) return;

      try {
        const res = await fetch(`/api/cart/${currentUser._id}`);
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };

    fetchCart();
  }, [currentUser]);

  const handleEditCart = () => navigate('/products');

  const handleCheckout = async () => {
    if (!currentUser) return alert('Please log in first');

    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id }),
      });

      const data = await res.json();
      console.log('Stripe session response:', data);

      if (data.url) {
        // Redirige al checkout de Stripe (modo prueba)
        window.location.href = data.url;
      } else {
        alert('Stripe session no creada. Revisa los logs del backend.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  return (
    <Box sx={{ py: 4, px: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" mb={3} textAlign="center">
        Checkout
      </Typography>

      {cartItems.length === 0 ? (
        <Typography textAlign="center">Your cart is empty.</Typography>
      ) : (
        <>
          {cartItems.map(item => (
            <Box key={item.productId._id} mb={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>{item.productId.name} x {item.quantity}</Typography>
                <Typography>${(item.productId.price * item.quantity).toFixed(2)}</Typography>
              </Stack>
              <Divider sx={{ mt: 1 }} />
            </Box>
          ))}

          <Stack direction="row" justifyContent="space-between" mt={3}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
          </Stack>

          <Stack direction="row" spacing={2} mt={4} justifyContent="center">
            <Button variant="outlined" onClick={handleEditCart}>
              Edit Cart
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay with Stripe (Testing)'}
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
}
