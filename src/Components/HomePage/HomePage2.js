import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import AdminImage from "../HomePage/Images/AdminImage.png";
import group from "../HomePage/Images/group.png";
import leave from "../HomePage/Images/leave.png";
import report from "../HomePage/Images/report.png";
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

const Home2 = () =>{
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
         <img src={AdminImage} width='130px' height='130px' alt='Register_role'></img>
         <Button variant="contained" component={RouterLink} to="Register_role">Register Role</Button>
        </Box>
        <Box className="card">
         <img src={group} width='130px' height='130px' alt='Viewpeople'></img>
         <Button variant="contained" component={RouterLink} to="/Authority/Viewpeople">view People</Button>
        </Box>
        </Box>
    <Box className="container">
    <Box className="card">
         <img src={report} width='130px' height='130px' alt='Attendencereport'></img>
         <Button variant="contained" component={RouterLink} to="/Authority/Attendencereport">attends Report</Button>
        </Box>
        <Box className="card">
         <img src={leave} width='130px' height='130px' alt='Approveleaves'></img>
         <Button variant="contained" component={RouterLink} to="/Authority/Approveleaves">Approve leaves</Button>
        </Box>
    </Box>
    <br></br>
    <hr height={2}></hr>
    </div>
    <Copyright sx={{ mt: 2 }} />
  </div>
  );
}

export default Home2;