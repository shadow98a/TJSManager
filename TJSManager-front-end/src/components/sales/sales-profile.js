import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {domain} from '../../api/restful-api';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

// export const SalesProfile = (props) => (
export const SalesProfile = ({salesCnts,pointToUse,...props}) =>
{
  const [itemStocks,setItemStocks]=useState({});
  function getItemStocks()
  {
    // console.log('getItemstocks():')
    axios.get(domain+'/item/stock')
    .then
    (
      (response)=>
      {
        const itemStocks={};
        const employee=JSON.parse(sessionStorage.getItem('employee'));
        for(const itemStock of response.data)
        {
          if(itemStock.primaryKey.storeNum.storeNum==employee.storeNum.storeNum)
          {
            itemStocks[itemStock.primaryKey.itemNum.itemNum]=itemStock;
          }
        }
        
        // console.log(itemStocks);
        setItemStocks(itemStocks);
      }
    );
  }
  useEffect(()=>{setItemStocks(getItemStocks());},[]);

  function getCountsToPay(salesCnts,itemStocks)
  {
    // console.log('getCountsToPay():');
    const countsToPay={};
    for(const itemNum of Object.keys(salesCnts))
    {
      // console.log('itemNum: '+itemNum);
      const salesCnt=salesCnts[itemNum];
      // console.log('salesCnt: '+salesCnt);

      const itemStock=itemStocks[itemNum]
      if(itemStock===undefined)
      {
        break;
      }

      switch(itemStock.event)
      {
        case '2+1':
          countsToPay[itemNum]=Math.floor(salesCnt/3)*2+salesCnt%3;
          break;

        case '1+1':
          countsToPay[itemNum]=Math.floor(salesCnt/2)*1+salesCnt%2;
          break;

        // case '':
        case '':
        case null:
          countsToPay[itemNum]=salesCnt;
          break;
      }

      // console.log('countToPay: '+countsToPay[itemNum]);
    }

    return countsToPay;
  }
  const [countsToPay,setCountsToPay]=useState({});
  useEffect(()=>{setCountsToPay(getCountsToPay(salesCnts,itemStocks));},[salesCnts,itemStocks]);

  function getCost(countsToPay,itemStocks)
  {
    // console.log('getCost():');
    let cost=0;
    for(const itemNum of Object.keys(salesCnts))
    {
      const itemStock=itemStocks[itemNum];
      if(itemStock===undefined)
      {
        cost=undefined;
        break;
      }

      cost+=countsToPay[itemNum]*(((100-itemStock.sale)/100)*itemStock.primaryKey.itemNum.consumerPrice);
    }

    // console.log(cost);
    return cost;
  }
  const [cost,setCost]=useState(0);
  useEffect(()=>{setCost(getCost(countsToPay,itemStocks));},[countsToPay]);

  return  (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          /> */}
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {cost!=undefined?(cost-pointToUse)+'￦':'...'}
          </Typography>
          {/* <Typography
            color="textSecondary"
            variant="body2"
          >
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.timezone}
          </Typography> */}
          {
            Object.keys(salesCnts).map
            (
              (itemNum)=>
              {
                return  (
                          <Grid
                            container
                            spacing={3}
                            key={itemNum}
                          >
                            <Grid
                              item
                              lg={6}
                              md={6}
                              xs={6}
                            >
                  
                              <Typography
                                color="textSecondary"
                                variant="body2"
                              >
                                {itemStocks[itemNum]!=undefined?itemStocks[itemNum].primaryKey.itemNum.itemName:'...'}
                              </Typography>
                  
                            </Grid>
                            <Grid
                              item
                              lg={3}
                              md={3}
                              xs={3}
                            >
                  
                              <Typography
                                color="textSecondary"
                                variant="body2"
                              >
                                {countsToPay[itemNum]!=undefined?'×'+(countsToPay[itemNum]+(countsToPay[itemNum]==salesCnts[itemNum]?'':'('+('+'+(salesCnts[itemNum]-countsToPay[itemNum]))+')')):'...'}
                              </Typography>
                              
                            </Grid>
                            <Grid
                              item
                              lg={3}
                              md={3}
                              xs={3}
                            >
                  
                              <Typography
                                color="textSecondary"
                                variant="body2"
                              >
                                {itemStocks[itemNum]!=undefined&&countsToPay[itemNum]!=undefined?(countsToPay[itemNum]*(((100-itemStocks[itemNum].sale)/100)*itemStocks[itemNum].primaryKey.itemNum.consumerPrice))+'￦'+(itemStocks[itemNum].sale==0?'':'('+('-'+itemStocks[itemNum].sale+'%')+')'):'...'}
                              </Typography>
                              
                            </Grid>
                          </Grid>
                        );
              }
            )
          }
          {
            pointToUse>0&&            
            (
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={6}
                >
      
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    사용할 포인트
                  </Typography>
      
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={3}
                  xs={3}
                >
      
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    {/* {`${user.city} ${user.country}`} */}
                  </Typography>
                  
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={3}
                  xs={3}
                >
      
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    {'-'+pointToUse+'￦'}
                  </Typography>
                  
                </Grid>
              </Grid>
            )
            }
        </Box>
      </CardContent>
      {/* <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
}

