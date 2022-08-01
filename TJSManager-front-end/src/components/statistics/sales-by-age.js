import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import StrollerIcon from '@mui/icons-material/Stroller';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import ElderlyIcon from '@mui/icons-material/Elderly';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { domain } from 'src/api/restful-api';

export const SalesByAge = (props) => {
  const theme = useTheme();

  const [consumerAge,setConsumerAge]=useState([0,0,0,0,0,0,0]);
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
  function getConsumerAge()
  {
    const parameters=getParameters();
    axios.get(domain+'/statistics/consumer_age'+('/'+parameters.target)+(parameters.target=='all'?'':'/'+parameters.itemNum)).
    then
    (
      (response)=>
      {
        const consumerAge=new Array(8);
        for(const index of Object.keys(response.data))
        {
          consumerAge[index]=response.data[index];
        }

        setConsumerAge(consumerAge);
      }
    );
  }
  useEffect(()=>{getConsumerAge();},[]);
  

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
        data: consumerAge,
        // backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00','#3F51B5','#e53935','#FB8C00','#3F51B5','#e53935'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    // labels: ['Desktop', 'Tablet', 'Mobile']
    labels: ['10대 미만', '10대', '20대','30대','40대','50대','60대','70대 이상']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
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
      title: '10대 미만',
      value: Math.floor(100*(consumerAge[0]/getSummation(consumerAge))),
      icon: StrollerIcon,
      color: '#3F51B5'
    },
    {
      title: '10대',
      value: Math.floor(100*(consumerAge[1]/getSummation(consumerAge))),
      icon: EmojiPeopleIcon,
      color: '#E53935'
    },
    {
      title: '20대',
      value: Math.floor(100*(consumerAge[2]/getSummation(consumerAge))),
      icon: EmojiPeopleIcon,
      color: '#FB8C00'
    },
    {
      title: '30대',
      value: Math.floor(100*(consumerAge[3]/getSummation(consumerAge))),
      icon: DirectionsRunIcon,
      color: '#3F51B5'
    },
    {
      title: '40대',
      value: Math.floor(100*(consumerAge[4]/getSummation(consumerAge))),
      icon: DirectionsRunIcon,
      color: '#E53935'
    },
    {
      title: '50대',
      value: Math.floor(100*(consumerAge[5]/getSummation(consumerAge))),
      icon: DirectionsWalkIcon,
      color: '#FB8C00'
    },
    {
      title: '60대',
      value: Math.floor(100*(consumerAge[6]/getSummation(consumerAge))),
      icon: DirectionsWalkIcon,
      color: '#3F51B5'
    },
    {
      title: '70대 이상',
      value: Math.floor(100*(consumerAge[7]/getSummation(consumerAge))),
      icon: ElderlyIcon,
      color: '#E53935'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="나이대별 판매량" />
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
