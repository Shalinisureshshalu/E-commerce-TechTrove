// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import ProductDetails from './pages/ProductDetails';
import ProductForm from './pages/ProductForm';
import AdminDashboard from './pages/AdminDashboard';

import SellerProfile from './pages/SellerProfile';

// Seller-only route wrapper
function SellerRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/signin" />;
  if (currentUser.role !== 'seller') return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* Authenticated routes */}
            <Route
              path="/shop"
              element={
                <PrivateRoute>
                  <Shop />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrderHistory />
                </PrivateRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />

            {/* Seller-only routes */}
            <Route
              path="/admin"
              element={
                <SellerRoute>
                  <AdminDashboard />
                </SellerRoute>
              }
            />
            <Route
              path="/admin/product/:id"
              element={
                <SellerRoute>
                  <ProductForm />
                </SellerRoute>
              }
            />
             
             <Route
              path="/seller-profile"
              element={
                <SellerRoute>
                  <SellerProfile />
                </SellerRoute>
              }
            />
            
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
