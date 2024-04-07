import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import TablePagination from '@mui/material/TablePagination';

function createData(si_no, name, role, date, description) {
  return { si_no, name, role, date, description};
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

export default function Approveleaves() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [disabledButtons, setDisabledButtons] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/leave-requests');
      if (Array.isArray(response.data.leave_requests)) {
        setTableData(response.data.leave_requests);
      } else {
        console.error('Data retrieved from API is not an array:', response.data.leave_requests);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApprove = async (username, approved, index) => {
    try {
      const response = await axios.post('http://localhost:8000/approve', {
        username: username,
        approved: approved,
      });
      // After approval/rejection, fetch updated data
      console.log({response});
      fetchData();
      // Disable the button after clicking
      setDisabledButtons(prevState => ({
        ...prevState,
        [index]: true
      }));
    } catch (error) {
      console.error('Error approving/rejecting leave request:', error);
    }
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
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Accept</StyledTableCell>
              <StyledTableCell>Reject</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={row.si_no}>
                  <StyledTableCell component="th" scope="row">
                    {row.si_no}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.role}</StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant='contained'
                      color="success"
                      onClick={() => handleApprove(row.name, 'Leave Approved', index)}
                      disabled={disabledButtons[index]}
                    >
                      Accept
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant='contained'
                      color="error"
                      onClick={() => handleApprove(row.name, 'Leave Rejected', index)}
                      disabled={disabledButtons[index]}
                    >
                      Reject
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={3}
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