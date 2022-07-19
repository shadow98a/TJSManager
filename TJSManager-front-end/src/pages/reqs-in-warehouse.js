import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ReqInWarehouseListResults } from '../components/reqInWarehouse/reqInWarehouse-list-results';
import { ReqInWarehouseListToolbar } from '../components/reqInWarehouse/reqInWarehouse-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { reqsInWarehouse } from '../__mocks__/reqsInWarehouse';

const ReqsInWarehouse = () => (
  <>
    <Head>
      <title>
        모든 상품 기본 정보 | TJSManager
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
        <ReqInWarehouseListToolbar />
        <Box sx={{ mt: 3 }}>
          <ReqInWarehouseListResults reqsInWarehouse={reqsInWarehouse} />
        </Box>
      </Container>
    </Box>
  </>
);
ReqsInWarehouse.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ReqsInWarehouse;
