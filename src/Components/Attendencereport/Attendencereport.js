import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import { Button, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(si_no, name, role, present,absent) {
  return { si_no, name, role, present,absent };
}

const rows = [
  createData(1, 'Ramana', 'Faculty', 10, 20),
  createData(2, 'Jagan', 'Faculty', 8, 22),
  createData(3, 'Aditya', 'Faculty', 7, 23),
  createData(4, 'Praveen', 'Faculty', 5, 25),
  createData(5, 'Mohan', 'Faculty', 2, 28),
];

export default function Attendencereport() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <img
          src="https://jntugv.edu.in/static/media/jntugvcev.b33bb43b07b2037ab043.jpg"
          width="150px"
          height="150px"
          alt="logo"
        ></img>
        <Typography variant="h5" gutterBottom margin={0}>
          Jawaharlal Nehru Technological University-Gurajada Vizianagaram
          <br></br>(Established by Andhra Pradesh Act No.22 by 2021)
        </Typography>
        <hr height={2}></hr>
      </div>
      <Paper
      component="form"
      sx={{p: '8px 10px',justifyContent: 'center',alignItems: 'center',width: 400,margin: '20px auto',}}>
      <InputBase
        sx={{ ml: 4, flex: 1, mr: 8 }}
        placeholder="search by Name/Role"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SI.No</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>No.of Days Present</StyledTableCell>
              <StyledTableCell>No.of Days Absent</StyledTableCell>
              <StyledTableCell>Details</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <StyledTableRow key={row.si_no}>
                <StyledTableCell component="th" scope="row">
                  {row.si_no}
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.role}</StyledTableCell>
                <StyledTableCell>{row.present}</StyledTableCell>
                <StyledTableCell>{row.absent}</StyledTableCell>
                <StyledTableCell><Button variant='outlined'>View</Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <hr height={2}></hr>
      <Copyright sx={{ mt: 2 }} />
    </>
  );
}