import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination
import '../Approveleaves/Main.css';

function generateSI(pageIndex, rowsPerPage, index) {
  return pageIndex * rowsPerPage + index + 1;
}

function createData(name, role, status) {
  return { name, role, status };
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

export default function Viewpeople() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user_info');
        console.log('Response from API:', response.data);
        if (response.data && Array.isArray(response.data.user_info)) {
          setTableData(response.data.user_info);
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

  const filteredRows = tableData.filter(
    (row) =>
      (row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.role && row.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.status && row.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

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
        placeholder="search by Name/Role/Status"
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
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{generateSI(page, rowsPerPage, index)}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.role}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={4} />
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={3}
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
      </div>
      <br></br>
      <hr style={{width:"1000px"}}></hr>
      <Typography variant="body2" color="text.primary" align="center">
        {'Copyright © '}
        All Rights are Reserved &ensp;
        <RouterLink color="inherit" href="https://jntugv.edu.in/">
          jntugv.edu.in
        </RouterLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}