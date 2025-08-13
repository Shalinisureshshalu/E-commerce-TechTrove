import React, { createContext, useContext, useEffect, useState,useRef } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase/config';
import {
  doc,
  setDoc,
  onSnapshot
} from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
   const hasLoaded = useRef(false);
  // Load / subscribe to Firestore cart when user logs in
  useEffect(() => {
    if (!currentUser) {
      setCartItems([]);
      return;
    }
    const cartRef = doc(db, 'carts', currentUser.uid);
    const unsub = onSnapshot(cartRef, (snap) => {
      if (snap.exists()) {
        setCartItems(snap.data().items);
      } else {
        setCartItems([]);
      }
       hasLoaded.current = true;
    });
    return () => unsub();
  }, [currentUser]);

  // Sync local cartItems to Firestore
  useEffect(() => {
    if (!currentUser) return;
    const cartRef = doc(db, 'carts', currentUser.uid);
    setDoc(cartRef, { items: cartItems }, { merge: true })
      .catch(console.error);
  }, [cartItems, currentUser]);
  
  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      
      return [
        ...prev,
         { 
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || '',
        quantity: qty
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}