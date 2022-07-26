import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { MembershipCustomerListResults } from '../components/membershipCustomer/membershipCustomer-list-results';
import { MembershipCustomerListToolbar } from '../components/membershipCustomer/membershipCustomer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
// import { membershipCustomers } from '../__mocks__/membershipCustomers';
import { useState,useEffect } from 'react';
import axios from 'axios';

const MembershipCustomers = () =>
{
  const [membershipCustomers,setMembershipCustomers]=useState([]);
  useEffect(()=>{axios.get('http://ec2-43-200-8-58.ap-northeast-2.compute.amazonaws.com:8080/membership/customer').then((response)=>{setMembershipCustomers(response.data)})},[]);

  const [selectedMembershipCustomerIds, setSelectedMembershipCustomerIds] = useState([]);
  return  (
            <>
              <Head>
                <title>
                  멤버쉽 고객 기본 정보 | TJSManager
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
                  {/* <MembershipCustomerListToolbar /> */}
                  <MembershipCustomerListToolbar selectedMembershipCustomerIds={selectedMembershipCustomerIds}/>
                  <Box sx={{ mt: 3 }}>
                    {/* <MembershipCustomerListResults membershipCustomers={membershipCustomers} /> */}
                    <MembershipCustomerListResults membershipCustomers={membershipCustomers} selectedMembershipCustomerIds={selectedMembershipCustomerIds} setSelectedMembershipCustomerIds={setSelectedMembershipCustomerIds}/>
                  </Box>
                </Container>
              </Box>
            </>
          );
};
MembershipCustomers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default MembershipCustomers;
