import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import done from '../Register/done.png';
import wrong from '../Register/wrong.png';
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Registerrole() {
    const [role, setrole] = React.useState('');

  const handleChange = (event) => {
    setrole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('name'),
      password: data.get('role'),
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Role
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
            />
        <FormControl fullWidth>
        <InputLabel id="role">Role</InputLabel>
        <Select
          value={role}
          required
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value={10}>attender</MenuItem>
          <MenuItem value={20}>faculty</MenuItem>
          <MenuItem value={30}>vendor</MenuItem>
        </Select>
      </FormControl>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register Face
            </Button>
            <br></br>
            <img src={done} width='50px' height='50px' alt='logo' style={{float:"left"}}></img><p>Done</p>
            <img src={wrong} width='45px' height='35px' alt='logo' style={{float:"left"}}></img><p>Failed</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            
            
          </Box>
        </Box>
        <hr height={2}></hr>
        <Copyright sx={{ mt: 2, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}