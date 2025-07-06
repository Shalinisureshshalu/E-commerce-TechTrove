import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {Stack} from '@mui/material';
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
          backgroundImage: 'url(/background/profile-bg.jpg)',
         backgroundSize: '',
          backgroundPosition: 'center',
          py:6,
        }}
      >
         <Container maxWidth="lg">
        <Grid container spacing={10} alignItems="flex-start">
          {/* Left Floating Box */}
          <Grid item xs={12} md={3}>
            <Box sx={{ 
                backgroundColor: 'rgba(0,0,0,0.6)',
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
                  width: 140,
                  height: 140,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 2,
                }}
              />
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {user.FirstName || profileData?.FirstName || 'User'}
                </Typography>
                <Rating name="profile-rating" value={4.5} precision={0.5} readOnly sx={{ mt: 1 }} />
                </Box>
                 <Button
                    type="submit" fullWidth size="large"
                    sx={{
                     py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #0F1C57, #00C9A7)',
                    color: '#fff',
                    '&:hover': { opacity: 0.9 }
                     }}
                     >
                      Sign Out
                 </Button> 
            </Grid>
            <Box sx={{ flex: 1 }}>
  {/* Contact Info */}
  <Box
    sx={{
      backgroundColor: 'rgba(160, 17, 105, 0.6)',
      p: 3,
      borderRadius: 4,
      mb: 4,
    }}
  >
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h5">Contact Information</Typography>
      <IconButton color="primary" href="/edit-profile">
        <EditIcon />
      </IconButton>
    </Box>

    <List>
      <ListItem>
        <ListItemIcon><EmailIcon sx={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Email" secondary={user.email} />
      </ListItem>
      <ListItem>
        <ListItemIcon><PhoneIcon sx={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Phone" secondary={profileData?.phoneNumber || 'N/A'} />
      </ListItem>
      <ListItem>
        <ListItemIcon><HomeIcon sx={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Address" secondary={profileData?.address || 'N/A'} />
      </ListItem>
      <ListItem>
        <ListItemIcon><LocationCityIcon sx={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="City" secondary={profileData?.city || 'N/A'} />
      </ListItem>
      <ListItem>
        <ListItemIcon><CalendarTodayIcon sx={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Member Since" secondary={joined} />
      </ListItem>
    </List>
  </Box>

  {/* Actions Section */}
   <Grid item xs={12} md={6}>
    <Box mb={4} sx={{ 
      backgroundColor: 'rgba(160, 17, 105, 0.6)', 
      p: 3, 
      borderRadius: 4 
      }}>

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <ShoppingBagIcon />
        <Typography variant="h6">Your Orders</Typography>
      </Box>
      <Typography variant="body2">Track and view your previous orders here !!</Typography>
    </Box>

    <Box mb={4} sx={{ 
      backgroundColor: 'rgba(160, 17, 105, 0.6)', 
      p: 3, 
      borderRadius: 4
       }}>

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <PaymentIcon />
        <Typography variant="h6">Payments</Typography>
      </Box>
      <Typography variant="body2">UPI / Debit / Cash on delivery</Typography>
    </Box>

    <Box sx={{ 
      backgroundColor: 'rgba(160, 17, 105, 0.6)', 
      p: 3, 
      borderRadius: 4 
      }}>

      <Box display="flex" alignItems="center" gap={1} mb={1}>

        <SettingsIcon />
        <Typography variant="h6">Settings</Typography>
      </Box>
      <Typography variant="body2">Your account preferences, password change, and more.</Typography>
      </Box>
     </Grid>
     </Box>
      </Grid>
     </Container>
    </Box>
  );


}                