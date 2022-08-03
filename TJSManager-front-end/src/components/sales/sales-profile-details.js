import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { domain } from '../../api/restful-api';
import { membershipCustomerRecords } from 'src/__mocks__/membershipCustomerRecords';

const consumerGenders = [
  {
    value: '',
    label: ''
  },
  {
    value: 'm',
    label: 'm'
  },
  {
    value: 'f',
    label: 'f'
  },
];
const consumerAges = [
  {
    value: '',
    label: ''
  },
  {
    value: '0',
    label: '10대 미만'
  },
  {
    value: '1',
    label: '10대'
  },
  {
    value: '2',
    label: '20대'
  },
  {
    value: '3',
    label: '30대'
  },
  {
    value: '4',
    label: '40대'
  },
  {
    value: '5',
    label: '50대'
  },
  {
    value: '6',
    label: '60대'
  },
  {
    value: '7',
    label: '70대 이상'
  }
];

// export const SalesProfileDetails = (props) => {
export const SalesProfileDetails = ({ salesCnts, setSalesCnts, pointToUse, setPointToUse, ...props }) => {
  const [customerNums, setCustomerNums] = useState([]);
  function getCustomerNums() {
    axios.get(domain + '/membership/customer').
      then
      (
        (response) => {
          const customerNums = [];
          customerNums.push({ value: '', label: '' });
          for (const membershipCustomer of response.data) {
            customerNums.push({ value: membershipCustomer.customerNum, label: membershipCustomer.customerNum + '(' + membershipCustomer.customerName + ')' });
          }

          setCustomerNums(customerNums);
        }
      );
  }
  getCustomerNums();

  const [itemNums, setItemNums] = useState([]);
  function getItemNums() {
    axios.get(domain + '/item/stock').
      then
      (
        (response) => {
          const itemNums = [];
          itemNums.push({ value: '', label: '' });
          const employee = JSON.parse(sessionStorage.getItem('employee'));
          for (const itemStock of response.data) {
            if (itemStock.primaryKey.storeNum.storeNum == employee.storeNum.storeNum) {
              itemNums.push({ value: itemStock.primaryKey.itemNum.itemNum, label: itemStock.primaryKey.itemNum.itemNum + '(' + itemStock.primaryKey.itemNum.itemName + ')' });
            }
          }

          setItemNums(itemNums);
        }
      );
  }
  useEffect(() => { getItemNums(); }, []);

  const [salesConsumerValues, setSalesConsumerValues] = useState({
    salesNum: null,
    consumerGender: '',
    consumerAge: '',
    memo: ''
  });
  const [membershipCustomerRecordValues, setMembershipCustomerRecordValues] = useState({
    customerNum: '',
    salesNum: undefined,
    usedPoint: undefined,
    savePoint: undefined
  });
  const [selectedItemIds, setSelectedItemIds] = useState([
  ]);

  function getSalesCnts(selectedItemIds) {
    const salesCnts = {};
    for (const itemNum of selectedItemIds) {
      if (salesCnts[itemNum] === undefined) {
        salesCnts[itemNum] = 0;
      }

      salesCnts[itemNum]++;
    }

    return salesCnts;
  }
  useEffect(() => { setSalesCnts(getSalesCnts(selectedItemIds)); }, [selectedItemIds]);

  const [itemStocks, setItemStocks] = useState({});
  function getItemStocks() {
    console.log('getCost()');
    axios.get(domain + '/item/stock').
      then
      (
        (response) => {
          const itemStocks = {};
          const employee = JSON.parse(sessionStorage.getItem('employee'));
          for (const itemStock of response.data) {
            if (itemStock.primaryKey.storeNum.storeNum == employee.storeNum.storeNum) {
              itemStocks[itemStock.primaryKey.itemNum.itemNum] = itemStock;
            }
          }

          setItemStocks(itemStocks);
        }
      );
  }
  useEffect(() => { getItemStocks(); }, []);
  function getCost(salesCnts, itemStocks) {
    let cost = 0;
    for (const itemNum of Object.keys(salesCnts)) {
      console.log('itemNum: ' + itemNum);
      console.log(itemStocks);
      const itemStock = itemStocks[itemNum];
      console.log('itemStock: ' + itemStock);
      const salesCnt = salesCnts[itemNum];
      console.log('salesCnt: ' + salesCnt);
      let countToPay;
      switch (itemStock.event) {
        case '2+1':
          countToPay = Math.floor(salesCnt / 3) * 2 + salesCnt % 3;
          break;

        case '1+1':
          countToPay = Math.floor(salesCnt / 2) * 1 + salesCnt % 2;
          break;

        // case '':
        case '':
        case null:
          countToPay = salesCnt;
          break;
      }

      console.log(countToPay);
      cost += countToPay * (((100 - itemStock.sale) / 100) * itemStock.primaryKey.itemNum.consumerPrice);
      console.log('cost+= ' + countToPay * (((100 - itemStock.sale) / 100) * itemStock.primaryKey.itemNum.consumerPrice));
    }

    console.log('cost: ' + cost);
    return cost;
  }

  function validate(salesConsumerValues, membershipCustomerRecordValues, selectedItemIds) {
    const requiredNamesOfSalesConsumerValues = ['consumerGender', 'consumerAge'];
    for (const name of requiredNamesOfSalesConsumerValues) {
      if (salesConsumerValues[name] == '') {
        return false;
      }
    }

    const requiredNamesOfMembershipCustomerRecordValues = ['pointToUse'];
    for (const name of requiredNamesOfMembershipCustomerRecordValues) {
      if (membershipCustomerRecordValues[name] == '') {
        return false;
      }
    }

    return selectedItemIds.length > 0;
  }
  const [isValid, setIsValid] = useState(validate(salesConsumerValues, membershipCustomerRecordValues, selectedItemIds));
  useEffect(() => { setIsValid(validate(salesConsumerValues, membershipCustomerRecordValues, selectedItemIds)); }, [salesConsumerValues, membershipCustomerRecordValues, selectedItemIds]);

  const handleSalesConsumerChange = (event) => {
    const positiveNumberNames = new Set([]);
    if (positiveNumberNames.has(event.target.name)) {
      if (event.target.value != '') {
        event.target.value = Math.abs(event.target.value);
      }
    }

    setSalesConsumerValues({
      ...salesConsumerValues,
      [event.target.name]: event.target.value
    });
  };
  const handleMembershipCustomerRecordChange = (event) => {
    const positiveNumberNames = new Set(['pointToUse']);
    if (positiveNumberNames.has(event.target.name)) {
      if (event.target.value != '') {
        event.target.value = Math.abs(event.target.value);
      }
    }

    setMembershipCustomerRecordValues({
      ...salesConsumerValues,
      [event.target.name]: event.target.value
    });
  };
  const handleSelectedItemIdsChange = (event, index) => {
    const SelectedItemIdsToSet = [...selectedItemIds];
    if (event.target.value != '') {
      if (index == selectedItemIds.length - 1) {
        SelectedItemIdsToSet.push('');
      }

      SelectedItemIdsToSet[index] = event.target.value;
    }
    else {
      SelectedItemIdsToSet.splice(index, 1);
    }

    setSelectedItemIds(SelectedItemIdsToSet);
  };

  function postSalesRecords(salesNum, salesCnts) {
    const employee = JSON.parse(sessionStorage.getItem('employee'));
    for (const itemNum of Object.keys(salesCnts)) {
      axios.post(domain + '/sales/record', { salesNum: salesNum, itemNum: itemNum, storeNum: employee.storeNum.storeNum, salesCnt: salesCnts[itemNum] });
    }
  }
  function putMembershipCustomer(membershipCustomerRecordValues, cost) {
    const ratioOfSavePointToCost = 0.1;
    axios.get(domain + '/membership/customer' + ('/' + membershipCustomerRecordValues.customerNum)).
      then
      (
        (response) => {
          const membershipCustomer = { ...response.data, joinedStoreNum: response.data.joinedStoreNum.storeNum };
          membershipCustomer.point += (ratioOfSavePointToCost * cost);
          axios.put(domain + '/membership/customer' + ('/' + membershipCustomer.customerNum), membershipCustomer);
        }
      );
  }
  function postMembershipCustomerRecord(membershipCustomerRecordValues, salesNum, cost) {
    const ratioOfSavePointToCost = 0.1;
    axios.post(domain + '/membership/customer_record', { customerNum: membershipCustomerRecordValues.customerNum, salesNum: salesNum, usedPoint: 0, savePoint: ratioOfSavePointToCost * cost });
  }

  const router = useRouter();
  function handleSubmit(event) {
    event.preventDefault();

    axios.post(domain + '/sales/consumer', salesConsumerValues).
      then
      (
        (response) => {
          const salesNum = response.data;
          postSalesRecords(salesNum, salesCnts);
          putMembershipCustomer(membershipCustomerRecordValues, getCost(salesCnts, itemStocks));
          postMembershipCustomerRecord(membershipCustomerRecordValues, salesNum, getCost(salesCnts, itemStocks));
        }
      );
    router.push('/statistics' + '?' + 'target=all');
  }

  return (
    <form onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title="구매자"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={salesConsumerValues.consumerGender == ''}
                fullWidth
                helperText={salesConsumerValues.consumerGender == '' ? '구매자 성별을 입력해 주세요' : ''}
                label="구매자 성별"
                name="consumerGender"
                onChange={handleSalesConsumerChange}
                required
                select
                SelectProps={{ native: true }}
                value={salesConsumerValues.consumerGender}
                variant="outlined"
              >
                {consumerGenders.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={salesConsumerValues.consumerAge == ''}
                fullWidth
                helperText={salesConsumerValues.consumerAge == '' ? '구매자 나이대를 입력해 주세요' : ''}
                label="구매자 나이대"
                name="consumerAge"
                onChange={handleSalesConsumerChange}
                required
                select
                SelectProps={{ native: true }}
                value={salesConsumerValues.consumerAge}
                variant="outlined"
              >
                {consumerAges.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="판매 메모"
                name="memo"
                onChange={handleSalesConsumerChange}
                // required
                value={salesConsumerValues.memo}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardHeader
          // subheader="The information can be edited"
          title="멤버쉽 고객"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="멤버쉽 고객 번호"
                name="customerNum"
                onChange={handleMembershipCustomerRecordChange}
                // required
                select
                SelectProps={{ native: true }}
                value={membershipCustomerRecords.customerNum}
                variant="outlined"
              >
                {customerNums.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="판매 메모"
                name="memo"
                onChange={handleSalesConsumerChange}
                // required
                value={salesConsumerValues.memo}
                variant="outlined"
              />
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <CardHeader
          // subheader="The information can be edited"
          title="판매 물품"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            {
              [...selectedItemIds, ''].map
                (
                  (itemNum, index) => {
                    return (
                      <Grid
                        item
                        md={6}
                        xs={12}
                        key={index}
                      >
                        <TextField
                          error={selectedItemIds.length == 0 && itemNum == ''}
                          fullWidth
                          helperText={selectedItemIds.length == 0 && itemNum == '' ? '판매 물품 번호를 입력해 주세요' : ''}
                          label="판매 물품 번호"
                          name="itemNum"
                          onChange={(event) => { handleSelectedItemIdsChange(event, index); }}
                          required={selectedItemIds.length == 0 + 1}
                          select
                          SelectProps={{ native: true }}
                          value={itemNum}
                          variant="outlined"
                        >
                          {itemNums.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    );
                  }
                )
            }
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => history.back()}
          >
            뒤로가기
          </Button>
          <Button
            color="primary"
            disabled={!isValid}
            type='submit'
            variant="contained"
          >
            판매 저장
          </Button>
        </Box>
      </Card>
    </form>
  );
};
