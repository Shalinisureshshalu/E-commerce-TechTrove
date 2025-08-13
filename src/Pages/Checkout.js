import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Card, CardContent, Stack,
  TextField, Typography, InputAdornment
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PinDropIcon from '@mui/icons-material/PinDrop';

import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import bg from '../image/cart.png';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '',
    address: '', city: '', pincode: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, address, city, pincode } = formData;

    if (!firstName || !lastName || !phone || !address || !city || !pincode) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await addDoc(collection(db, 'orders'), {
        userId: currentUser.uid,
        items: cartItems,
        shipping: { ...formData },
        total: totalCost,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      clearCart();
      navigate('/orders');
    } catch (err) {
      console.error(err);
      setError('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
    sx={{
      minHeight: '100vh',
       backgroundImage:  `url(${bg})`,
        backgroundSize: 'cover',
       backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
       display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      paddingTop: 7,
    }}>

      <Card sx={{ maxWidth: 600, width: '100%', p: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Checkout
          </Typography>

          {error && <Typography color="error" align="center" sx={{ mb: 2 }}>{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="First Name" name="firstName" fullWidth required
                  value={formData.firstName} onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
                />
                <TextField
                  label="Last Name" name="lastName" fullWidth required
                  value={formData.lastName} onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
                />
              </Box>

              <TextField
                label="Phone Number" name="phone" fullWidth required
                value={formData.phone} onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment> }}
              />

              <TextField
                label="Address" name="address" fullWidth required multiline rows={2}
                value={formData.address} onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment> }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="City" name="city" fullWidth required
                  value={formData.city} onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><LocationCityIcon /></InputAdornment> }}
                />
                <TextField
                  label="Pincode" name="pincode" fullWidth required
                  value={formData.pincode} onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><PinDropIcon /></InputAdornment> }}
                />
              </Box>

              <Typography variant="h6" align="right" sx={{ mt: 1 }}>
                Grand Total: ₹{totalCost.toFixed(2)}
              </Typography>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  background: 'linear-gradient(90deg, #0F1C57, #00C9A7)',
                  py: 1.5, fontWeight: 'bold', borderRadius: 2,
                  '&:hover': { opacity: 0.9 }
                }}
              >
                {loading ? 'Placing Order…' : 'Place Order'}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}