import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { SalesConsumerListResults } from '../components/salesConsumer/salesConsumer-list-results';
import { SalesConsumerListToolbar } from '../components/salesConsumer/salesConsumer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { salesConsumers } from '../__mocks__/salesConsumers';

const SalesConsumers = () => (
  <>
    <Head>
      <title>
        구매자 기록 | TJSManager
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <SalesConsumerListToolbar />
        <Box sx={{ mt: 3 }}>
          <SalesConsumerListResults salesConsumers={salesConsumers} />
        </Box>
      </Container>
    </Box>
  </>
);
SalesConsumers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default SalesConsumers;
