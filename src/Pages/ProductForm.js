/////crtttt code profm
// ===== src/pages/ProductForm.jsx =====
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams }     from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Grid,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Alert,
  useTheme
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon             from '@mui/icons-material/Edit';
import CategoryIcon         from '@mui/icons-material/Category';
import MonetizationOnIcon   from '@mui/icons-material/MonetizationOn';
import ImageIcon            from '@mui/icons-material/Image';
import DescriptionIcon      from '@mui/icons-material/Description';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import background from '../image/gemini.png';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';

import { db } from '../firebase/config';
import { queryByPlaceholderText } from '@testing-library/dom';

export default function ProductForm() {
  const theme    = useTheme();
  const { id }   = useParams();  // 'new' or doc ID
  const navigate = useNavigate();
  const isEdit   = id && id !== 'new';

  const [form, setForm]     = useState({
    name: '',
    category: '',
    Brand:'',
    price: '',
    WarrantyPeriod:'',
    imageUrl: '',
    description: '',
    DemoVideoUrl:'',
  
    
  });
  const [loading, setLoading] = useState(isEdit);
  const [error, setError]     = useState('');

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const snap = await getDoc(doc(db, 'products', id));
          if (snap.exists()) {
            const data = snap.data();
            setForm({
              name: data.name,
              category: data.category,
              Brand: data.Brand,
              price: data.price.toString(),
              WarrantyPeriod: data.WarrantyPeriod ||'',
              imageUrl: data.imageUrl || '',
              description: data.description || '',
              DemoVideoUrl:data.DemoVideoUrl || '',
            });
          }
        } catch (err) {
          console.error(err);
          setError('Could not load product.');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, isEdit]);

  const handleChange = field => e =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.price || isNaN(form.price)) {
      setError('Please enter a valid name and numeric price.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name:        form.name,
        category:    form.category,
        Brand:       form.Brand,
        price:       parseFloat(form.price),
        imageUrl:    form.imageUrl,
        description: form.description,
        WarrantyPeriod: form.WarrantyPeriod,
        DemoVideoUrl: form.DemoVideoUrl,
        updatedAt:   serverTimestamp()
      };
      if (isEdit) {
        await setDoc(doc(db, 'products', id), payload, { merge: true });
      } else {
        await addDoc(collection(db, 'products'), {
          ...payload,
          createdAt: serverTimestamp()
        });
      }
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Failed to save product.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${theme.palette.primary[50]} 0%, ${theme.palette.secondary[100]} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        display: 'flex',
        py: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
  <Box
    sx={{
      p: 4,
      backgroundColor:  'rgba(255, 255, 255, 0.9)',
      backdropFilter:   'blur(10px)',
      
      borderRadius: 3,
      boxShadow: 3
    }}
  >
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Avatar
        sx={{
          background: 'linear-gradient(90deg, #0F1C57, #00C9A7)',
          width: 56,
          height: 56,
          mx: 'auto',
          mb: 1
        }}
      >
        {isEdit ? <EditIcon /> : <AddCircleOutlineIcon />}
      </Avatar>
      <Typography variant="h5">
        {isEdit ? 'Edit Product' : 'Add New Product'}
      </Typography>
    </Box>

    {error && (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    )}

    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Name"
            value={form.name}
            onChange={handleChange('name')}
            fullWidth
            sx={{ maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <DriveFileRenameOutlineIcon color="action" />
                </Box>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Category"
            value={form.category}
            onChange={handleChange('category')}
            fullWidth
            sx={{ maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <CategoryIcon color="action" />
                </Box>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Brand"
            value={form.Brand}
            onChange={handleChange('Brand')}
            fullWidth
            sx={{ maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <CategoryIcon color="action" />
                </Box>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Price"
            value={form.price}
            onChange={handleChange('price')}
            fullWidth
            sx={{ maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <MonetizationOnIcon color="action" />
                </Box>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Warranty Period"
            value={form.WarrantyPeriod}
            onChange={handleChange('WarrantyPeriod')}
            fullWidth
            sx={{ maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <WorkspacePremiumIcon color="action" />
                </Box>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Image URL"
            value={form.imageUrl}
            onChange={handleChange('imageUrl')}
            fullWidth
            sx={{ maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <ImageIcon color="action" />
                </Box>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange('description')}
            fullWidth
            sx={{ maxWidth: '100%' }}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <DescriptionIcon color="action" />
                </Box>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Demo Video URL"
            value={form.DemoVideoUrl}
            onChange={handleChange('DemoVideoUrl')}
            fullWidth
            sx={{ maxWidth: '100%' }}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <YouTubeIcon color="action" />
                </Box>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} 
        sx={{ display: 'flex', 
        justifyContent:'flex-end', 
        gap: 90, 
        mt: 2 
        }}>
          <Button onClick={() => navigate('/admin')} 
          variant="contained"
          sx={{
            background: '#1976d2', // default Material UI blue
            color: '#fff', 
            '&:hover': {
             backgroundColor: '#115293'
            }
          }}>
           <Typography sx={{ fontWeight: 'bold' }}>Cancel</Typography>
          </Button>

          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              background: 'linear-gradient(90deg, #0F1C57, #00C9A7)',
              color: '#fff',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              '&:hover': { opacity: 0.9 }
            }}
          >
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Box>
</Container>
    </Box>
  );
}