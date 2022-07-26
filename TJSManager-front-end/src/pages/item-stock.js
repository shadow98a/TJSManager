import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
// import { ItemStockProfile } from '../components/itemStock/itemStock-profile';
import { ItemStockProfileDetails } from '../components/itemStock/itemStock-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';

const ItemStock = () => (
  <>
    <Head>
      <title>
        재고 현황 | TJSManager
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
          재고 현황
        </Typography>
        <ItemStockProfileDetails />
      </Container>
    </Box>
  </>
);

ItemStock.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ItemStock;
