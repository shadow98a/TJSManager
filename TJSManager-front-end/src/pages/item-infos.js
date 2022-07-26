import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ItemInfoListResults } from '../components/itemInfo/itemInfo-list-results';
import { ItemInfoListToolbar } from '../components/itemInfo/itemInfo-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
// import { itemInfos } from '../__mocks__/itemInfos';
import { useState,useEffect } from 'react';
import axios from 'axios';

const ItemInfos = () =>
{
  const [itemInfos,setItemInfos]=useState([]);
  useEffect(()=>{axios.get('http://ec2-43-200-8-58.ap-northeast-2.compute.amazonaws.com:8080/item/info').then((response)=>{setItemInfos(response.data)})},[]);

  const [selectedItemInfoIds, setSelectedItemInfoIds] = useState([]);
  return  (
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
                <Container maxWidth={false}>
                  {/* <ItemInfoListToolbar /> */}
                  <ItemInfoListToolbar selectedItemInfoIds={selectedItemInfoIds}/>
                  <Box sx={{ mt: 3 }}>
                    {/* <ItemInfoListResults itemInfos={itemInfos} /> */}
                    <ItemInfoListResults itemInfos={itemInfos} selectedItemInfoIds={selectedItemInfoIds} setSelectedItemInfoIds={setSelectedItemInfoIds}/>
                  </Box>
                </Container>
              </Box>
            </>
          );
};
ItemInfos.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ItemInfos;
