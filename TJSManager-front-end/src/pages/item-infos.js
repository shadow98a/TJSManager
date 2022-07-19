import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ItemInfoListResults } from '../components/itemInfo/itemInfo-list-results';
import { ItemInfoListToolbar } from '../components/itemInfo/itemInfo-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { itemInfos } from '../__mocks__/itemInfos';

const ItemInfos = () => (
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
        <ItemInfoListToolbar />
        <Box sx={{ mt: 3 }}>
          <ItemInfoListResults itemInfos={itemInfos} />
        </Box>
      </Container>
    </Box>
  </>
);
ItemInfos.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ItemInfos;
