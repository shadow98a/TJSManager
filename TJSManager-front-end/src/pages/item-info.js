import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
// import { ItemInfoProfile } from '../components/itemInfo/itemInfo-profile';
import { ItemInfoProfileDetails } from '../components/itemInfo/itemInfo-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';

const ItemInfo = () => (
  <>
    <Head>
      <title>
        모든 상품 | TJSManager
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
          모든 상품
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
            <ItemInfoProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          > */}
            <ItemInfoProfileDetails />
          {/* </Grid>
        </Grid> */}
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
