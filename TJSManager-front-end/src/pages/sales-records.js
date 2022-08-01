import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { SalesRecordListResults } from '../components/salesRecord/salesRecord-list-results';
import { SalesRecordListToolbar } from '../components/salesRecord/salesRecord-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { salesRecords } from '../__mocks__/salesRecords';

const SalesRecords = () => (
  <>
    <Head>
      <title>
        판매 이력 | TJSManager
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
        <SalesRecordListToolbar />
        <Box sx={{ mt: 3 }}>
          <SalesRecordListResults salesRecords={salesRecords} />
        </Box>
      </Container>
    </Box>
  </>
);
SalesRecords.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default SalesRecords;
