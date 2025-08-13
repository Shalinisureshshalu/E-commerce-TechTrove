// src/pages/Home.jsx
import React from 'react';
import { Box,
 Typography,
 Button,
TextField,
InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';
import Image1 from '../image/single Tv ad.jpg';
import Image2 from '../image/single Ac ad.jpg';
import Image3 from '../image/ad headphones.jpg';
import Image4 from '../image/ad ph.jpg';
import Image5 from '../image/appliances.png';
import Image6 from '../image/ad keyboard.jpg';
export default function Home() {
  return (
    
    <Box
      sx={{
        height: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Typography 
        variant="h3"
         component="h3"
        sx={{ 
          mt: 4, 
        }}
             gutterBottom>
        Welcome to Tech Trove
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
       "Tech Treasures, All in One Trove!"
      </Typography>
    
      <TextField
      placeholder="Search Products"
      variant="outlined"
      size="small"
      sx={{
        width: '300px',
        mt: 2,
        mb: 2,
        backgroundColor: 'white',
        borderRadius: '4px',
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <Box
      sx={{
        display:'flex',
        width: '80%',
        height: 'auto',
        justifyContent: 'left',
        alignItems: 'left',
      }}
      >
      <img
        src={Image1}  
        style={{
          width: '55%',
          height: 'auto',
          maxHeight: '70vh',
          objectFit: 'cover',
          display: 'block',
          margin: '10px',
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          marginBottom: '100px',
          mt: '15px',
        }}
      />
       <img
        src={Image2}  
        style={{
          width: '50%',
          height: 'auto',
          maxHeight: '70vh',
          objectFit: 'cover',
          display: 'block',
          margin: '10px',
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          marginBottom: '100px',
          mt: '15px',
        }}
      />
    </Box>
    <Box 
      sx={{
        alignItems: 'right',
        display: 'flex',justifyContent: 'right',
        width: '80%',
        height: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
      >
      <Button 
      variant="contained"
      component={RouterLink}
      to="/shop"
      sx={{
        width: '120px',
        height: '35px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        mt:-25,
        marginBottom: 0, 
        paddingBottom: 0,
        borderRadius: '8px',
        backgroundColor: '#119382ff',
        color: 'white',
        '&:hover': {
          backgroundColor: '#17518cff',
        },
        }}
        >
         View More
         </Button>
      </Box>

      
      <Box 
        sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
       
         <img
        src={Image3}  
        style={{
          width: '78%',
          height: 'auto',
          maxHeight: '70vh',
          objectFit: 'cover',
          display: 'block',
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          marginTop:'-90px',
          marginBottom: '10px',
        }}
      />
      </Box>
       <Box
      sx={{
        display:'flex',
        width: '80%',
        height: 'auto',
        justifyContent: 'left',
        alignItems: 'left',
      }}
      >
      <img
        src={Image5}  
        style={{
          width: '45%',
          height: 'auto',
          maxHeight: '70vh',
          objectFit: 'cover',
          display: 'block',
          margin: '10px',
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          marginBottom: '100px',
          mt: '15px',
        }}
      />
       
       <img
        src={Image4}  
        style={{
          width: '50%',
          height: 'auto',
          maxHeight: '70vh',
          objectFit: 'cover',
          display: 'block',
          margin: '10px',
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          marginBottom: '100px',
          mt: '15px',
        }}
      />
    </Box>
      <Box 
      sx={{
        alignItems: 'right',
        display: 'flex',justifyContent: 'right',
        width: '80%',
        height: 'auto',
        marginTop: '-60px',
        marginBottom: '20px',
        marginRight: '700px',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
      >
      <Button 
      variant="contained"
      component={RouterLink}
      to="/shop"
      sx={{
        width: '150px',
        height: '40px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        mt:-25,
        marginBottom: 0, 
        paddingBottom: 0,
        borderRadius: '8px',
        backgroundColor: '#119382ff',
        color: 'white',
        '&:hover': {
          backgroundColor: '#17518cff',
        },
        }}
        >Explore Now 
         </Button>
      </Box>
      
       <Box 
        sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
          marginBottom: '20px',
        }}
        >
       
         <img
        src={Image6}  
        style={{
          width: '78%',
          height: 'auto',
          maxHeight: '70vh',
          objectFit: 'cover',
          display: 'block',
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          marginTop:'30x',
          marginBottom: '10px',
        }}
      />
      </Box>
    </Box>
  );
}
  