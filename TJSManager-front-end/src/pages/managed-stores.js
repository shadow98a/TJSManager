import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ManagedStoreListResults } from '../components/managedStore/managedStore-list-results';
import { ManagedStoreListToolbar } from '../components/managedStore/managedStore-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
// import { managedStores } from '../__mocks__/managedStores';
import {useState} from 'react';
import axios from 'axios';
import {domain} from '../api/restful-api';

const ManagedStores = () =>
{
  const [managedStores,setManagedStores]=useState([]);
  axios.get(domain+'/managed_store').then((response)=>{setManagedStores(response.data);});
  const [selectedManagedStoreIds, setSelectedManagedStoreIds] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  
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
                  <ManagedStoreListToolbar selectedManagedStoreIds={selectedManagedStoreIds} setSearchKeyword={setSearchKeyword}/>
                  <Box sx={{ mt: 3 }}>
                    {/* <ManagedStoreListResults managedStores={managedStores} /> */}
                    <ManagedStoreListResults managedStores={managedStores} selectedManagedStoreIds={selectedManagedStoreIds} setSelectedManagedStoreIds={setSelectedManagedStoreIds} searchKeyword={searchKeyword}/>
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
