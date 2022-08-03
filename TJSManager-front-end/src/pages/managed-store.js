import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
// import { ManagedStoreProfile } from '../components/managedStore/managedStore-profile';
import { ManagedStoreProfileDetails } from '../components/managedStore/managedStore-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';

const ManagedStore = () => (
  <>
    <Head>
      <title>
        지점 | TJSManager
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          지점
        </Typography>
        {/* <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <ManagedStoreProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          > */}
            <ManagedStoreProfileDetails />
          {/* </Grid>
        </Grid> */}
      </Container>
    </Box>
  </>
);

ManagedStore.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ManagedStore;
