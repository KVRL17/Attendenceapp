import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import BackHandIcon from '@mui/icons-material/BackHand';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {'Copyright © '}
      All Rights are Reserved &ensp;
      <Link color="inherit" href="https://jntugv.edu.in/">
        jntugv.edu.in
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const role = [
  {roles:'Faculty'},
  {roles:'Attender'},
  {roles:'Vendor'}
]

export default function Leaverequests() {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/list-users');
      if (response.data.names && Array.isArray(response.data.names)) {
        setTableData(response.data.names);
      } else {
        console.error('Data retrieved from API is not an array:', response.data);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    user: '',
    role: '',
    date:'',
    description:''
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.post('http://localhost:8000/leave-request', formData);
      console.log('Data inserted successfully:', response.data);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            float:'left'
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
            <BackHandIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Leave Requests
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,width:"500px" }}>
            <Autocomplete
              freeSolo
              id="name"
              disableClearable
              options={tableData}
              value={formData.user}
              onChange={(event, newValue) => {
                setFormData({ ...formData, user: newValue });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Name"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
 <br></br>
      <Autocomplete
        freeSolo
        id="role"
        disableClearable
        options={role.map((option) => option.roles)}
        value={formData.role}
              onChange={(event, newValue) => {
                setFormData({ ...formData, role: newValue });
              }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Role"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      <br></br>
      <label>Date :</label>
            <input 
              type='date' 
              value={formData.date}
              onChange={(event) => {
                setFormData({ ...formData, date: event.target.value });
              }}
            />
            <br></br><br></br>
            <TextField
              fullWidth
              id="description"
              label="Enter Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={(event) => {
                setFormData({ ...formData, description: event.target.value });
              }}
            />
            <br></br>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <hr height={2}></hr>
            <Copyright sx={{ mt: 2, mb: 4 }} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
