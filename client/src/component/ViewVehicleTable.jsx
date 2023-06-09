import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { Button } from '@mui/material';

import { EditOutlined, DeleteFilled } from '@ant-design/icons';

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

export default function VehicleTable() {
  const [loading, setLoading] = useState(true);
  //get vehicled details
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('/vehicle').then((response) =>
      response
        .json()
        .then((data) => {
          setVehicles(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching vehicle data: ', error);
        })
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Vehicle Number</StyledTableCell>
            <StyledTableCell align="center">Vehicle Brand</StyledTableCell>
            <StyledTableCell align="center">Vehicle Model</StyledTableCell>
            <StyledTableCell align="center">
              Vehicle Chasis Number
            </StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            // Display skeleton rows while loading
            <>
              <TableRow>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
              </TableRow>
            </>
          ) : (
            //Actual data
            vehicles.map((vehicle) => (
              <StyledTableRow key={vehicle.vehicleId}>
                <StyledTableCell component="th" scope="row">
                  {vehicle.vehicleNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {vehicle.vehicleBrand}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {vehicle.vehicleModel}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {vehicle.vehicleChassisNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="outlined" color="warning">
                    Edit&nbsp;
                    <EditOutlined />
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="contained" color="error">
                    Delete&nbsp;
                    <DeleteFilled />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
