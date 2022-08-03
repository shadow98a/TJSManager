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

export const SalesRecordListResults = ({ salesRecords, ...rest }) => {
  const [selectedSalesRecordIds, setSelectedSalesRecordIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedSalesRecordIds;

    if (event.target.checked) {
      newSelectedSalesRecordIds = salesRecords.map((salesRecord) => JSON.stringify([salesRecord.salesNum,salesRecord.itemNum]));
    } else {
      newSelectedSalesRecordIds = [];
    }

    setSelectedSalesRecordIds(newSelectedSalesRecordIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSalesRecordIds.indexOf(id);
    let newSelectedSalesRecordIds = [];

    if (selectedIndex === -1) {
      newSelectedSalesRecordIds = newSelectedSalesRecordIds.concat(selectedSalesRecordIds, id);
    } else if (selectedIndex === 0) {
      newSelectedSalesRecordIds = newSelectedSalesRecordIds.concat(selectedSalesRecordIds.slice(1));
    } else if (selectedIndex === selectedSalesRecordIds.length - 1) {
      newSelectedSalesRecordIds = newSelectedSalesRecordIds.concat(selectedSalesRecordIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedSalesRecordIds = newSelectedSalesRecordIds.concat(
        selectedSalesRecordIds.slice(0, selectedIndex),
        selectedSalesRecordIds.slice(selectedIndex + 1)
      );
    }

    setSelectedSalesRecordIds(newSelectedSalesRecordIds);
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
                    checked={selectedSalesRecordIds.length === salesRecords.length}
                    color="primary"
                    indeterminate={
                      selectedSalesRecordIds.length > 0
                      && selectedSalesRecordIds.length < salesRecords.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  판매 번호
                </TableCell>
                <TableCell>
                  판매 물품 번호
                </TableCell>
                <TableCell>
                  지점 번호
                </TableCell>
                <TableCell>
                  판매 일시
                </TableCell>
                <TableCell>
                  판매 개수
                </TableCell>
                <TableCell>
                  판매 메모
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesRecords.slice(0, limit).map((salesRecord) => (
                <TableRow
                  hover
                  key={JSON.stringify([salesRecord.salesNum,salesRecord.itemNum])}
                  selected={selectedSalesRecordIds.indexOf(JSON.stringify([salesRecord.salesNum,salesRecord.itemNum])) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSalesRecordIds.indexOf(JSON.stringify([salesRecord.salesNum,salesRecord.itemNum])) !== -1}
                      onChange={(event) => handleSelectOne(event, JSON.stringify([salesRecord.salesNum,salesRecord.itemNum]))}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {salesRecord.salesNum}
                  </TableCell>
                  <TableCell>
                    {salesRecord.itemNum}
                  </TableCell>
                  <TableCell>
                    {salesRecord.storeNum}
                  </TableCell>
                  <TableCell>
                    {salesRecord.salesDate}
                  </TableCell>
                  <TableCell>
                    {salesRecord.salesCnt}
                  </TableCell>
                  <TableCell>
                    {salesRecord.memo}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={salesRecords.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

SalesRecordListResults.propTypes = {
  salesRecords: PropTypes.array.isRequired
};
