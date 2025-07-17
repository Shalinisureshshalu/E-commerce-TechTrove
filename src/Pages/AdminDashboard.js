// ===== src/pages/AdminDashboard.jsx =====
import React, { useEffect, useState }         from 'react';
import { useNavigate, Link as RouterLink }    from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  CircularProgress,
  Typography,
  Tooltip,
  Link,
  useTheme
}                                              from '@mui/material';
import AddIcon          from '@mui/icons-material/Add';
import EditIcon         from '@mui/icons-material/Edit';
import DeleteIcon       from '@mui/icons-material/Delete';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db }           from '../firebase/config';


export default function AdminDashboard() {
  const theme     = useTheme();
  const navigate  = useNavigate();
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId]   = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'products'),
      snap => {
        setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      err => {
        console.error(err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'products', toDeleteId));
    setConfirmOpen(false);
    setToDeleteId(null);
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
        
        py: 6
      }}
    >
      <Container maxWidth="lg">
        {/* Page header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4"  
           sx={{
           fontFamily: 'Poppins, sans-serif', // Change to any Google Font or system font
           fontWeight: 500,
           color:'#0F1C57',
           letterSpacing: '1px',
           textTransform: 'uppercase',
           mb: 3, // margin-bottom
            }}
        
          >Admin Dashboard</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/admin/product/new"
            sx={{
              background: 'linear-gradient(90deg, #0F1C57, #00C9A7)',
              color: '#fff',
              '&:hover': { opacity: 0.9 }
            }}
          >
            Add Product
          </Button>
        </Box>

        {/* Products table */}
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            // alternate row shading
            '& .MuiTableRow-root:nth-of-type(even)': {
              backgroundColor: theme.palette.action.hover
            }
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                       background:'linear-gradient(90deg, #0F1C57)'
                }}
                >
                {['Name', 'Category','Brand', 'Price','Warranty Period', 'Description','Demo Video URL', 'Actions'].map(h => (
                  <TableCell
                    key={h}
                    align={h === 'Actions' ? 'right' : 'left'}
                    sx={{
                      background: 'none',  
                       color: '#fff',  
                      fontWeight: 'bold',
                        fontSize: 16,
                       padding: '12px 16px',
                      textTransform:'uppercase',
                      letterSpacing: '1px',
                      maxWidth: 200,
                      

                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(prod => (
                <TableRow key={prod.id} hover>
              <TableCell>
  <Box display="flex" alignItems="center">
    {prod.imageUrl && (
      <Tooltip
        title={
          <img
            src={prod.imageUrl}
            alt={prod.name}
            style={{
              maxWidth: '200px',
              maxHeight: '200px',
              objectFit: 'contain',
              borderRadius: 8
            }}
          />
        }
        arrow
        placement="right"
      >
        <img
          src={prod.imageUrl}
          alt={prod.name}
          style={{
            width: 50,
            height: 50,
            objectFit: 'cover',
            borderRadius: 4,
            marginRight: 8,
            cursor: 'pointer'
          }}
        />
      </Tooltip>
    )}
    <Typography variant="body1">{prod.name}</Typography>
  </Box>
</TableCell>


                   <TableCell sx={{ paddingRight: 9}}>{prod.category}</TableCell>
                  <TableCell sx={{ paddingRight: 13}}>{prod.Brand}</TableCell>
                  <TableCell sx={{ paddingRight: 4 }}>₹{prod.price}</TableCell>
                  <TableCell>{prod.WarrantyPeriod }</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {prod.description}</TableCell>
                  
                  <TableCell>
                    {prod.DemoVideoUrl && /^((https?:\/\/)|(www\.))/i.test(prod.DemoVideoUrl) ? (
                   <Link href={prod.DemoVideoUrl} target="_blank" rel="noopener noreferrer">
                     View Demo
                     </Link>
                     ) : (
                     'N/A'
                     )}
                   </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <Button size="small" onClick={() => navigate(`/admin/product/${prod.id}`)}>
                        <EditIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          setToDeleteId(prod.id);
                          setConfirmOpen(true);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Confirmation dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
