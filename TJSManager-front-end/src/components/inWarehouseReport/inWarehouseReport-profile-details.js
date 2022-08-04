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

export const InWarehouseReportProfileDetails = (props) => {
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
  useEffect(()=>{getItemNums();},[]);

  const [values, setValues] = useState({
    reportNum: null,
    storeNum: undefined,
    itemNum: '',
    reqCnt: '0',
    reqDate:  new Date().
              toISOString().
              slice(0,4+1+2+1+2),
    writerNum: undefined,
    approvedDate: null
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
      // setValues({...values,storeNum:employee.storeNum.storeNum});
      setValues({...values,storeNum:employee.storeNum.storeNum,writerNum:employee.empNum});

      const parameters=getParameters();
      if(parameters.method=='update')
      {
        axios.get(domain+'/item/in_warehouse_report'+('/'+parameters.reportNum)).
        // then((response)=>{setValues({...response.data,storeNum:response.data.storeNum.storeNum,reqCnt:response.data.reqCnt.toString(),writerNum:response.data.writerNum.writerNum});});
        then((response)=>{setValues({...response.data,storeNum:response.data.storeNum.storeNum,itemNum:response.data.itemNum.itemNum,reqCnt:response.data.reqCnt.toString(),writerNum:employee.empNum});});
      }

      // setValues({...values,writerNum:employee.empNum});
    },[]
  );
  
  function validate(values)
  {
    const requiredNames=['itemNum','reqCnt','reqDate'];
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
    const positiveNumberNames=new Set(['reqCnt']);
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
        url:domain+'/item/in_warehouse_report'+(parameters.method=='create'?'':('/'+parameters.reportNum)),
        method:parameters.method=='create'?'post':'put',
        data:values
      }
    ).
    then(()=>{router.push('/in-warehouse-reports');});
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
                error={values.reqCnt==''}
                fullWidth
                helperText={values.reqCnt==''?'입고 요청 수량을 입력해 주세요':''}
                label="입고 요청 수량"
                name="reqCnt"
                onChange={handleChange}
                required
                type="number"
                value={values.reqCnt}
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
                error={values.reqDate==''}
                fullWidth
                helperText={values.reqDate==''?'입고 요청일을 입력해 주세요':''}
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
            disabled={!isValid}
            type='submit'
            variant="contained"
          >
            신청서 저장
          </Button>
        </Box>
      </Card>
    </form>
  );
};
