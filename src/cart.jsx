import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Button, Stack, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const navigate = useNavigate();

  // Map product names to their public image files
  const imageMap = {
    'Thunderbolt Hoodie': '/hoodie.png',
    'Pika Pika T-Shirt': '/tshirt.png',
    'Electric Bolt Cap': '/cap.png',
    'Pikachu Socks': '/socks.png',
    'Lightning Keychain': '/keychain.png',
    'Pikachu Backpack': '/backpack.png',
    'Pika Mug': '/mug.png',
    'Electric Gloves': '/globes.png',
    'Pikachu Notebook': '/notebook.png',
    'Thunderbolt Sneakers': '/sneakers.png',
  };

  const fetchCart = async () => {
    try {
      const res = await fetch(`/api/cart/${currentUser._id}`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  // FIXED: Prevent continuous API calls
  useEffect(() => {
    if (currentUser) {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs ONLY once when component mounts

  const handleQuantityChange = async (productId, quantityChange) => {
    try {
      const item = cart.items.find(i => i.productId._id === productId);
      const newQuantity = item.quantity + quantityChange;

      if (newQuantity <= 0) {
        // Delete item if quantity reaches 0
        await fetch(`/api/cart/${currentUser._id}/${productId}`, {
          method: 'DELETE',
        });
      } else {
        // Update quantity
        await fetch(`/api/cart/${currentUser._id}/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQuantity }),
        });
      }

      // Refresh cart after change
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = () => navigate('/checkout');
  const handleEditCart = () => navigate('/products');

  if (!cart) return <Typography>Loading...</Typography>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" mb={3}>Your Cart</Typography>

      {cart.items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {cart.items.map(item => (
            <Card key={item.productId._id} sx={{ mb: 2, p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                {/* Product Image */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={imageMap[item.productId.name] || '/placeholder.png'}
                    alt={item.productId.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      marginRight: '12px',
                    }}
                  />
                  <Typography>{item.productId.name}</Typography>
                </Box>

                <Stack direction="row" alignItems="center">
                  <IconButton onClick={() => handleQuantityChange(item.productId._id, -1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography mx={1}>{item.quantity}</Typography>
                  <IconButton onClick={() => handleQuantityChange(item.productId._id, 1)}>
                    <AddIcon />
                  </IconButton>
                </Stack>

                <Typography>${(item.productId.price * item.quantity).toFixed(2)}</Typography>
              </Stack>
            </Card>
          ))}

          <Typography variant="h6" mt={2}>Total: ${total.toFixed(2)}</Typography>

          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="outlined" color="primary" onClick={handleEditCart}>
              Edit Cart
            </Button>
            <Button variant="contained" color="success" onClick={handleCheckout}>
              Checkout
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
}
