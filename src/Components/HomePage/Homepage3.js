import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import start from "../HomePage/Images/start.png";
import head from "../HomePage/Images/head.png";
import '../HomePage/Homepage.css';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.primary" align="center" {...props}>
        {'Copyright © '}
        All Rights are Reserved &ensp;
        <RouterLink color="inherit" href="https://jntugv.edu.in/">
          jntugv.edu.in
        </RouterLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const Home3 = () =>{
  return(
  <div>
    <div style={{textAlign:"center" }}>
        <img src='https://jntugv.edu.in/static/media/jntugvcev.b33bb43b07b2037ab043.jpg' width='150px' height='150px' alt='logo' ></img>
        <Typography variant="h5" gutterBottom margin={0}>
        Jawaharlal Nehru Technological University-Gurajada Vizianagaram<br></br>
        (Established by Andhra Pradesh Act No.22 by 2021)
        </Typography>
        <hr height={2}></hr>
    </div>
    <div>
    <Box className="container">
        <Box className="card">
         <img src={start} width='130px' height='130px' alt='AdminImage'></img>
         <Button variant="contained" component={RouterLink} to="/Start">Get Started</Button>
        </Box>
        </Box>
    <Box className="container">
        <Box className="card">
         <img src={head} width='130px' height='130px' alt='AdminImage'></img>
         <Button variant="contained" component={RouterLink} to="/login">Authority Login</Button>
        </Box>
    </Box>
    <br></br>
    <hr height={2}></hr>
    </div>
    <Copyright sx={{ mt: 2 }} />
  </div>
  );
}

export default Home3;