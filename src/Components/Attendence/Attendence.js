import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import BadgeIcon from '@mui/icons-material/Badge';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import done from '../Register/done.png';
import wrong from '../Register/wrong.png';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { useEffect } from 'react';
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

const name = [
    {names:'Ramana'},
    {names:'Jagan'},
    {names:'Aditya'}
]

const role = [
    {roles:'Faculty'},
    {roles:'Attender'},
    {roles:'Vendor'}
]
export default function Attendence() {
    var [date,setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      role: data.get('role'),
    });
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
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
            <BadgeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Attendence
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="time"
              label="Time"
              value={date.toLocaleTimeString()}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="date"
              label="Date"
              value={date.toLocaleDateString()}
              autoFocus
            />
        <Autocomplete
        freeSolo
        id="name"
        disableClearable
        options={name.map((option) => option.names)}
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
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Show Face
            </Button>
            <br></br>
            <img src={done} width='50px' height='50px' alt='logo' style={{float:"left"}}></img><p>Matched</p>
            <img src={wrong} width='45px' height='35px' alt='logo' style={{float:"left"}}></img><p>Not Matched</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            
            
          </Box>
        </Box>
        <hr height={2}></hr>
        <Copyright sx={{ mt: 2, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}