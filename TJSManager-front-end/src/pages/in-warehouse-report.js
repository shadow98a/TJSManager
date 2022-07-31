import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
// import { InWarehouseReportProfile } from '../components/inWarehouseReport/inWarehouseReport-profile';
import { InWarehouseReportProfileDetails } from '../components/inWarehouseReport/inWarehouseReport-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';

const InWarehouseReport = () => (
  <>
    <Head>
      <title>
        입고 신청 | TJSManager
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
          입고 신청
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
            <InWarehouseReportProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          > */}
            <InWarehouseReportProfileDetails />
          {/* </Grid>
        </Grid> */}
      </Container>
    </Box>
  </>
);

InWarehouseReport.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default InWarehouseReport;
