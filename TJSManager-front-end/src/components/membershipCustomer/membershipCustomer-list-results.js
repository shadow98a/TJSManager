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

// export const MembershipCustomerListResults = ({ membershipCustomers, ...rest }) => {
export const MembershipCustomerListResults = ({ membershipCustomers, selectedMembershipCustomerIds,setSelectedMembershipCustomerIds,searchKeyword,...rest }) => {
  // const [selectedMembershipCustomerIds, setSelectedMembershipCustomerIds] = useState([]);
  const searchedMembershipCustomers=membershipCustomers.filter((membershipCustomer)=>{return membershipCustomer.customerNum==Number(searchKeyword)||membershipCustomer.customerName.includes(searchKeyword)||membershipCustomer.customerBirthDate.includes(searchKeyword)||membershipCustomer.customerGender.includes(searchKeyword)||membershipCustomer.customerPhoneNum.includes(searchKeyword)||membershipCustomer.point==Number(searchKeyword)||(membershipCustomer.joinedStoreNum.storeNum==Number(searchKeyword)||membershipCustomer.joinedStoreNum.storeName.includes(searchKeyword));});
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedMembershipCustomerIds;

    if (event.target.checked) {
      newSelectedMembershipCustomerIds = searchedMembershipCustomers.map((membershipCustomer) => JSON.stringify({customerNum:membershipCustomer.customerNum}));
    } else {
      newSelectedMembershipCustomerIds = [];
    }

    setSelectedMembershipCustomerIds(newSelectedMembershipCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedMembershipCustomerIds.indexOf(id);
    let newSelectedMembershipCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedMembershipCustomerIds = newSelectedMembershipCustomerIds.concat(selectedMembershipCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedMembershipCustomerIds = newSelectedMembershipCustomerIds.concat(selectedMembershipCustomerIds.slice(1));
    } else if (selectedIndex === selectedMembershipCustomerIds.length - 1) {
      newSelectedMembershipCustomerIds = newSelectedMembershipCustomerIds.concat(selectedMembershipCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedMembershipCustomerIds = newSelectedMembershipCustomerIds.concat(
        selectedMembershipCustomerIds.slice(0, selectedIndex),
        selectedMembershipCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedMembershipCustomerIds(newSelectedMembershipCustomerIds);
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
                    checked={selectedMembershipCustomerIds.length === searchedMembershipCustomers.length}
                    color="primary"
                    indeterminate={
                      selectedMembershipCustomerIds.length > 0
                      && selectedMembershipCustomerIds.length < searchedMembershipCustomers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  멤버쉽 고객 번호
                </TableCell>
                <TableCell>
                  고객 이름
                </TableCell>
                <TableCell>
                  고객 생년월일
                </TableCell>
                <TableCell>
                  고객 성별
                </TableCell>
                <TableCell>
                  고객 연락처
                </TableCell>
                <TableCell>
                  고객 소지 포인트
                </TableCell>
                <TableCell>
                  고객이 가입한 지점 번호
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedMembershipCustomers.slice(limit*page, limit*(page+1)).map((membershipCustomer) => (
                <TableRow
                  hover
                  key={JSON.stringify({customerNum:membershipCustomer.customerNum})}
                  selected={selectedMembershipCustomerIds.indexOf(JSON.stringify({customerNum:membershipCustomer.customerNum})) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedMembershipCustomerIds.indexOf(JSON.stringify({customerNum:membershipCustomer.customerNum})) !== -1}
                      onChange={(event) => handleSelectOne(event, JSON.stringify({customerNum:membershipCustomer.customerNum}))}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {membershipCustomer.customerNum}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {membershipCustomer.customerName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {membershipCustomer.customerBirthDate}
                  </TableCell>
                  <TableCell>
                    {membershipCustomer.customerGender}
                  </TableCell>
                  <TableCell>
                    {membershipCustomer.customerPhoneNum}
                  </TableCell>
                  <TableCell>
                    {membershipCustomer.point}
                  </TableCell>
                  <TableCell>
                    {membershipCustomer.joinedStoreNum.storeNum+'('+membershipCustomer.joinedStoreNum.storeName+')'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={searchedMembershipCustomers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MembershipCustomerListResults.propTypes = {
  searchedMembershipCustomers: PropTypes.array.isRequired
};
