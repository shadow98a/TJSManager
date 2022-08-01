import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { domain } from 'src/api/restful-api';

export const SalesByGender = (props) => {
  const theme = useTheme();

  const [consumerGender,setConsumerGender]=useState([0,0]);
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
  function getConsumerGender()
  {
    const parameters=getParameters();
    axios.get(domain+'/statistics/consumer_gender'+('/'+parameters.target)+(parameters.target=='all'?'':'/'+parameters.itemNum)).
    then
    (
      (response)=>
      {
        const consumerGender=new Array(2);
        for(const gender of Object.keys(response.data))
        {
          const index=gender=='m'?0:1;
          consumerGender[index]=response.data[gender];
        }

        setConsumerGender(consumerGender);
      }
    );
  }
  useEffect(()=>{getConsumerGender();},[]);
  

  function getSummation(array)
  {
    let summation=0;
    for(const item of array)
    {
      summation+=item;
    }

    return summation;
  }

  const data = {
    datasets: [
      {
        // data: [63, 15, 22],
        data: consumerGender,
        // backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        backgroundColor: ['#3F51B5', '#e53935'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    // labels: ['Desktop', 'Tablet', 'Mobile']
    labels: ['m', 'f']
  };

  const options = {
    animation: false,
    cutoutPercentgender: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const devices = [
    // {
    //   title: 'Desktop',
    //   value: 63,
    //   icon: LaptopMacIcon,
    //   color: '#3F51B5'
    // },
    // {
    //   title: 'Tablet',
    //   value: 15,
    //   icon: TabletIcon,
    //   color: '#E53935'
    // },
    // {
    //   title: 'Mobile',
    //   value: 23,
    //   icon: PhoneIcon,
    //   color: '#FB8C00'
    // }
    {
      title: 'm',
      value: Math.floor(100*(consumerGender[0]/getSummation(consumerGender))),
      icon: MaleIcon,
      color: '#3F51B5'
    },
    {
      title: 'f',
      value: Math.floor(100*(consumerGender[1]/getSummation(consumerGender))),
      icon: FemaleIcon,
      color: '#E53935'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="성별 판매량" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
