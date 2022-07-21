import { useState } from 'react';
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
    // firstName: 'Katarina',
    // lastName: 'Smith',
    // email: 'demo@devias.io',
    // phone: '',
    // state: 'Alabama',
    // country: 'USA'
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
                fullWidth
                // helperText="Please specify the first name"
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
                fullWidth
                // helperText="Please specify the first name"
                label="소비자판매가"
                name="consumerPrice"
                onChange={handleChange}
                required
                type="number"
                value={values.phone}
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
          >
            돌아가기
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
