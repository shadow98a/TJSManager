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

export const MembershipCustomerRecordListResults = ({ membershipCustomerRecords, ...rest }) => {
  const [selectedMembershipCustomerRecordIds, setSelectedMembershipCustomerRecordIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedMembershipCustomerRecordIds;

    if (event.target.checked) {
      newSelectedMembershipCustomerRecordIds = membershipCustomerRecords.map((membershipCustomerRecord) => membershipCustomerRecord.itemNum);
    } else {
      newSelectedMembershipCustomerRecordIds = [];
    }

    setSelectedMembershipCustomerRecordIds(newSelectedMembershipCustomerRecordIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedMembershipCustomerRecordIds.indexOf(id);
    let newSelectedMembershipCustomerRecordIds = [];

    if (selectedIndex === -1) {
      newSelectedMembershipCustomerRecordIds = newSelectedMembershipCustomerRecordIds.concat(selectedMembershipCustomerRecordIds, id);
    } else if (selectedIndex === 0) {
      newSelectedMembershipCustomerRecordIds = newSelectedMembershipCustomerRecordIds.concat(selectedMembershipCustomerRecordIds.slice(1));
    } else if (selectedIndex === selectedMembershipCustomerRecordIds.length - 1) {
      newSelectedMembershipCustomerRecordIds = newSelectedMembershipCustomerRecordIds.concat(selectedMembershipCustomerRecordIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedMembershipCustomerRecordIds = newSelectedMembershipCustomerRecordIds.concat(
        selectedMembershipCustomerRecordIds.slice(0, selectedIndex),
        selectedMembershipCustomerRecordIds.slice(selectedIndex + 1)
      );
    }

    setSelectedMembershipCustomerRecordIds(newSelectedMembershipCustomerRecordIds);
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
                    checked={selectedMembershipCustomerRecordIds.length === membershipCustomerRecords.length}
                    color="primary"
                    indeterminate={
                      selectedMembershipCustomerRecordIds.length > 0
                      && selectedMembershipCustomerRecordIds.length < membershipCustomerRecords.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  멤버쉽 고객 번호
                </TableCell>
                <TableCell>
                  판매(구매) 번호
                </TableCell>
                <TableCell>
                  사용한 포인트
                </TableCell>
                <TableCell>
                  획득한 포인트
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {membershipCustomerRecords.slice(0, limit).map((membershipCustomerRecord) => (
                <TableRow
                  hover
                  key={membershipCustomerRecord.itemNum}
                  selected={selectedMembershipCustomerRecordIds.indexOf(membershipCustomerRecord.itemNum) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedMembershipCustomerRecordIds.indexOf(membershipCustomerRecord.itemNum) !== -1}
                      onChange={(event) => handleSelectOne(event, membershipCustomerRecord.itemNum)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {membershipCustomerRecord.customerNum}
                  </TableCell>
                  <TableCell>
                    {membershipCustomerRecord.salesNum}
                  </TableCell>
                  <TableCell>
                    {membershipCustomerRecord.usedPoint}
                  </TableCell>
                  <TableCell>
                    {membershipCustomerRecord.savePoint}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={membershipCustomerRecords.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MembershipCustomerRecordListResults.propTypes = {
  membershipCustomerRecords: PropTypes.array.isRequired
};
