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
  useTheme,
  Tab,
  Tabs
}                                              from '@mui/material';
import AddIcon          from '@mui/icons-material/Add';
import EditIcon         from '@mui/icons-material/Edit';
import DeleteIcon       from '@mui/icons-material/Delete';
import CheckIcon    from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { collection, onSnapshot, doc, deleteDoc,updateDoc } from 'firebase/firestore';
import { getDoc }   from 'firebase/firestore';
import { db }           from '../firebase/config';


export default function AdminDashboard() {
  const theme     = useTheme();
  const navigate  = useNavigate();
  const [tab, setTab]               = useState(0);
  const [products, setProducts]     = useState([]);
  const [orders, setOrders]         = useState([]);
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

   useEffect(() => {
  const unsub = onSnapshot(
    collection(db, 'orders'),
    snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    },
    err => {
      console.error("Failed to fetch orders:", err);
    }
  );
  return () => unsub();
}, []);


  const handleDelete = async () => {
    await deleteDoc(doc(db, 'products', toDeleteId));
    setConfirmOpen(false);
    setToDeleteId(null);
  };
  const handleApprove = async (orderId) => {
    await updateDoc(doc(db, 'orders', orderId), { status: 'approved' });
  };
     const handleReject = async (orderId) => {
    await updateDoc(doc(db, 'orders', orderId), { status: 'rejected' });
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
         <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Products" />
          <Tab label="Orders" />
        </Tabs>
         {tab === 0 && (
          <>
            <Box display="flex" justifyContent="flex-end" mb={2}>
         
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
                      maxWidth: 1000,
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map(prod => (
                <TableRow 
                key={prod.id} hover>
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

                   <TableCell sx={{ paddingRight: 6}}>{prod.category}</TableCell>
                  <TableCell sx={{ paddingRight: 5}}>{prod.Brand}</TableCell>
                  <TableCell sx={{ paddingRight: 4 }}>₹{prod.price}</TableCell>
                  <TableCell>{prod.WarrantyPeriod }</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 150,
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
    </>
  )}
  {tab === 1 && (
          <>
            <Typography variant="h5" gutterBottom>Orders</Typography>
            <TableContainer 
            component={Paper} 
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              '& .MuiTableRow-root:nth-of-type(even)': {
                backgroundColor: theme.palette.action.hover
              }
              }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow
                       sx={{
                       background:'linear-gradient(90deg, #0F1C57)'
                }}
                >
                    {['Order ID','User Name','Items','Total','Status','Accept','Reject'].map(h => (
                      <TableCell 
                      key={h} 
                     align={h === 'Actions' ? 'center' : 'center'}
                      sx={{ 
                         background: 'none',  
                       color: '#fff',  
                      fontWeight: 'bold',
                        fontSize: 16,
                       padding: '12px 16px',
                      textTransform:'uppercase',
                      letterSpacing: '1px',
                      maxWidth: 1000,
                        
                       }}
                      >
                      {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders.map(o => (
                    <OrderRow 
                    key={o.id} 
                    order={o} 
                    onApprove={handleApprove}
                    onReject={handleReject}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </Box>
  );
}

// helper to fetch and display user name, items list
  function OrderRow({ order, onApprove,onReject}) {
  const [userName, setUserName] = useState('');
  const itemsText = order.items.map(i => `${i.name} x${i.quantity}`).join(', ');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', order.userId));
        if (snap.exists()) {
          const user = snap.data();
          setUserName(`${user.FirstName} ${user.LastName}`);
        } else {
          setUserName('Unknown User');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setUserName('Error');
      }
    };

    if (order.userId) fetchUser();
  }, [order.userId]);

                
  return (
    <TableRow>
      <TableCell>{order.id}</TableCell>
      <TableCell sx={{paddingRight:4}}>{userName}</TableCell>
      <TableCell sx={{ paddingleft: 25,maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {itemsText}
      </TableCell>
      <TableCell sx={{paddingRight:4}}>₹{order.total.toFixed(2)}</TableCell>
      <TableCell sx={{ textTransform: 'capitalize',paddingRight:2}}>{order.status}</TableCell>

      <TableCell align = "center">
        {order.status !== 'approved' && order.status !== 'rejected' &&(
          
          <Tooltip title="Approve">
            <Button
              size="small"
              color="success"
              onClick={() => onApprove(order.id)}
            >
              <CheckIcon fontSize="small" />
            </Button>
          </Tooltip>
        )}
         </TableCell>
      <TableCell align="center">
        {order.status !== 'approved' && order.status !== 'rejected' &&(
          <Tooltip title="Reject">
            <Button
              size="small"
              color="error"
              onClick={() => { onReject(order.id);
              }}
            >
              <ClearIcon fontSize="small" />
            </Button>
            </Tooltip>
      
        )}
      </TableCell>
    </TableRow>
  );
}
