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

// export const ManagedStoreListResults = ({ managedStores, ...rest }) => {
export const ManagedStoreListResults = ({ managedStores, selectedManagedStoreIds,setSelectedManagedStoreIds,searchKeyword,...rest }) => {
  // const [selectedManagedStoreIds, setSelectedManagedStoreIds] = useState([]);
  const searchedManagedStores=managedStores.filter((managedStore)=>{return managedStore.storeNum==Number(searchKeyword)||managedStore.storePassword.includes(searchKeyword)||managedStore.storeName.includes(searchKeyword)||managedStore.storeAddress.includes(searchKeyword)||managedStore.storeTelNum.includes(searchKeyword);});
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedManagedStoreIds;

    if (event.target.checked) {
      newSelectedManagedStoreIds = searchedManagedStores.map((managedStore) => JSON.stringify({storeNum:managedStore.storeNum}));
    } else {
      newSelectedManagedStoreIds = [];
    }

    setSelectedManagedStoreIds(newSelectedManagedStoreIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedManagedStoreIds.indexOf(id);
    let newSelectedManagedStoreIds = [];

    if (selectedIndex === -1) {
      newSelectedManagedStoreIds = newSelectedManagedStoreIds.concat(selectedManagedStoreIds, id);
    } else if (selectedIndex === 0) {
      newSelectedManagedStoreIds = newSelectedManagedStoreIds.concat(selectedManagedStoreIds.slice(1));
    } else if (selectedIndex === selectedManagedStoreIds.length - 1) {
      newSelectedManagedStoreIds = newSelectedManagedStoreIds.concat(selectedManagedStoreIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedManagedStoreIds = newSelectedManagedStoreIds.concat(
        selectedManagedStoreIds.slice(0, selectedIndex),
        selectedManagedStoreIds.slice(selectedIndex + 1)
      );
    }

    setSelectedManagedStoreIds(newSelectedManagedStoreIds);
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
                    checked={selectedManagedStoreIds.length === searchedManagedStores.length}
                    color="primary"
                    indeterminate={
                      selectedManagedStoreIds.length > 0
                      && selectedManagedStoreIds.length < searchedManagedStores.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  지점 번호
                </TableCell>
                <TableCell>
                  지점 로그인을 위한 비밀번호
                </TableCell>
                <TableCell>
                  지점명
                </TableCell>
                <TableCell>
                  지점 주소
                </TableCell>
                <TableCell>
                  지점 연락처
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedManagedStores.slice(limit*page, limit*(page+1)).map((managedStore) => (
                <TableRow
                  hover
                  key={JSON.stringify({storeNum:managedStore.storeNum})}
                  selected={selectedManagedStoreIds.indexOf(JSON.stringify({storeNum:managedStore.storeNum})) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedManagedStoreIds.indexOf(JSON.stringify({storeNum:managedStore.storeNum})) !== -1}
                      onChange={(event) => handleSelectOne(event, JSON.stringify({storeNum:managedStore.storeNum}))}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {managedStore.storeNum}
                  </TableCell>
                  <TableCell>
                    {managedStore.storePassword}
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
                        {managedStore.storeName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {managedStore.storeAddress}
                  </TableCell>
                  <TableCell>
                    {managedStore.storeTelNum}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={searchedManagedStores.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ManagedStoreListResults.propTypes = {
  searchedManagedStores: PropTypes.array.isRequired
};
