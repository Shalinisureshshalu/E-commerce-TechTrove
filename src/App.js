// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute   from './components/PrivateRoute';
import Navbar       from './components/Navbar';
import SignIn     from './pages/SignIn';
import SignUp     from './pages/SignUp';
import Profile    from './pages/Profile';
import Home       from './pages/Home';
import ProductForm from './pages/ProductForm';
import AdminDashboard from './pages/AdminDashboard';
import EditProfile from './pages/EditProfile';
import Cart       from './pages/Cart';
import Checkout   from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import ProductDetails from './pages/ProductDetails'; // Importing ProductDetails page
import { CartProvider } from "./contexts/CartContext";
import Shop from "./pages/Shop";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <CartProvider>
      <Navbar />
        <Routes>
          {/* public */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          
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
          <Route path="/admin" element={
            <PrivateRoute>
           <AdminDashboard />
          </PrivateRoute>
         }/>
           <Route path="/admin/product/:id" element={
         <PrivateRoute>
         <ProductForm />
        </PrivateRoute>
        }/>
        </Routes>
        
      
       
        <Routes>
             <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<OrderHistory/>} />
            <Route path="/edit-profile" element={<EditProfile />} />
       </Routes>
    </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;