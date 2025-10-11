// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // clearer than "initializing"

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              role: userData.role || "buyer", // ✅ include user role
              ...userData
            });
          } else {
            // No Firestore document found — fallback to basic auth info
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              role: "buyer"
            });
          }
        } catch (err) {
          console.error("Error fetching user document:", err);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40vh', fontSize: '18px' }}>
        Loading user data...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
