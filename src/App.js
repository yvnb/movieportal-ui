import MovieHomePage from './Containers/MovieHomePage';
import ManageBookingPage from './Containers/ManageBookingPage';

import { Routes, Route, useNavigate} from'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; 
import MovieDetailsPage from './Containers/MovieDetailsPage';
import MovieBookingPage from './Containers/MovieBookingPage';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

function App() {
  let navigate = useNavigate();
  function handleClick() {
    navigate('/manageBooking');
  };
  function handleHomeIcon(){
    navigate('/');
  };
  return (    
    <div className="App">

      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Toolbar style={{display:'flex', justifyContent:'center' }}>        

        <Typography>
           <HomeIcon onClick={(handleHomeIcon)}/> 
        </Typography>
          <Typography variant="h6" component="div" align="center">
            Welcome to the ultimate movie booking portal. Explore now
          </Typography>   
         
        </Toolbar>

        <div style={{display:'flex', justifyContent:'flex-end' }}>
          <Button color="inherit" onClick={(handleClick)}>Manage Booking</Button>
        </div>
        
        </AppBar>
      </Box>
     
        <Routes>
          <Route path="/" element={<MovieHomePage />} />    
          <Route path="/manageBooking" element={<ManageBookingPage />} />   
          <Route path="/movie/*" element={<MovieDetailsPage />} /> 
          <Route path="/booking/*" element={<MovieBookingPage />} />       
        </Routes>
     
    
    </div>
  );
}

export default App;
