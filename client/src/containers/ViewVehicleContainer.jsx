import { Container, Paper } from '@mui/material';
import * as React from 'react';
import VehicleTable from '../component/ViewVehicleTable';

export default function ViewVehicle() {
  return (
    <Container sx={{ height: '100vh' }}>
      <Paper elevation={3}>
        <VehicleTable />
      </Paper>
    </Container>
  );
}
