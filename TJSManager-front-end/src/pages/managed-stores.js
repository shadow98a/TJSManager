import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ManagedStoreListResults } from '../components/managedStore/managedStore-list-results';
import { ManagedStoreListToolbar } from '../components/managedStore/managedStore-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
// import { managedStores } from '../__mocks__/managedStores';
import { useState,useEffect } from 'react';
import axios from 'axios';

const ManagedStores = () =>
{
  const [managedStores,setManagedStores]=useState([]);
  useEffect(()=>{axios.get('http://ec2-43-200-8-58.ap-northeast-2.compute.amazonaws.com:8080/item/info').then((response)=>{setItemInfos(response.data)})},[]);

  const [selectedManagedStoreIds, setSelectedManagedStoreIds] = useState([]);
  return  (
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
                <Container maxWidth={false}>
                  {/* <ManagedStoreListToolbar /> */}
                  <ManagedStoreListToolbar selectedManagedStoreIds={selectedManagedStoreIds}/>
                  <Box sx={{ mt: 3 }}>
                    {/* <ManagedStoreListResults managedStores={managedStores} /> */}
                    <ManagedStoreListResults managedStores={managedStores} selectedManagedStoreIds={selectedManagedStoreIds} setSelectedManagedStoreIds={setSelectedManagedStoreIds}/>
                  </Box>
                </Container>
              </Box>
            </>
          );
};
ManagedStores.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ManagedStores;
