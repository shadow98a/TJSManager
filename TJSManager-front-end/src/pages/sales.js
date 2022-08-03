import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { SalesProfile } from '../components/sales/sales-profile';
import { SalesProfileDetails } from '../components/sales/sales-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import {useState} from 'react';

const Sales = () =>
{
  const [salesCnts,setSalesCnts]=useState({});
  const [pointToUse,setPointToUse]=useState(0);
  
  return  (
            <>
              <Head>
                <title>
                  판매 | TJSManager
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
                    판매
                  </Typography>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      lg={4}
                      md={6}
                      xs={12}
                    >
                      {/* <SalesProfile /> */}
                      <SalesProfile salesCnts={salesCnts}  pointToUse={pointToUse}/>
                    </Grid>
                    <Grid
                      item
                      lg={8}
                      md={6}
                      xs={12}
                    >
                      {/* <SalesProfileDetails /> */}
                      <SalesProfileDetails salesCnts={salesCnts} setSalesCnts={setSalesCnts} pointToUse={pointToUse} setPointToUse={setPointToUse}/>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </>
          );
}

Sales.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Sales;
