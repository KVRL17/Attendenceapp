import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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

const role = ['Faculty', 'Attender', 'Vendor'];

export default function Attendance() {
  const [tableData, setTableData] = useState([]);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: ''
  });

  const videoRef = useRef(null);
  const webcamStreamRef = useRef(null);

  useEffect(() => {
    // Access the device camera and stream to video element
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        webcamStreamRef.current = stream; // Store the stream reference
      })
      .catch((err) => {
        console.error("An error occurred: " + err);
      });

    fetchData(); // Fetch initial data

    return () => {
      // Clean up the stream when component unmounts
      if (webcamStreamRef.current) {
        webcamStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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

  var [date, setDate] = useState(new Date());

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:8000/attendance/IT', formData);
      console.log('Data inserted successfully:', response.data);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      const canvasElement = document.createElement('canvas');
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      const ctx = canvasElement.getContext('2d');
      ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  
      // Convert canvas data to Blob
      canvasElement.toBlob(blob => {
        if (blob) {
          const reader = new FileReader();
          reader.readAsArrayBuffer(blob);
          reader.onloadend = () => {
            const imageDataBinary = reader.result;
            // Now imageDataBinary contains the binary representation of the captured image
            // You can send this binary data to the server or use it as needed
            console.log(imageDataBinary); // Logging the captured image data in binary format
          };
        }
      }, 'image/jpeg'); // Specify the desired image format (e.g., 'image/jpeg')
  
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
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
            <BadgeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Attendance
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
            <br />
            <Autocomplete
              freeSolo
              id="role"
              disableClearable
              options={role}
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
            <div>
              <video ref={videoRef} id="videoElement" autoPlay className="embed-responsive-item"></video>
              <br></br>
              <Button onClick={handleCapture} id="captureButton" variant='contained'style={{alignContent:"center"}}>Verify Face</Button>
            </div>
            <img src={done} width='50px' height='50px' alt='logo' style={{ float: "left" }}></img><p>Matched</p>
            <img src={wrong} width='45px' height='35px' alt='logo' style={{ float: "left" }}></img><p>Not Matched</p>
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
