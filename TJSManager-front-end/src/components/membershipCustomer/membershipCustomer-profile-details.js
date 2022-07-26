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

const customerGenders = [
  {
    value: 'm',
    label: 'm'
  },
  {
    value: 'f',
    label: 'f'
  }
];

export const MembershipCustomerProfileDetails = (props) => {
  let parameters;
  useEffect(()=>{parameters=getParameters();},[]);

  const [values, setValues] = useState({
    customerNum: null,
    customerName: '',
    customerBirthDate: new Date().toISOString().slice(0,4+1+2+1+2),
    customerGender: 'm',
    customerPhoneNum: '',
    point: 0,
    joinedStoreNum: 0
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
          title="멤버쉽 고객 기본 정보"
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
                label="고객 이름"
                name="customerName"
                onChange={handleChange}
                required
                value={values.customerName}
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
                label="고객 생년월일"
                name="customerBirthDate"
                onChange={handleChange}
                required
                type="date"
                value={values.customerBirthDate}
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
                label="고객 성별"
                name="customerGender"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.customerGender}
                variant="outlined"
              >
                {customerGenders.map((option) => (
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
                label="고객 연락처"
                name="customerPhoneNum"
                onChange={handleChange}
                required
                value={values.customerPhoneNum}
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
            기본 정보 저장
          </Button>
        </Box>
      </Card>
    </form>
  );
};
