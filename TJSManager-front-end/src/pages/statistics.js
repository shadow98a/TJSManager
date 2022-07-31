import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
// import { Budget } from '../components/statistics/budget';
// import { LatestOrders } from '../components/statistics/latest-orders';
// import { LatestProducts } from '../components/statistics/latest-products';
import { SalesByTime } from '../components/statistics/sales-by-time';
// import { TasksProgress } from '../components/statistics/tasks-progress';
// import { TotalCustomers } from '../components/statistics/total-customers';
// import { TotalProfit } from '../components/statistics/total-profit';
import { SalesByGender } from '../components/statistics/sales-by-gender';
import { SalesByAge } from '../components/statistics/sales-by-age';
import { DashboardLayout } from '../components/dashboard-layout';

const Statistics = () =>
{
  return  (
            <>
              <Head>
                <title>
                  통계 | TJSManager
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
                  <Grid
                    container
                    spacing={3}
                  >
                    {/* <Grid
                      item
                      lg={3}
                      sm={6}
                      xl={3}
                      xs={12}
                    >
                      <Budget />
                    </Grid>
                    <Grid
                      item
                      xl={3}
                      lg={3}
                      sm={6}
                      xs={12}
                    >
                      <TotalCustomers />
                    </Grid>
                    <Grid
                      item
                      xl={3}
                      lg={3}
                      sm={6}
                      xs={12}
                    >
                      <TasksProgress />
                    </Grid>
                    <Grid
                      item
                      xl={3}
                      lg={3}
                      sm={6}
                      xs={12}
                    >
                      <TotalProfit sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      lg={8}
                      md={12}
                      xl={9}
                      xs={12}
                    >
                      <Sales />
                    </Grid>
                    <Grid
                      item
                      lg={4}
                      md={6}
                      xl={3}
                      xs={12}
                    >
                      <TrafficByDevice sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      lg={4}
                      md={6}
                      xl={3}
                      xs={12}
                    >
                      <LatestProducts sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      lg={8}
                      md={12}
                      xl={9}
                      xs={12}
                    >
                      <LatestOrders />
                    </Grid> */}
                    <Grid
                      item
                      lg={12}
                      md={12}
                      xl={12}
                      xs={12}
                    >
                      <SalesByTime />
                    </Grid>
                    <Grid
                      item
                      lg={6}
                      md={6}
                      xl={6}
                      xs={6}
                    >
                      <SalesByGender sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      lg={6}
                      md={6}
                      xl={6}
                      xs={6}
                    >
                      <SalesByAge sx={{ height: '100%' }} />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </>
          );
}

Statistics.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Statistics;
