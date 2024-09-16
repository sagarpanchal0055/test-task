import React from 'react';
import { Container, Box, Stack, Typography } from '@mui/material';
import ShoppingCartIcon from './../../assets/IconordersD.png';
import AccountCircleIcon from './../../assets/IconuserD.png';
import AttachMoneyIcon from './../../assets/Iconsalesd.png';
import PendingActionsIcon from './../../assets/totalPending.png';
import StatsCard from '../../components/dashboard/StatsCard';
import SalesChart from '../../components/dashboard/SalesChart';
import ProductTable from '../../components/dashboard/ProductTable';

const App = () => {
  return (
    <Container>
      <Box mt={4}>
      <Typography mt={4} fontSize={"32px"} fontWeight={700} color="#202224">Dashboard</Typography>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <StatsCard title="Total User" value="40,689" icon={AccountCircleIcon} trend={8.5} trendText="Up from yesterday" />
        <StatsCard title="Total Order" value="10,293" icon={ShoppingCartIcon} trend={1.3} trendText="Up from past week" />
        <StatsCard title="Total Sales" value="$89,000" up={false} icon={AttachMoneyIcon} trend={-4.3} trendText="Down from yesterday" />
        <StatsCard title="Total Pending" value="2040" icon={PendingActionsIcon} trend={1.8} trendText="Up from yesterday" />
      </Stack>
      </Box>
      <Stack direction="column" spacing={4} mt={4}>
        <SalesChart />
        <ProductTable />
      </Stack>
    </Container>
  );
};

export default App;
