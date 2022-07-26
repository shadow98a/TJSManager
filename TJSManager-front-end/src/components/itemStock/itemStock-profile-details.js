import { useState,useEffect } from 'react';
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

function getParameters()
{
  const queryString=window.location.search.slice(1);
  const parameters={};
  for(const nameAndValue of queryString.split('&'))
  {
     const [name,value]=nameAndValue.split('=');
     parameters[name]=value;
  }

  return parameters;
}

const itemNums = [
];
const events = [
  {
    value: '',
    label: ''
  },
  {
    value: '1 + 1',
    label: '1 + 1'
  },
  {
    value: '2 + 1',
    label: '2 + 1'
  }
];

export const ItemStockProfileDetails = (props) => {
  let parameters;
  useEffect(()=>{parameters=getParameters();},[]);

  const [values, setValues] = useState({
    itemNum: 0,
    storeNum: 0,
    inCnt: 0,
    outCnt: 0,
    dropCnt: 0,
    lot: '',
    sale: 0,
    event: ''
  });
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title="재고"
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
                label="물품 번호"
                name="itemNum"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.itemNum}
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
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="입고량"
                name="inCnt"
                onChange={handleChange}
                required
                type="number"
                value={values.inCnt}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="출고량"
                name="outCnt"
                onChange={handleChange}
                required
                type="number"
                value={values.outCnt}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="미판매량"
                name="dropCnt"
                onChange={handleChange}
                required
                type="number"
                value={values.dropCnt}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="진열 위치"
                name="lot"
                onChange={handleChange}
                value={values.lot}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="할인율"
                name="sale"
                onChange={handleChange}
                required
                type="number"
                value={values.sale}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="행사 여부"
                name="event"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.event}
                variant="outlined"
              >
                {events.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
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
            onClick={()=>history.back()}
          >
            뒤로가기
          </Button>
          <Button
            color="primary"
            variant="contained"
          >
            저장
          </Button>
        </Box>
      </Card>
    </form>
  );
};
