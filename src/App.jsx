import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';

import Category from './pages/Category';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';

import AuthModal from './components/auth/AuthModal';
import CartSidebar from './components/cart/CartSidebar';

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AnimatePresence>
      <CartSidebar />
      <AuthModal />
    </Layout>
  );
}

export default App;
