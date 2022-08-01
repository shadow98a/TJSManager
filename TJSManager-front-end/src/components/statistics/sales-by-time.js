import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { domain } from 'src/api/restful-api';

export const SalesByTime = (props) => {
  const theme = useTheme();

  const [salesHour,setSalesHour]=useState([]);
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
  function getSalesHour(count)
  {
    const parameters=getParameters();
    axios.get(domain+'/statistics/sales_hour'+('/'+parameters.target)+(parameters.target=='all'?'':'/'+parameters.itemNum)).
    then
    (
      (response)=>
      {
        const salesHour=new Array(count);
        for(const hour of Object.keys(response.data))
        {
          const index=Math.floor(hour/(24/count));
          if(salesHour[index]===undefined)
          {
            salesHour[index]=0;
          }

          salesHour[index]+=response.data[hour];
        }

        setSalesHour(salesHour);
      }
    )
  }
  useEffect(()=>{getSalesHour(8);},[]);

  const [itemNum,setItemNum]=useState('');
  function getItemNum()
  {
    const parameters=getParameters();
    if(parameters.target=='all')
    {
      setItemNum('모든 상품');
    }
    else
    {
      axios.get(domain+'/item/info'+('/'+parameters.itemNum)).
      then
      (
        (response)=>
        {
          const itemInfo=response.data;
          setItemNum(itemInfo.itemNum+'('+itemInfo.itemName+')');
        }
      )
    }
  }
  useEffect(()=>{getItemNum();},[]);

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        // data: [18, 5, 19, 27, 29, 19, 20],
        data: salesHour,
        // label: 'This year',
        label: itemNum,
        maxBarThickness: 10
      // },
      // {
      //   backgroundColor: '#EEEEEE',
      //   barPercentage: 0.5,
      //   barThickness: 12,
      //   borderRadius: 4,
      //   categoryPercentage: 0.5,
      //   data: [11, 20, 12, 29, 30, 25, 13],
      //   label: 'Last year',
      //   maxBarThickness: 10
      }
    ],
    labels: ['0시~3시', '3시~6시', '6시~9시', '9시~12시', '12시~15시', '15시~18시', '18시~21시', '21시~24시']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        // action={(
        //   <Button
        //     endIcon={<ArrowDropDownIcon fontSize="small" />}
        //     size="small"
        //   >
        //     Last 7 days
        //   </Button>
        // )}
        title="시간대별 판매량"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button> */}
      </Box>
    </Card>
  );
};
