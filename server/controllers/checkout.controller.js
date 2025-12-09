import dotenv from 'dotenv';
dotenv.config(); // debe cargarse primero

import Stripe from 'stripe';
import Cart from '../models/cart.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      console.log('Cart vacío');
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const lineItems = cart.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.productId.name },
        unit_amount: Math.round(item.productId.price * 100),
      },
      quantity: item.quantity,
    }));

    console.log('Line items enviados a Stripe:', lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://comm229-deployment.onrender.com/success',
      cancel_url: 'https://comm229-deployment.onrender.com/cart',
    });

    console.log('Stripe session creada:', session.url);

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message });
  }
};
