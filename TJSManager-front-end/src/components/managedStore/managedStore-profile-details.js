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

export const ManagedStoreProfileDetails = (props) => {
  let parameters;
  useEffect(()=>{parameters=getParameters();},[]);

  const [values, setValues] = useState({
    storeNum: null,
    itemNamestorePassWord: '',
    storeName: '',
    storeAdress: '',
    storeTelNum: ''
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
          title="지점 정보"
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
                label="지점 로그인을 위한 비밀번호"
                name="storePassword"
                onChange={handleChange}
                required
                type="password"
                value={values.storePassword}
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
                label="지점명"
                name="storeName"
                onChange={handleChange}
                required
                value={values.storeName}
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
                label="지점 주소"
                name="storeAdress"
                onChange={handleChange}
                required
                value={values.storeAdress}
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
                label="지점 연락처"
                name="storeTelNum"
                onChange={handleChange}
                required
                value={values.storeTelNum}
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
            정보 저장
          </Button>
        </Box>
      </Card>
    </form>
  );
};
