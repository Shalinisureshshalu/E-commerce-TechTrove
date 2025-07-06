import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import  background   from '../image/cart.png';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Typography,
  useTheme,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocationCityIcon from '@mui/icons-material/LocationCity';

export default function Profile() {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (snap.exists()) {
          const data = snap.data();
          setProfileData({
            ...data,
            createdAt: data.createdAt.toDate(),
          });
        }
      } else {
        setUser(null);
        setProfileData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h6">
          You’re not signed in. Please <a href="/signin">Sign In</a>.
        </Typography>
      </Container>
    );
  }

  const photo = user.photoURL || profileData?.photoURL;
  const joined = profileData?.createdAt ? profileData.createdAt.toLocaleDateString() : '';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${background})`,
         backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        py:6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={10} alignItems="flex-start">
          {/* Left Floating Box */}
          <Grid item xs={12} md={3}>
            <Box sx={{ 
              backgroundColor: 'rgba(164, 10, 79, 0.4)', 
              backdropFilter: 'blur(14px)',
               p: 3,
              borderRadius: 4, 
              textAlign: 'center', 
              width: '100%', 
              aspectRatio: '1 / 1', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 2
             }}>
              <Box
                component="img"
                src={photo}
                alt="profile"
                sx={{
                  width: 180,
                  height: 160,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {user.FirstName || profileData?.FirstName || 'User'}
                </Typography>
              <Rating name="profile-rating" value={4.5} precision={0.5} readOnly sx={{ mt: 1 }} />
            </Box>
          </Grid>

          {/* Main Profile Details + Options */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={4}>
              {/* Contact Info */}
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                 backgroundColor: 'rgba(164, 10, 79, 0.4)', 
                 backdropFilter: 'blur(25px)',
                  p: 3, 
                  borderRadius: 4 
                  }}
                  >
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <center>
                    <Typography variant="h5">Contact Information</Typography>
                   </center>
                  </Box>
                  <List>
                    <ListItem>
                      <ListItemIcon><EmailIcon sx={{ color: '#fff' }} /></ListItemIcon>
                      <ListItemText primary="Email" secondary={user.email} 
                      primaryTypographyProps={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}
                      secondaryTypographyProps={{ color: '#fff' }}
                      />

                    </ListItem>
                    <ListItem>
                      <ListItemIcon><PhoneIcon sx={{ color: '#fff' }} /></ListItemIcon>
                      <ListItemText primary="Phone" secondary={profileData?.phoneNumber || 'N/A'} 
                      primaryTypographyProps={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}
                       secondaryTypographyProps={{ color: '#fff' }}
                       />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon><HomeIcon sx={{ color: '#fff' }} /></ListItemIcon>
                      <ListItemText primary="Address" secondary={profileData?.address || 'N/A'} 
                      primaryTypographyProps={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}
                       secondaryTypographyProps={{ color: '#fff' }}
                       />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon><LocationCityIcon sx={{ color: '#fff' }} /></ListItemIcon>
                      <ListItemText primary="City" secondary={profileData?.city || 'N/A'} 
                      primaryTypographyProps={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}
                       secondaryTypographyProps={{ color: '#fff' }}
                       />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon><CalendarTodayIcon sx={{ color: '#fff' }} /></ListItemIcon>
                      <ListItemText primary="Member Since" secondary={joined}
                      primaryTypographyProps={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}
                       secondaryTypographyProps={{ color: '#fff' }}
                        />
                    </ListItem>

                  </List>
                </Box>
              </Grid>

              {/* Actions Section */}
              <Grid item xs={12} md={6}>
                <Box mb={4} sx={{ 
                 backgroundColor: 'rgba(164, 10, 79, 0.4)',
                  backdropFilter: 'blur(25px)', 
                  p: 3, 
                  borderRadius: 4, 
                  }}>
                  <Box 
                  display="flex" alignItems="center" gap={1} mb={2}>
                    <ShoppingBagIcon />
                    <Typography variant="h6">Your Orders</Typography>
                  </Box>
                  <Typography variant="body2">Track and view your previous orders here !!</Typography>
                </Box>

                <Box mb={4} sx={{ 
                  backgroundColor: 'rgba(164, 10, 79, 0.4)',
                  backdropFilter: 'blur(25px)', 
                  p: 3, 
                  borderRadius: 4 
                  }}>

                  <Box 
                  display="flex" alignItems="center" gap={1} mb={2}>
                    <PaymentIcon />
                    <Typography variant="h6">Payments</Typography>
                  </Box>

                  <Typography variant="body2">UPI/ Debit/ Cash on delivery</Typography>
                </Box>
                <Box sx={{ 
                  backgroundColor: 'rgba(202, 11, 78, 0.4)',
                  backdropFilter: 'blur(25px)', 
                  p: 3, 
                  borderRadius: 4
                   }}
                   >
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <SettingsIcon />
                    <Typography variant="h6">Settings</Typography>
                  </Box>
                  <Typography variant="body2"> your Account preferences, password change and more.</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
