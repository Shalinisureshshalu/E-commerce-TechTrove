// ===== src/pages/EditProfile.jsx =====
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, Container, Box, Typography, Grid, Avatar, CircularProgress, Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import InputAdornment from '@mui/material/InputAdornment';
import ImageIcon from '@mui/icons-material/Image';
import { updateProfile } from "firebase/auth";

import bg from '../image/robo2.jpg'

export default function EditProfile() {
  const [form, setForm] = useState({
    FirstName: '',
    LastName:'',
    address: '',
    email:'',
    phoneNumber: '',
    photoURL:'',
    city: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setForm({
            FirstName: data.FirstName || '',
            LastName: data.LastName || '',
            address: data.address || '',
            email: data.email || user.email ||'',
            phoneNumber: data.phoneNumber || '',
            photoURL: data.photoURL || user.photoURL||'',
            city: data.city || '',
          });
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleChange = field => e => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.FirstName.trim() || !form.email.trim()) {
      setError('Please enter a valid name and email.');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
    if (user) {
      await updateProfile(user, {
        displayName: form.FirstName,
        photoURL: form.photoURL,
      });
      await setDoc(doc(db, 'users', user.uid), form, { merge: true });
       navigate('/profile');
    }
  } catch (err) {
    console.error(err);
    setError('Failed to update profile.');
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return <Box textAlign="center" mt={4}><CircularProgress /></Box>;
  }

  return (
     <Box
      sx={{
      minHeight: '100vh',
      backgroundImage:  `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'right',
      backgroundRepeat: 'no-repeat',
      blurbackgroundImage: '20px',
      display: 'flex',
       alignItems: 'flex-start', 
       pt:4,
      justifyContent: 'flex-end',
       pr: { xs: 2, sm: 8, md: 4 },
      }}
    >

      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          p: 4,
          mt: 1,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter:   'blur(10px)',   
          boxShadow:3,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Avatar sx={{ bgcolor: '#0F1C57', mx: 'auto', mb: 1 }}>
            <EditIcon />
          </Avatar>
          <Typography variant="h5">Edit Profile</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Name"
                value={form.FirstName}
                onChange={handleChange('FirstName')}
              />
            </Grid>
             <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={form.LastName}
                onChange={handleChange('LastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={form.address}
                onChange={handleChange('address')}
              />
            </Grid>
             <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={form.email}
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                value={form.phoneNumber}
                onChange={handleChange('phoneNumber')}
              />
            </Grid>
             <Grid item xs={12}>
            <TextField
            label="Photo URL"
            fullWidth
            value={form.photoURL}
            onChange={handleChange('photoURL')}
            InputProps={{
            startAdornment: (
            <InputAdornment position="start">
             <ImageIcon />
             </InputAdornment>
      ),
      endAdornment: form.photoURL ? (
        <InputAdornment position="end">
          <Avatar src={form.photoURL} sx={{ width: 50, height: 50 }} />
        </InputAdornment>
      ) : null
    }}
  />
  </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                value={form.city}
                onChange={handleChange('city')}
              />
              </Grid>

              {/*cancle button and save changes*/}
              
              <Grid container spacing={30} sx={{ mt: 3, justifyContent: 'space-between' }}>
           <Grid item>
    <Button
      onClick={() => navigate('/profile')}
      variant="outlined"
      color="secondary"
      sx={{
           background: '#1976d2', // default Material UI blue
           color: '#fff', 
          '&:hover': {
           backgroundColor: '#115293'
            }
          }}>
           <Typography sx={{ fontWeight: 'bold' }}>Cancel</Typography>
          </Button>
  </Grid>
  <Grid item>
    <Button
      type="submit"
      variant="contained"
      sx={{ background: '#0F1C57', color: '#fff' }}
    >
      Save Changes
    </Button>
  </Grid>
   </Grid>
  </Grid>
  </form>
   </Box>
   
</Box>

  );
}
