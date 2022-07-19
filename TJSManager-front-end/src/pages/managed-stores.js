import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ManagedStoreListResults } from '../components/managedStore/managedStore-list-results';
import { ManagedStoreListToolbar } from '../components/managedStore/managedStore-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { managedStores } from '../__mocks__/managedStores';

const ManagedStores = () => (
  <>
    <Head>
      <title>
        지점 정보 | TJSManager
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
        <ManagedStoreListToolbar />
        <Box sx={{ mt: 3 }}>
          <ManagedStoreListResults managedStores={managedStores} />
        </Box>
      </Container>
    </Box>
  </>
);
ManagedStores.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ManagedStores;
