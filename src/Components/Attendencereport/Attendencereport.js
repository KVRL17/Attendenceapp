import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import { Button, Typography, TablePagination } from '@mui/material';
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Attendencereport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/attendance/IT');
        console.log('Response from API:', response.data);
        if (response.data && Array.isArray(response.data.attendance_details)) {
          // Adding SI.No to the data
          const dataWithSiNo = response.data.attendance_details.map((row, index) => ({
            ...row,
            si_no: index + 1,
          }));
          setTableData(dataWithSiNo);
        } else {
          console.error('Data retrieved from API is not an array or user_info is not present:', response.data);
          setTableData([]);
        }
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = tableData.filter(
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
        <hr style={{width:"1000px"}}></hr>
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
      <div className='main2'>
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
          {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <StyledTableRow key={row.si_no}>
                <StyledTableCell component="th" scope="row">
                  {row.si_no}
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.role}</StyledTableCell>
                <StyledTableCell>{row.present_days}</StyledTableCell>
                <StyledTableCell>{row.absent_days}</StyledTableCell>
                <StyledTableCell><Button variant='outlined'>View</Button></StyledTableCell>
              </StyledTableRow>
          ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      </div>
      <br></br>
      <hr style={{width:"1000px"}}></hr>
      <Copyright sx={{ mt: 2,mb:5 }} />
    </>
  );
}