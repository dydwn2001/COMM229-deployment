import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './src/about';
import Register from './src/register';
import Login from './src/login';
import EditProfile from './src/edit-profile';
import Profile from './src/profile';
import Products from './src/products';
import Cart from './src/cart';
import Checkout from './src/checkout';
import Success from './src/success';

const MainRouter = () => {
  return (
    <Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Navbar>
  );
};

export default MainRouter;
