// ===== src/pages/SignUp.jsx =====
import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import {
  doc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import PersonIcon       from '@mui/icons-material/Person';
import EmailIcon        from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneIcon        from '@mui/icons-material/Phone';
import HomeIcon         from '@mui/icons-material/Home';
import ImageIcon        from '@mui/icons-material/Image';
import LocationCityIcon from '@mui/icons-material/LocationCity';

export default function SignUp() {
  const theme   = useTheme();
  const navigate = useNavigate();

  const [FirstName, setFirstName] = useState('');
  const [LastName,    setLastName]    = useState('');
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [phone,       setPhone]       = useState('');
  const [address,     setAddress]     = useState('');
  const [city,         setCity]       = useState('');
  const [photoURL,    setPhotoURL]    = useState('');
  const [preview,     setPreview]     = useState('');
  const [error,       setError]       = useState('');
  const [loading,     setLoading]     = useState(false);

  useEffect(() => {
    setPreview(photoURL);
  }, [photoURL]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    if (!FirstName.trim() || !LastName.trim() || !phone.trim() || !address.trim()) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { FirstName, photoURL });
      await setDoc(doc(db, 'users', user.uid), {
        uid:         user.uid,
        FirstName,
        LastName,
        email:       user.email,
        phoneNumber: phone,
        address,
        photoURL,
        createdAt:   serverTimestamp()
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary[50]} 0%, ${theme.palette.secondary[100]} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Card
        elevation={8}
        sx={{
          maxWidth: 400,
          width: '100%',
          borderRadius: 3
        }}
      >
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Avatar sx={{ background: 'linear-gradient(90deg, #0F1C57, #00C9A7)', width: 56, height: 56 }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5">Sign Up</Typography>

            {error && (
              <Typography variant="body2" color="error" textAlign="center">
                {error}
              </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <TextField
                  required fullWidth
                  label="First Name"
                  value={FirstName} onChange={e => setFirstName(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>
                  }}
                  sx={{ borderRadius: 2 }}
                />
                 <TextField
                  required fullWidth
                  label="Last Name"
                  value={LastName} onChange={e => setLastName(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>
                  }}
                  sx={{ borderRadius: 2 }}
                />

                <TextField
                  required fullWidth
                  label="Email Address"
                  type="email"
                  value={email} onChange={e => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>
                  }}
                  sx={{ borderRadius: 2 }}
                />

                <TextField
                  required fullWidth
                  label="Password"
                  type="password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>
                  }}
                  sx={{ borderRadius: 2 }}
                />

                <TextField
                  required fullWidth
                  label="Phone Number"
                  type="tel"
                  value={phone} onChange={e => setPhone(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>
                  }}
                  sx={{ borderRadius: 2 }}
                />

                <TextField
                  required fullWidth multiline rows={2}
                  label="Address"
                  value={address} onChange={e => setAddress(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment>
                  }}
                  sx={{ borderRadius: 2 }}
                />
                 <TextField
                     required  fullWidth
                    label="City"
                    value={city} onChange={e => setCity(e.target.value)}
                    InputProps={{
                    startAdornment: <InputAdornment position="start"><LocationCityIcon /></InputAdornment>
                    }}
                     sx={{ borderRadius: 2 }}
                    />
                  <TextField
                  fullWidth
                  label="Profile Photo URL (optional)"
                  value={photoURL} onChange={e => setPhotoURL(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><ImageIcon /></InputAdornment>,
                    endAdornment: preview
                      ? (
                        <InputAdornment position="end">
                          <Avatar src={preview} sx={{ width: 32, height: 32 }} />
                        </InputAdornment>
                      )
                      : null
                  }}
                  sx={{ borderRadius: 2 }}
                />

                <Button
                  type="submit" fullWidth size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #0F1C57, #00C9A7)',
                    color: '#fff',
                    '&:hover': {
                      opacity: 0.9
                    }
                  }}
                >
                  {loading ? 'Creating account…' : 'Sign Up'}
                </Button>

                <Typography variant="body2" textAlign="center">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/signin">
                    Sign in
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}