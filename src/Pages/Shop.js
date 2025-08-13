// ===== src/pages/Shop.jsx =====
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  CircularProgress,
  Rating
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Shop() {
  const [productsAll, setProductsAll] = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [categories, setCategories]   = useState([]);
  const [loading, setLoading]         = useState(true);

  // Filter state
  const [category, setCategory]       = useState('All');
  const [priceRange, setPriceRange]   = useState([0, 10000]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 10000]);

  // Fetch all products
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'products'),
      snapshot => {
        const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductsAll(prods);

        // derive categories
        const cats = Array.from(new Set(prods.map(p => p.category).filter(Boolean)));
        setCategories(cats);

        // derive price range
        const prices = prods.map(p => p.price || 0);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
        setSelectedPriceRange([minPrice, maxPrice]);

        setLoading(false);
      },
      err => {
        console.error('Error loading products:', err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  // Apply filters whenever products, category, or priceRange change
  useEffect(() => {
    let res = productsAll;
    if (category !== 'All') {
      res = res.filter(p => p.category === category);
    }
   res = res.filter(p => p.price >= selectedPriceRange[0] && p.price <= selectedPriceRange[1]);
    setFiltered(res);
  }, [productsAll, category, priceRange]);
        <Slider
  value={priceRange}
  onChange={(e, newValue) => setPriceRange(newValue)}
  valueLabelDisplay="auto"
  min={0}
  max={10000}
  step={100}
  marks={[
    { value: 0, label: '₹0' },
    { value: 2500, label: '₹2.5k' },
    { value: 5000, label: '₹5k' },
    { value: 7500, label: '₹7.5k' },
    { value: 10000, label: '₹10k' },
  ]}
/>

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shop Products
      </Typography>

      {/* Filters */}
      <Box display="flex" alignItems="center" gap={4} mb={4}>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={e => setCategory(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ width: 240 }}>
          <Typography gutterBottom>
  Price: ₹{selectedPriceRange[0]} – ₹{selectedPriceRange[1]}
</Typography>
<Slider
  value={selectedPriceRange}
  onChange={(e, newVal) => setSelectedPriceRange(newVal)}
  valueLabelDisplay="auto"
  min={priceRange[0]}
  max={priceRange[1]}
  step={100}
  marks={[
    { value: priceRange[0], label: `₹${priceRange[0]}` },
    { value: priceRange[1], label: `₹${priceRange[1]}` }
  ]}
/>
        </Box>
      </Box>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <Typography>No products found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map(prod => (
            <Grid item key={prod.id} xs={12} sm={6} md={4}>
              <Card>
                {prod.imageUrl && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={prod.imageUrl}
                    alt={prod.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{prod.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {prod.Brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {prod.description}
                  </Typography>
                  
                  <Rating name="profile-rating" value={4.5} precision={0.5} readOnly sx={{ mt: 1 }} />

                  <Typography sx={{ mt: 1 }}><strong>₹{prod.price}</strong></Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={`/product/${prod.id}`}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}