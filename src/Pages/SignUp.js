// ===== src/pages/SignUp.jsx =====
import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  InputAdornment,
  IconButton,
  Link,
  TextField,
  Typography,
  MenuItem,
  useTheme,
  CircularProgress
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import ImageIcon from '@mui/icons-material/Image';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import bg from '../image/vr1.jpg';

export default function SignUp() {
  const theme = useTheme();
  const navigate = useNavigate();

  // Form states
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [preview, setPreview] = useState('');
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);

  // Loading & error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClickShowPassword = () => setShowPassword(prev => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  useEffect(() => {
    setPreview(photoURL);
  }, [photoURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Start loading immediately
    setLoading(true);

    // Validation
    if (!FirstName || !LastName || !email || !password || !phone || !address) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with displayName and photoURL
      await updateProfile(user, { displayName: FirstName, photoURL });

      // Save user in Firestore including selected role
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        FirstName,
        LastName,
        email: user.email,
        phoneNumber: phone,
        address,
        photoURL,
        city,
        role,               // <-- selected role saved here
        createdAt: serverTimestamp()
      });

      // Redirect after successful signup
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
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'flex-start',
        pt: 4,
        justifyContent: 'flex-end',
        pr: { xs: 2, sm: 8, md: 4 },
      }}
    >
      <Card
        elevation={8}
        sx={{
          maxWidth: 480,
          width: '100%',
          borderRadius: 3,
          backgroundColor: '#fff',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '3px solid rgba(0, 201, 167, 0.7)',
        }}
      >
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Avatar
              sx={{
                background: 'linear-gradient(90deg, #0F1C57, #00C9A7)',
                width: 56,
                height: 56,
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>

            <Typography variant="h5">Sign Up</Typography>

            {error && (
              <Typography variant="body2" color="error" textAlign="center">
                {error}
              </Typography>
            )}

            {/* First Name & Last Name */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                required
                label="First Name"
                value={FirstName}
                onChange={e => setFirstName(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
                sx={{ width: '50%' }}
              />
              <TextField
                required
                label="Last Name"
                value={LastName}
                onChange={e => setLastName(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
                sx={{ width: '50%' }}
              />
            </Box>

            {/* Email & Password */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                required
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
              />
              <TextField
                required
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            {/* Phone & City */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                required
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment> }}
                sx={{ width: '50%' }}
              />
              <TextField
                label="City"
                value={city}
                onChange={e => setCity(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><LocationCityIcon /></InputAdornment> }}
                sx={{ width: '50%' }}
              />
            </Box>

            {/* Address */}
            <TextField
              required
              fullWidth
              multiline
              rows={2}
              label="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment> }}
            />

            {/* Profile Photo */}
            <TextField
              fullWidth
              label="Profile Photo URL (optional)"
              value={photoURL}
              onChange={e => setPhotoURL(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><ImageIcon /></InputAdornment>,
                endAdornment: preview && (
                  <InputAdornment position="end">
                    <Avatar src={preview} sx={{ width: 50, height: 50 }} />
                  </InputAdornment>
                )
              }}
            />

            {/* Role Selection */}
            <TextField
              select
              fullWidth
              margin="normal"
              label="Select Role"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
            </TextField>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #0F1C57, #00C9A7)',
                color: '#fff',
                '&:hover': { opacity: 0.9 }
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ color: '#fff', mr: 1 }} />
                  Creating account…
                </>
              ) : 'Sign Up'}
            </Button>

            <Typography variant="body2" textAlign="center">
              Already have an account?{' '}
              <Link component={RouterLink} to="/signin">Sign in</Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
