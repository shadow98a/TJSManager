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
import axios from 'axios';
import {useRouter} from 'next/router';
import {domain} from '../../api/restful-api';

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
  const [values, setValues] = useState({
    customerNum: null,
    customerName: '',
    customerBirthDate:  new Date().
                        toISOString().
                        slice(0,4+1+2+1+2),
    customerGender: 'm',
    customerPhoneNum: '',
    point: '0',
    joinedStoreNum: undefined
  });
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
  useEffect
  ( 
    ()=>
    {
      const employee=JSON.parse(sessionStorage.getItem('employee'));
      setValues({...values,joinedStoreNum:employee.storeNum.storeNum});

      const parameters=getParameters();
      if(parameters.method=='update')
      {
        axios.get(domain+'/membership/customer'+('/'+parameters.customerNum)).
        then((response)=>{setValues({...response.data,joinedStoreNum:response.data.joinedStoreNum.storeNum});});
      }

      // setValues({...values});
    },[]
  );
  
  function validate()
  {
    const requiredNames=['customerName','customerBirthDate','customerGender','customerPhoneNum'];
    for(const name of requiredNames)
    {
      if(values[name]=='')
      {
        return false;
      }
    }

    return true;
  }
  const [isValid, setIsValid] = useState(validate());
  useEffect(()=>{setIsValid(validate());},[values]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const router=useRouter();
  function handleSubmit(event)
  {
    event.preventDefault();
    
    const parameters=getParameters();
    axios
    (
      {
        url:domain+'/membership/customer'+(parameters.method=='create'?'':('/'+parameters.customerNum)),
        method:parameters.method=='create'?'post':'put',
        data:values
      }
    ).
    then(()=>{router.push('/membership-customers');});
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
                error={values.customerName==''}
                fullWidth
                helperText={values.customerName==''?'고객 이름을 입력해 주세요':''}
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
                error={values.customerBirthDate==''}
                fullWidth
                helperText={values.customerBirthDate==''?'고객 생년월일을 입력해 주세요':''}
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
                error={values.customerGender==''}
                fullWidth
                helperText={values.customerGender==''?'고객 성별을 입력해 주세요':''}
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
                error={values.customerPhoneNum==''}
                fullWidth
                helperText={values.customerPhoneNum==''?'고객 연락처를 입력해 주세요':''}
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
            disabled={!isValid}
            type='submit'
            variant="contained"
          >
            기본 정보 저장
          </Button>
        </Box>
      </Card>
    </form>
  );
};
