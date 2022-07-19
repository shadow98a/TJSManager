import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { InWarehouseReportListResults } from '../components/inWarehouseReport/inWarehouseReport-list-results';
import { InWarehouseReportListToolbar } from '../components/inWarehouseReport/inWarehouseReport-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { inWarehouseReports } from '../__mocks__/inWarehouseReports';

const InWarehouseReports = () => (
  <>
    <Head>
      <title>
        모든 승인대기 입고 신청 이력 | TJSManager
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
        <InWarehouseReportListToolbar />
        <Box sx={{ mt: 3 }}>
          <InWarehouseReportListResults inWarehouseReports={inWarehouseReports} />
        </Box>
      </Container>
    </Box>
  </>
);
InWarehouseReports.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default InWarehouseReports;
