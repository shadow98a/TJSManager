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

export const ItemInfoListResults = ({ itemInfos, ...rest }) => {
  const [selectedItemInfoIds, setSelectedItemInfoIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedItemInfoIds;

    if (event.target.checked) {
      newSelectedItemInfoIds = itemInfos.map((itemInfo) => itemInfo.itemNum);
    } else {
      newSelectedItemInfoIds = [];
    }

    setSelectedItemInfoIds(newSelectedItemInfoIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItemInfoIds.indexOf(id);
    let newSelectedItemInfoIds = [];

    if (selectedIndex === -1) {
      newSelectedItemInfoIds = newSelectedItemInfoIds.concat(selectedItemInfoIds, id);
    } else if (selectedIndex === 0) {
      newSelectedItemInfoIds = newSelectedItemInfoIds.concat(selectedItemInfoIds.slice(1));
    } else if (selectedIndex === selectedItemInfoIds.length - 1) {
      newSelectedItemInfoIds = newSelectedItemInfoIds.concat(selectedItemInfoIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItemInfoIds = newSelectedItemInfoIds.concat(
        selectedItemInfoIds.slice(0, selectedIndex),
        selectedItemInfoIds.slice(selectedIndex + 1)
      );
    }

    setSelectedItemInfoIds(newSelectedItemInfoIds);
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
                    checked={selectedItemInfoIds.length === itemInfos.length}
                    color="primary"
                    indeterminate={
                      selectedItemInfoIds.length > 0
                      && selectedItemInfoIds.length < itemInfos.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  제품 번호
                </TableCell>
                <TableCell>
                  제품명
                </TableCell>
                <TableCell>
                  물품 분류
                </TableCell>
                <TableCell>
                  소비자판매가
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemInfos.slice(0, limit).map((itemInfo) => (
                <TableRow
                  hover
                  key={itemInfo.itemNum}
                  selected={selectedItemInfoIds.indexOf(itemInfo.itemNum) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItemInfoIds.indexOf(itemInfo.itemNum) !== -1}
                      onChange={(event) => handleSelectOne(event, itemInfo.itemNum)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {itemInfo.itemNum}
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
                        {itemInfo.itemName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {itemInfo.type}
                  </TableCell>
                  <TableCell>
                    {itemInfo.consumerPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={itemInfos.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ItemInfoListResults.propTypes = {
  itemInfos: PropTypes.array.isRequired
};
