import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { MembershipCustomerRecordListResults } from '../components/membershipCustomerRecord/membershipCustomerRecord-list-results';
import { MembershipCustomerRecordListToolbar } from '../components/membershipCustomerRecord/membershipCustomerRecord-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { membershipCustomerRecords } from '../__mocks__/membershipCustomerRecords';

const MembershipCustomerRecords = () => (
  <>
    <Head>
      <title>
        멤버쉽 고객 구매 이력 | TJSManager
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
        <MembershipCustomerRecordListToolbar />
        <Box sx={{ mt: 3 }}>
          <MembershipCustomerRecordListResults membershipCustomerRecords={membershipCustomerRecords} />
        </Box>
      </Container>
    </Box>
  </>
);
MembershipCustomerRecords.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default MembershipCustomerRecords;
