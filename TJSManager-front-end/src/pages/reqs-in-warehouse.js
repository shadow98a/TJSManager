import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ReqInWarehouseListResults } from '../components/reqInWarehouse/reqInWarehouse-list-results';
import { ReqInWarehouseListToolbar } from '../components/reqInWarehouse/reqInWarehouse-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { reqsInWarehouse } from '../__mocks__/reqsInWarehouse';
import { useState } from 'react';

// const ReqsInWarehouse = () => (
const ReqsInWarehouse = () =>
{
  const [selectedReqInWarehouseIds, setSelectedReqInWarehouseIds] = useState([]);
  return  (
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
                <Container maxWidth={false}>
                  {/* <ReqInWarehouseListToolbar /> */}
                  <ReqInWarehouseListToolbar selectedReqInWarehouseIds={selectedReqInWarehouseIds}/>
                  <Box sx={{ mt: 3 }}>
                    {/* <ReqInWarehouseListResults reqsInWarehouse={reqsInWarehouse} /> */}
                    <ReqInWarehouseListResults reqsInWarehouse={reqsInWarehouse} selectedReqInWarehouseIds={selectedReqInWarehouseIds} setSelectedReqInWarehouseIds={setSelectedReqInWarehouseIds}/>
                  </Box>
                </Container>
              </Box>
            </>
          );
};
ReqsInWarehouse.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ReqsInWarehouse;
