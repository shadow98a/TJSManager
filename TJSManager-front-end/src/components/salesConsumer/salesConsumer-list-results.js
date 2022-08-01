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

export const SalesConsumerListResults = ({ salesConsumers, ...rest }) => {
  const [selectedSalesConsumerIds, setSelectedSalesConsumerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedSalesConsumerIds;

    if (event.target.checked) {
      newSelectedSalesConsumerIds = salesConsumers.map((salesConsumer) => salesConsumer.salesNum);
    } else {
      newSelectedSalesConsumerIds = [];
    }

    setSelectedSalesConsumerIds(newSelectedSalesConsumerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSalesConsumerIds.indexOf(id);
    let newSelectedSalesConsumerIds = [];

    if (selectedIndex === -1) {
      newSelectedSalesConsumerIds = newSelectedSalesConsumerIds.concat(selectedSalesConsumerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedSalesConsumerIds = newSelectedSalesConsumerIds.concat(selectedSalesConsumerIds.slice(1));
    } else if (selectedIndex === selectedSalesConsumerIds.length - 1) {
      newSelectedSalesConsumerIds = newSelectedSalesConsumerIds.concat(selectedSalesConsumerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedSalesConsumerIds = newSelectedSalesConsumerIds.concat(
        selectedSalesConsumerIds.slice(0, selectedIndex),
        selectedSalesConsumerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedSalesConsumerIds(newSelectedSalesConsumerIds);
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
                    checked={selectedSalesConsumerIds.length === salesConsumers.length}
                    color="primary"
                    indeterminate={
                      selectedSalesConsumerIds.length > 0
                      && selectedSalesConsumerIds.length < salesConsumers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  판매 번호
                </TableCell>
                <TableCell>
                  구매자 성별
                </TableCell>
                <TableCell>
                  구매자 나이대
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesConsumers.slice(0, limit).map((salesConsumer) => (
                <TableRow
                  hover
                  key={salesConsumer.salesNum}
                  selected={selectedSalesConsumerIds.indexOf(salesConsumer.salesNum) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSalesConsumerIds.indexOf(salesConsumer.salesNum) !== -1}
                      onChange={(event) => handleSelectOne(event, salesConsumer.salesNum)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {salesConsumer.salesNum}
                  </TableCell>
                  <TableCell>
                    {salesConsumer.consumerGender}
                  </TableCell>
                  <TableCell>
                    {salesConsumer.consumerAge}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={salesConsumers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

SalesConsumerListResults.propTypes = {
  salesConsumers: PropTypes.array.isRequired
};
