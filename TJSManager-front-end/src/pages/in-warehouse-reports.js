import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { InWarehouseReportListResults } from '../components/inWarehouseReport/inWarehouseReport-list-results';
import { InWarehouseReportListToolbar } from '../components/inWarehouseReport/inWarehouseReport-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
// import { inWarehouseReports } from '../__mocks__/inWarehouseReports';
import { useState,useEffect } from 'react';
import axios from 'axios';

const InWarehouseReports = () =>
{
  const [inWarehouseReports,setInWarehouseReports]=useState([]);
  useEffect(()=>{axios.get('http://ec2-43-200-8-58.ap-northeast-2.compute.amazonaws.com:8080/item/in_warehouse_report').then((response)=>{setInWarehouseReports(response.data)})},[]);

  const [selectedInWarehouseReportIds, setSelectedInWarehouseReportIds] = useState([]);
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
                  {/* <InWarehouseReportListToolbar /> */}
                  <InWarehouseReportListToolbar selectedInWarehouseReportIds={selectedInWarehouseReportIds}/>
                  <Box sx={{ mt: 3 }}>
                    {/* <InWarehouseReportListResults inWarehouseReports={inWarehouseReports} /> */}
                    <InWarehouseReportListResults inWarehouseReports={inWarehouseReports} selectedInWarehouseReportIds={selectedInWarehouseReportIds} setSelectedInWarehouseReportIds={setSelectedInWarehouseReportIds}/>
                  </Box>
                </Container>
              </Box>
            </>
          );
};
InWarehouseReports.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default InWarehouseReports;
