// ===== src/pages/SignIn.jsx =====
import React, { useState }                    from 'react';
import { useNavigate, Link as RouterLink }    from 'react-router-dom';
import { auth }                               from '../firebase/config';
import { signInWithEmailAndPassword }         from 'firebase/auth';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import EmailIcon        from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function SignIn() {
  const theme    = useTheme();
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
    {/* Background Video */}
    <video
      autoPlay
      loop
      muted
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <source src="/headph.mp4" type="video/mp4" />
    </video>
    
    <Box
      sx={{
        minHeight: '40vh',
        backgroundSize: 'auto',
        backgroundPosition: 'right',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        p: 4,
      }}
     >
       
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p:4,

      }}
    >
       
      <Card
        elevation={4}
        sx={{
          maxWidth: 400,
          width: '100%',
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.40)',
          backdropFilter: 'blur(25px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', 
        }}
      >
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Avatar sx={{ background: 'linear-gradient(90deg, #0F1C57, #00C9A7)', width: 56, height: 56 }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5">Sign In</Typography>
            <Typography variant="h6" color="       " textAlign="center">
              "Unlock the future of gadgets — one click away."
            </Typography>

            {error && (
              <Typography variant="body2" color="error" textAlign="center">
                {error}
              </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit}
             sx={{ 
              width: '100%' }}>
                
              <Stack spacing={2}>
                <TextField
                  required fullWidth
                  label="Email Address"
                  type="email"
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                   InputLabelProps={{
                   sx: {
                    color: 'black',
                     // or match it with card background
                    }
                  }}
                  

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" backgroundColor="white">
                         <EmailIcon /> 
                      </InputAdornment>
                    ),
                    sx: {
                       color: 'white', 
                  }
                  }}
                  
                />

                <TextField
                  required fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    )
                  }}
                  sx={{ borderRadius: 2 }}
                />

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
                  Sign In
                </Button>
                

                <Typography variant="body2" textAlign="center">
                  Don’t have an account?{' '}
                  <Link component={RouterLink} to="/signup" underline="hover">
                    Sign Up
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
    </Box>
    </Box>  
    );
}