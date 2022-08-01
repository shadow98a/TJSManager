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

export const ReqInWarehouseListResults = ({ reqsInWarehouse, selectedReqInWarehouseIds,setSelectedReqInWarehouseIds,...rest }) => {
  // const [selectedReqInWarehouseIds, setSelectedReqInWarehouseIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedReqInWarehouseIds;

    if (event.target.checked) {
      newSelectedReqInWarehouseIds = reqsInWarehouse.map((reqInWarehouse) => JSON.stringify({reqNum:reqInWarehouse.reqNum}));
    } else {
      newSelectedReqInWarehouseIds = [];
    }

    setSelectedReqInWarehouseIds(newSelectedReqInWarehouseIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedReqInWarehouseIds.indexOf(id);
    let newSelectedReqInWarehouseIds = [];

    if (selectedIndex === -1) {
      newSelectedReqInWarehouseIds = newSelectedReqInWarehouseIds.concat(selectedReqInWarehouseIds, id);
    } else if (selectedIndex === 0) {
      newSelectedReqInWarehouseIds = newSelectedReqInWarehouseIds.concat(selectedReqInWarehouseIds.slice(1));
    } else if (selectedIndex === selectedReqInWarehouseIds.length - 1) {
      newSelectedReqInWarehouseIds = newSelectedReqInWarehouseIds.concat(selectedReqInWarehouseIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedReqInWarehouseIds = newSelectedReqInWarehouseIds.concat(
        selectedReqInWarehouseIds.slice(0, selectedIndex),
        selectedReqInWarehouseIds.slice(selectedIndex + 1)
      );
    }

    setSelectedReqInWarehouseIds(newSelectedReqInWarehouseIds);
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
                    checked={selectedReqInWarehouseIds.length === reqsInWarehouse.length}
                    color="primary"
                    indeterminate={
                      selectedReqInWarehouseIds.length > 0
                      && selectedReqInWarehouseIds.length < reqsInWarehouse.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  입고 신청 번호
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
              </TableRow>
            </TableHead>
            <TableBody>
              {reqsInWarehouse.slice(0, limit).map((reqInWarehouse) => (
                <TableRow
                  hover
                  key={JSON.stringify({reqNum:reqInWarehouse.reqNum})}
                  selected={selectedReqInWarehouseIds.indexOf(JSON.stringify({reqNum:reqInWarehouse.reqNum})) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedReqInWarehouseIds.indexOf(JSON.stringify({reqNum:reqInWarehouse.reqNum})) !== -1}
                      onChange={(event) => handleSelectOne(event, JSON.stringify({reqNum:reqInWarehouse.reqNum}))}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {reqInWarehouse.reqNum}
                  </TableCell>
                  <TableCell>
                    {reqInWarehouse.storeNum}
                  </TableCell>
                  <TableCell>
                  {reqInWarehouse.itemNum}
                  </TableCell>
                  <TableCell>
                    {reqInWarehouse.reqCnt}
                  </TableCell>
                  <TableCell>
                    {reqInWarehouse.reqDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={reqsInWarehouse.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ReqInWarehouseListResults.propTypes = {
  reqsInWarehouse: PropTypes.array.isRequired
};
