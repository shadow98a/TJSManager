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

export const InWarehouseReportProfileDetails = (props) => {
  let parameters;
  useEffect(()=>{parameters=getParameters();},[]);

  const [values, setValues] = useState({
    reportNum: null,
    storeNum: 0,
    itemNum: 0,
    reqCnt: 0,
    reqDate: new Date().toISOString().slice(0,4+1+2+1+2),
    writerNum: 0,
    approvedDate: null
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
          title="입고 신청서"
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
                label="제품 번호"
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
                label="입고 요청 수량"
                name="reqCnt"
                onChange={handleChange}
                required
                type="number"
                value={values.reqCnt}
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
                label="입고 요청일"
                name="reqDate"
                onChange={handleChange}
                required
                type="date"
                value={values.reqDate}
                variant="outlined"
              />
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
            신청서 저장
          </Button>
        </Box>
      </Card>
    </form>
  );
};
