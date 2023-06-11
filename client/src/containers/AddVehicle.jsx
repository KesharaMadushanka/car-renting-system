import { Container, Paper } from '@mui/material';
import * as React from 'react';
import AddVehicleForm from '../component/AddVehicleForm';

export default function AddVehicle() {
  return (
    <Container sx={{ height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: '30px' }}>
        <AddVehicleForm />
      </Paper>
    </Container>
  );
}
