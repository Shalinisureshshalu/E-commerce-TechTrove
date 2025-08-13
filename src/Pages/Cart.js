import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Avatar,
  IconButton,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  useTheme,
  
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../contexts/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function Cart() {
  
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const theme     = useTheme();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,0);
  const taxRate = 0.03; 
  const taxes = total * taxRate;
  const grandTotal = total + taxes;
  
  

  return (
       <Box
             sx={{
               minHeight: '100vh',
               py: 6
             }}
           >

    <Container sx={{ mt: 0}}>
      <Typography variant="h4" gutterBottom
       >
        Your Cart 
         <IconButton color="inherit" size="large">
        <ShoppingCartIcon fontSize="large" />
    </IconButton>
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>No items in your cart.</Typography>
      ) : (
        <>
         <TableContainer
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            // alternate row shading
            '& .MuiTableRow-root:nth-of-type(even)': {
              backgroundColor:  theme.palette.action.hover
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
                {['Items', 'Price','Quantity', 'Total', '  '].map(h => (
                  <TableCell
                    key={h}
                    align="center"
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
            {cartItems.map(product=> (
              <TableRow key={product.id}>
                 <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            src={product.imageUrl}
                            variant="square"
                            sx={{ 
                               width: 64,
                               height: 64,
                               borderRadius: 2,
                               paddingLeft: 3,
                             }}
                          />
                      <Box>
                            <Typography variant="body1">{product.name}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                       
                      <TableCell 
                      sx={{ 
                        textAlign :"center",
                      

                        }}>₹{product.price.toFixed(2)}</TableCell>

                      <TableCell sx={{
                        textAlign:"center",
                      
                      }}>{product.quantity}</TableCell>

                      <TableCell align="center">
                        ₹{(product.price * product.quantity).toFixed(2)}
                      </TableCell>

                      <TableCell>
                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
              </TableRow>
                 
            ))}
          </TableBody>
          </Table>
          </TableContainer>

          
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 2 }}>
            <Typography variant="h6"
            sx={{
              fontWeight: 'normal',
              
              letterSpacing: '1px',
              textAlign: 'right',
              mt: 2,
              paddingRight: 18,
            }}>SubTotal: ₹{total.toFixed(2)}</Typography>
               
           
             <Typography
             variant="h6"
             sx={{
             fontWeight: 'normal',
             letterSpacing: '1px',
             textAlign: 'right',
             mt: 1,
             paddingRight: 18,
            }}
            >
            Taxes (0.03%): ₹{taxes.toFixed(2)}
           </Typography>

           <Typography
             variant="h6"
             sx={{
             fontWeight: 'bold',
            fontSize: 20,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'right',
            mt: 1,
            paddingRight: 18,
              }}
         >
               Grand Total: ₹{grandTotal.toFixed(2)}
           </Typography>


            <Button
              variant="contained"  
              sx={{
                background: 'linear-gradient(90deg, #0F1C57)',
                color: '#fff',
                mt: 2,
                paddingRight: 4,
              }}
              onClick={() => navigate('/checkout')}
              
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
    </Box>
  );
}