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

const events = [
  {
    value: '',
    label: ''
  },
  {
    value: '1+1',
    label: '1+1'
  },
  {
    value: '2+1',
    label: '2+1'
  }
];

export const ItemStockProfileDetails = (props) => {
  const [itemNums,setItemNums]=useState([]);
  function getItemNums()
  {
    axios.get(domain+'/item/info').
    then
    (
      (response)=>
      {
        const itemNums=[];
        itemNums.push({value:'',label:''});
        for(const itemInfo of response.data)
        {          
          itemNums.push({value:itemInfo.itemNum,label:itemInfo.itemNum+'('+itemInfo.itemName+')'});
        }

        setItemNums(itemNums);
      }
    );
  }
  useEffect(getItemNums,[]);

  const [values, setValues] = useState({
    itemNum: '',
    storeNum: undefined,
    inCnt: '0',
    outCnt: '0',
    dropCnt: '0',
    lot: '',
    sale: '0',
    event: ''
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
      setValues({...values,storeNum:employee.storeNum.storeNum});

      const parameters=getParameters();
      if(parameters.method=='update')
      {
        axios.get(domain+'/item/stock'+('/'+parameters.storeNum)+('/'+parameters.itemNum)).
        then((response)=>{setValues({...response.data,itemNum:response.data.primaryKey.itemNum.itemNum,storeNum:response.data.primaryKey.storeNum.storeNum});});
      }

      // setValues({...values});
    },[]
  );
  
  function validate(values)
  {
    const requiredNames=['itemNum','inCnt','outCnt','dropCnt','sale'];
    for(const name of requiredNames)
    {
      if(values[name]=='')
      {
        return false;
      }
    }

    return true;
  }
  const [isValid, setIsValid] = useState(validate(values));
  useEffect(()=>{setIsValid(validate(values));},[values]);

  const handleChange = (event) => {
    const positiveNumberNames=new Set(['inCnt', 'outCnt', 'dropCnt', 'sale']);
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
        url:domain+'/item/stock'+(parameters.method=='create'?'':('/'+parameters.storeNum)+('/'+parameters.itemNum)),
        method:parameters.method=='create'?'post':'put',
        data:values
      }
    ).
    then(()=>{router.push('/item-stocks');});
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
                error={values.itemNum==''}
                fullWidth
                helperText={values.itemNum==''?'물품 번호를 입력해 주세요':''}
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
                error={values.inCnt==''}
                fullWidth
                helperText={values.inCnt==''?'입고량을 입력해 주세요':''}
                label="입고량"
                name="inCnt"
                onChange={handleChange}
                required
                type="number"
                value={values.inCnt}
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
                error={values.outCnt==''}
                fullWidth
                helperText={values.outCnt==''?'출고량을 입력해 주세요':''}
                label="출고량"
                name="outCnt"
                onChange={handleChange}
                required
                type="number"
                value={values.outCnt}
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
                error={values.dropCnt==''}
                fullWidth
                helperText={values.dropCnt==''?'미판매량을 입력해 주세요':''}
                label="미판매량"
                name="dropCnt"
                onChange={handleChange}
                required
                type="number"
                value={values.dropCnt}
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
                fullWidth
                // helperText="Please specify the first name"
                label="진열 위치"
                name="lot"
                onChange={handleChange}
                // required
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
                error={values.sale==''}
                fullWidth
                helperText={values.sale==''?'할인율을 입력해 주세요':''}
                label="할인율"
                name="sale"
                onChange={handleChange}
                required
                type="number"
                value={values.sale}
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
                fullWidth
                // helperText="Please specify the first name"
                label="행사 여부"
                name="event"
                onChange={handleChange}
                // required
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
            disabled={!isValid}
            type='submit'
            variant="contained"
          >
            저장
          </Button>
        </Box>
      </Card>
    </form>
  );
};
