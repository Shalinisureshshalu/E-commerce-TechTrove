// ===== src/components/Navbar.js =====
import React, { useState } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import logo from '../image/chat.png';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import Chatbot from './Chatbot';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [anchorNav, setAnchorNav] = useState(null);
  const [anchorUser, setAnchorUser] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleNavOpen = (e) => setAnchorNav(e.currentTarget);
  const handleNavClose = () => setAnchorNav(null);
  const handleUserOpen = (e) => setAnchorUser(e.currentTarget);
  const handleUserClose = () => setAnchorUser(null);
  const toggleChatbot = () => setShowChatbot((prev) => !prev);

  const location = useLocation();

  const handleLogout = async () => {
    handleUserClose();
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          background: 'linear-gradient(90deg, #0F1C57, #00C9A7)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: '#fff',
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Tech Trove Logo"
                sx={{ height: 50, width: 'auto', mr: 1 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                Tech Trove
              </Typography>
            </Box>

            {/* Desktop Menu */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 4 }}>
                <Button component={RouterLink} to="/shop" sx={{ color: '#fff', mx: 1 }}>
                  Shop
                </Button>

                <IconButton component={RouterLink} to="/cart" sx={{ color: '#fff', mx: 1 }}>
                  <ShoppingCartIcon />
                </IconButton>

                <Button
                  onClick={toggleChatbot}
                  startIcon={<ChatIcon />}
                  sx={{
                    color: '#fff',
                    mx: 1,
                    textTransform: 'none',
                  }}
                >
                  Chatbot
                </Button>
              </Box>
            )}

            {/* Auth / Avatar */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {currentUser ? (
                <IconButton onClick={handleUserOpen} sx={{ p: 0, ml: 2 }}>
                  <Avatar
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    sx={{ width: 45, height: 45 }}
                  />
                </IconButton>
              ) : !isMobile ? (
                <>
                  <Button
                    component={RouterLink}
                    to="/signin"
                    variant="outlined"
                    sx={{
                      backgroundColor:
                        location.pathname === '/signin' ? '#fff' : 'transparent',
                      color: location.pathname === '/signin' ? '#0F1C57' : '#fff',
                      border: '1px solid #fff',
                      mr: 1,
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/signup"
                    variant="outlined"
                    sx={{
                      backgroundColor:
                        location.pathname === '/signup' ? '#fff' : 'transparent',
                      color: location.pathname === '/signup' ? '#0F1C57' : '#fff',
                      border: '1px solid #fff',
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : null}

              {/* Mobile menu button */}
              {isMobile && (
                <IconButton onClick={handleNavOpen} sx={{ color: '#fff', ml: 1 }}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>

            {/* Mobile Drawer */}
            <Menu anchorEl={anchorNav} open={Boolean(anchorNav)} onClose={handleNavClose}>
              <MenuItem component={RouterLink} to="/shop" onClick={handleNavClose}>
                Shop
              </MenuItem>
              <MenuItem component={RouterLink} to="/cart" onClick={handleNavClose}>
                Cart
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleNavClose();
                  toggleChatbot();
                }}
              >
                Chatbot
              </MenuItem>
              {currentUser ? (
                <>
                  <MenuItem
                    onClick={() => {
                      handleNavClose();
                      navigate('/profile');
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleNavClose();
                      handleLogout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    component={RouterLink}
                    to="/signin"
                    onClick={handleNavClose}
                  >
                    Sign In
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/signup"
                    onClick={handleNavClose}
                  >
                    Sign Up
                  </MenuItem>
                </>
              )}
            </Menu>

            {/* Avatar Menu */}
            <Menu anchorEl={anchorUser} open={Boolean(anchorUser)} onClose={handleUserClose}>
              <MenuItem
                onClick={() => {
                  handleUserClose();
                  navigate('/profile');
                }}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Chatbot Popup */}
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </>
  );
}
