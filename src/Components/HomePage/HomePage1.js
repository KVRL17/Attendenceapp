import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import attendence from "../HomePage/Images/attendence.png";
import request from "../HomePage/Images/request.png";
import '../HomePage/Homepage.css';
import '../Approveleaves/Main.css'

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

const Home = () =>{
  return(
  <div>
    <div style={{textAlign:"center" }}>
        <img src='https://jntugv.edu.in/static/media/jntugvcev.b33bb43b07b2037ab043.jpg' width='150px' height='150px' alt='logo' ></img>
        <Typography variant="h5" gutterBottom margin={0}>
        Jawaharlal Nehru Technological University-Gurajada Vizianagaram<br></br>
        (Established by Andhra Pradesh Act No.22 by 2021)
        </Typography>
        <hr style={{width:"1000px"}}></hr>
    </div>
    <div className="main">
    <Box className="container">
        <Box className="card">
         <img src={attendence} width='130px' height='130px' alt='AdminImage'></img>
         <Button variant="contained" component={RouterLink} to="/Start/Attendence">Take attendence</Button>
        </Box>
        </Box>
    <Box className="container">
        <Box className="card">
         <img src={request} width='130px' height='130px' alt='AdminImage'></img>
         <Button variant="contained" component={RouterLink} to="/Start/Leavepage">Leaves</Button>
        </Box>
    </Box>
    <br></br>
    <hr style={{width:"1000px"}}></hr>
    </div>
    <Copyright sx={{ mt: 2,mb:5 }} />
  </div>
  );
}

export default Home;