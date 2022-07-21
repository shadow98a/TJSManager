import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
// import { ItemInfoProfile } from '../components/itemInfo/itemInfo-profile';
import { ItemInfoProfileDetails } from '../components/itemInfo/itemInfo-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';

const ItemInfo = () => (
  <>
    <Head>
      <title>
        상품 | TJSManager
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
          상품
        </Typography>
        <ItemInfoProfileDetails />
      </Container>
    </Box>
  </>
);

ItemInfo.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ItemInfo;
