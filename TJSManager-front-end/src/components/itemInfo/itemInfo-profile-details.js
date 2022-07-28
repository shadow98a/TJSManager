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

const types = [
  {
    value: '냉동식품',
    label: '냉동식품'
  },
  {
    value: '냉장식품',
    label: '냉장식품'
  },
  {
    value: '담배',
    label: '담배'
  },
  {
    value: '식품',
    label: '식품'
  },
  {
    value: '음료',
    label: '음료'
  },
  {
    value: '주류',
    label: '주류'
  },
  {
    value: '기타',
    label: '기타'
  }
];

export const ItemInfoProfileDetails = (props) => {
  const [values, setValues] = useState({
    itemNum: null,
    itemName: '',
    type: '냉동식품',
    consumerPrice: ''
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
      setValues({...values});

      const parameters=getParameters();
      if(parameters.method=='update')
      {
        axios.get(domain+'/item/info'+('/'+parameters.itemNum)).
        then((response)=>{setValues(response.data);});
      }

      // setValues({...values});
    },[]
  );

  function validate()
  {
    const requiredNames=['itemName','type','consumerPrice'];
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
    const positiveNumberNames=new Set(['consumerPrice']);
    if(positiveNumberNames.has(event.target.name))
    {
      if(event.target.value!='')
      {
        event.target.value=Math.abs(event.target.value);
      }
    }

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
        url:domain+'/item/info'+(parameters.method=='create'?'':('/'+parameters.itemNum)),
        method:parameters.method=='create'?'post':'put',
        data:values
      }
    ).
    then(()=>{router.push('/item-infos');});
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
          title="상품 기본 정보"
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
                error={values.itemName==''}
                fullWidth
                helperText={values.itemName==''?'물품명을 입력해 주세요':''}
                label="물품명"
                name="itemName"
                onChange={handleChange}
                required
                value={values.itemName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={values.consumerPrice==''}
                fullWidth
                helperText={values.consumerPrice==''?'소비자판매가를 입력해 주세요':''}
                label="소비자판매가"
                name="consumerPrice"
                onChange={handleChange}
                required
                type="number"
                value={values.consumerPrice}
                variant="outlined"
                inputProps={{min:"0"}}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={values.type==''}
                fullWidth
                helperText={values.type==''?'물품 분류를 입력해 주세요':''}
                label="물품 분류"
                name="type"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.type}
                variant="outlined"
              >
                {types.map((option) => (
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
