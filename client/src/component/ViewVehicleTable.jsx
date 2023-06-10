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
import { Alert, Space, Spin } from 'antd';

import { EditOutlined, DeleteFilled, LoadingOutlined } from '@ant-design/icons';

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
  // eslint-disable-next-line no-unused-vars
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
  };
  const [loading, setLoading] = useState(true);
  const [delLoading, setDelLoading] = useState(false);
  //vehicle detail state
  const [vehicles, setVehicles] = useState([]);
  //delete vehicle state
  const [deleteStatus, setDeleteStatus] = useState(null);

  //handle get vehicle data
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

  //handle delete vehicle
  const deleteVehicle = (id) => {
    fetch(`/vehicle/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        setDelLoading(true);
        if (response.status === 204) {
          setDeleteStatus('success');
          setTimeout(() => {
            setDeleteStatus(null);
          }, 3000);
        } else if (response.status === 404) {
          setDeleteStatus('notFound');
          setTimeout(() => {
            setDeleteStatus(null);
          }, 3000);
        } else {
          setDeleteStatus('error');
          setTimeout(() => {
            setDeleteStatus(null);
          }, 3000);
          throw new Error('Unknwon error');
        }
      })
      .catch((error) => {
        setDeleteStatus('error');
        console.log(error);
        setTimeout(() => {
          setDeleteStatus(null);
        }, 3000);
      })
      .finally(() => {
        setDelLoading(false);
      });
  };

  return (
    <div>
      {/* delete alert */}
      <Space
        direction="vertical"
        style={{
          width: '100%',
          marginBottom: '10px',
        }}
      >
        {deleteStatus === 'success' && (
          <Alert
            message="Successfully Deleted"
            type="warning"
            showIcon={true}
            closable
            afterClose={handleClose}
          />
        )}
        {deleteStatus === 'notFound' && (
          <Alert
            message="Record not found"
            type="error"
            showIcon={true}
            closable
            afterClose={handleClose}
          />
        )}
        {deleteStatus === 'error' && (
          <Alert
            message="Something went wrong"
            type="error"
            showIcon={true}
            closable
            afterClose={handleClose}
          />
        )}
      </Space>

      <TableContainer sx={{ marginTop: '2' }} component={Paper}>
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
                <StyledTableRow key={vehicle.vehicleID}>
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
                    <Button
                      onClick={() => deleteVehicle(vehicle.vehicleID)}
                      variant="contained"
                      color="error"
                      disabled={delLoading}
                      startIcon={
                        delLoading ? <LoadingOutlined /> : <DeleteFilled />
                      }
                    >
                      {delLoading ? (
                        <span>
                          <Spin size="small" /> Deleting
                        </span>
                      ) : (
                        'Delete'
                      )}
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
