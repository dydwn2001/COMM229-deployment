import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from '../controllers/cart.controller.js';

const router = express.Router();

// GET cart for a user
router.get('/:userId', getCart);

// POST add item
router.post('/', addToCart);

// PUT update item quantity
router.put('/:userId/:productId', updateCartItem);

// DELETE item
router.delete('/:userId/:productId', removeCartItem);

// DELETE clear entire cart
router.delete('/clear/:userId', clearCart);

export default router;
