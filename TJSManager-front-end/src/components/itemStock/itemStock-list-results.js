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

// export const ItemStockListResults = ({ itemStocks, ...rest }) => {
export const ItemStockListResults = ({ itemStocks, selectedItemStockIds,setSelectedItemStockIds,searchKeyword,...rest }) => {
  // const [selectedItemStockIds, setSelectedItemStockIds] = useState([]);
  const searchedItemStocks=itemStocks.filter((itemStock)=>{return (itemStock.primaryKey.itemNum.itemNum==Number(searchKeyword)||itemStock.primaryKey.itemNum.itemName.includes(searchKeyword))||(itemStock.primaryKey.storeNum.storeNum==Number(searchKeyword)||itemStock.primaryKey.storeNum.storeName.includes(searchKeyword))||itemStock.inCnt==Number(searchKeyword)||itemStock.outCnt==Number(searchKeyword)||itemStock.dropCnt==Number(searchKeyword)||(itemStock.lot!==null&&itemStock.lot.includes(searchKeyword))||itemStock.sale==Number(searchKeyword)||(itemStock.event!==null&&itemStock.event.includes(searchKeyword));});
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedItemStockIds;

    if (event.target.checked) {
      newSelectedItemStockIds = searchedItemStocks.map((itemStock) => JSON.stringify({itemNum:itemStock.primaryKey.itemNum.itemNum,storeNum:itemStock.primaryKey.storeNum.storeNum}));
    } else {
      newSelectedItemStockIds = [];
    }

    setSelectedItemStockIds(newSelectedItemStockIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItemStockIds.indexOf(id);
    let newSelectedItemStockIds = [];

    if (selectedIndex === -1) {
      newSelectedItemStockIds = newSelectedItemStockIds.concat(selectedItemStockIds, id);
    } else if (selectedIndex === 0) {
      newSelectedItemStockIds = newSelectedItemStockIds.concat(selectedItemStockIds.slice(1));
    } else if (selectedIndex === selectedItemStockIds.length - 1) {
      newSelectedItemStockIds = newSelectedItemStockIds.concat(selectedItemStockIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItemStockIds = newSelectedItemStockIds.concat(
        selectedItemStockIds.slice(0, selectedIndex),
        selectedItemStockIds.slice(selectedIndex + 1)
      );
    }

    setSelectedItemStockIds(newSelectedItemStockIds);
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
                    checked={selectedItemStockIds.length === searchedItemStocks.length}
                    color="primary"
                    indeterminate={
                      selectedItemStockIds.length > 0
                      && selectedItemStockIds.length < searchedItemStocks.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  물품 번호
                </TableCell>
                <TableCell>
                  지점 번호
                </TableCell>
                <TableCell>
                  입고량
                </TableCell>
                <TableCell>
                  출고량
                </TableCell>
                <TableCell>
                  미판매량
                </TableCell>
                <TableCell>
                  진열 위치
                </TableCell>
                <TableCell>
                  할인율
                </TableCell>
                <TableCell>
                  행사 여부
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedItemStocks.slice(limit*page, limit*(page+1)).map((itemStock) => (
                <TableRow
                  hover
                  key={JSON.stringify({itemNum:itemStock.primaryKey.itemNum.itemNum,storeNum:itemStock.primaryKey.storeNum.storeNum})}
                  selected={selectedItemStockIds.indexOf(JSON.stringify({itemNum:itemStock.primaryKey.itemNum.itemNum,storeNum:itemStock.primaryKey.storeNum.storeNum})) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItemStockIds.indexOf(JSON.stringify({itemNum:itemStock.primaryKey.itemNum.itemNum,storeNum:itemStock.primaryKey.storeNum.storeNum})) !== -1}
                      onChange={(event) => handleSelectOne(event, JSON.stringify({itemNum:itemStock.primaryKey.itemNum.itemNum,storeNum:itemStock.primaryKey.storeNum.storeNum}))}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {itemStock.primaryKey.itemNum.itemNum+'('+itemStock.primaryKey.itemNum.itemName+')'}
                  </TableCell>
                  <TableCell>
                    {itemStock.primaryKey.storeNum.storeNum+'('+itemStock.primaryKey.storeNum.storeName+')'}
                  </TableCell>
                  <TableCell>
                    {itemStock.inCnt}
                  </TableCell>
                  <TableCell>
                    {itemStock.outCnt}
                  </TableCell>
                  <TableCell>
                    {itemStock.dropCnt}
                  </TableCell>
                  <TableCell>
                    {itemStock.lot}
                  </TableCell>
                  <TableCell>
                    {itemStock.sale}
                  </TableCell>
                  <TableCell>
                    {itemStock.event}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={searchedItemStocks.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ItemStockListResults.propTypes = {
  searchedItemStocks: PropTypes.array.isRequired
};
