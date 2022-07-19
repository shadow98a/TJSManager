import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { MembershipCustomerListResults } from '../components/membershipCustomer/membershipCustomer-list-results';
import { MembershipCustomerListToolbar } from '../components/membershipCustomer/membershipCustomer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { membershipCustomers } from '../__mocks__/membershipCustomers';

const MembershipCustomers = () => (
  <>
    <Head>
      <title>
        고객 기본 정보 | TJSManager
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
        <MembershipCustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <MembershipCustomerListResults membershipCustomers={membershipCustomers} />
        </Box>
      </Container>
    </Box>
  </>
);
MembershipCustomers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default MembershipCustomers;
