import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ItemStockListResults } from '../components/itemStock/itemStock-list-results';
import { ItemStockListToolbar } from '../components/itemStock/itemStock-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
// import { itemStocks } from '../__mocks__/itemStocks';
import {useState} from 'react';
import axios from 'axios';
import {domain} from '../api/restful-api';

const ItemStocks = () =>
{
  const [itemStocks,setItemStocks]=useState([]);
  axios.get(domain+'/item/stock').then((response)=>{setItemStocks(response.data);});

  const [selectedItemStockIds, setSelectedItemStockIds] = useState([]);
  
  return  (
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
                <Container maxWidth={false}>
                  {/* <ItemStockListToolbar /> */}
                  <ItemStockListToolbar selectedItemStockIds={selectedItemStockIds}/>
                  <Box sx={{ mt: 3 }}>
                    {/* <ItemStockListResults itemStocks={itemStocks} /> */}
                    <ItemStockListResults itemStocks={itemStocks} selectedItemStockIds={selectedItemStockIds} setSelectedItemStockIds={setSelectedItemStockIds}/>
                  </Box>
                </Container>
              </Box>
            </>
          );
};
ItemStocks.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ItemStocks;
