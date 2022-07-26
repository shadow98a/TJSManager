import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const InWarehouseReportListResults = ({ inWarehouseReports, selectedInWarehouseReportIds,setSelectedInWarehouseReportIds,...rest }) => {
  // const [selectedInWarehouseReportIds, setSelectedInWarehouseReportIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedInWarehouseReportIds;

    if (event.target.checked) {
      newSelectedInWarehouseReportIds = inWarehouseReports.map((inWarehouseReport) => JSON.stringify({reportNum:inWarehouseReport.reportNum}));
    } else {
      newSelectedInWarehouseReportIds = [];
    }

    setSelectedInWarehouseReportIds(newSelectedInWarehouseReportIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedInWarehouseReportIds.indexOf(id);
    let newSelectedInWarehouseReportIds = [];

    if (selectedIndex === -1) {
      newSelectedInWarehouseReportIds = newSelectedInWarehouseReportIds.concat(selectedInWarehouseReportIds, id);
    } else if (selectedIndex === 0) {
      newSelectedInWarehouseReportIds = newSelectedInWarehouseReportIds.concat(selectedInWarehouseReportIds.slice(1));
    } else if (selectedIndex === selectedInWarehouseReportIds.length - 1) {
      newSelectedInWarehouseReportIds = newSelectedInWarehouseReportIds.concat(selectedInWarehouseReportIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedInWarehouseReportIds = newSelectedInWarehouseReportIds.concat(
        selectedInWarehouseReportIds.slice(0, selectedIndex),
        selectedInWarehouseReportIds.slice(selectedIndex + 1)
      );
    }

    setSelectedInWarehouseReportIds(newSelectedInWarehouseReportIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedInWarehouseReportIds.length === inWarehouseReports.length}
                    color="primary"
                    indeterminate={
                      selectedInWarehouseReportIds.length > 0
                      && selectedInWarehouseReportIds.length < inWarehouseReports.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  입고 신청서 번호
                </TableCell>
                <TableCell>
                  입고 신청한 지점 번호
                </TableCell>
                <TableCell>
                  물품 번호
                </TableCell>
                <TableCell>
                  입고 요청 수량
                </TableCell>
                <TableCell>
                  입고 요청일
                </TableCell>
                <TableCell>
                  신청서 작성자 번호
                </TableCell>
                <TableCell>
                  점장 승인일
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inWarehouseReports.slice(limit*page, limit*(page+1)).map((inWarehouseReport) => (
                <TableRow
                  hover
                  key={JSON.stringify({reportNum:inWarehouseReport.reportNum})}
                  selected={selectedInWarehouseReportIds.indexOf(JSON.stringify({reportNum:inWarehouseReport.reportNum})) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedInWarehouseReportIds.indexOf(JSON.stringify({reportNum:inWarehouseReport.reportNum})) !== -1}
                      onChange={(event) => handleSelectOne(event, JSON.stringify({reportNum:inWarehouseReport.reportNum}))}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {inWarehouseReport.reportNum}
                  </TableCell>
                  <TableCell>
                    {inWarehouseReport.storeNum.storeNum+'('+inWarehouseReport.storeNum.storeName+')'}
                  </TableCell>
                  <TableCell>
                    {inWarehouseReport.itemNum.itemNum+'('+inWarehouseReport.itemNum.itemName+')'}
                  </TableCell>
                  <TableCell>
                    {inWarehouseReport.reqCnt}
                  </TableCell>
                  <TableCell>
                    {inWarehouseReport.reqDate}
                  </TableCell>
                  <TableCell>
                    {inWarehouseReport.writerNum.empNum+'('+inWarehouseReport.writerNum.name+')'}
                  </TableCell>
                  <TableCell>
                    {inWarehouseReport.approvedDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={inWarehouseReports.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

InWarehouseReportListResults.propTypes = {
  inWarehouseReports: PropTypes.array.isRequired
};
