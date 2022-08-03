import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import axios from 'axios';
import {useRouter} from 'next/router';
import {domain} from '../../api/restful-api';

function toParameters(selectedId)
{
  return  selectedId.
          slice(1, selectedId.length-1).
          replaceAll(',','&').
          replaceAll(':','=').
          replaceAll('"','');
}

function deleteItemInfos(selectedItemInfoIds,router)
{
  for( const selectedItemInfoId of selectedItemInfoIds)
  {
    const itemInfo=JSON.parse(selectedItemInfoId);
    axios.delete(domain+'/item/info'+('/'+itemInfo.itemNum));
  }

  router.push('/item-infos');
}

export const ItemInfoListToolbar = (props) => 
{
  const router=useRouter();
return  (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        모든 상품
      </Typography>
      <Box sx={{ m: 1 }}>
        {/* <Button
          startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Import
        </Button>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Export
        </Button> */}
        <NextLink
          href="/item-info?method=create"
          passHref
        >
          <Button
            color="primary"
            variant="contained"
            sx={{ mr: 1 }}
          >
            상품 추가
          </Button>
        </NextLink>
        <NextLink
          href={"/item-info?method=update"+(props.selectedItemInfoIds.length==1?'&'+toParameters(props.selectedItemInfoIds[0]):'')}
          passHref
        >
          <Button
            color="secondary"
            variant="contained"
            sx={{ mr: 1 }}
            disabled={props.selectedItemInfoIds.length!=1}
          >
            상품 수정
          </Button>
        </NextLink>
        <Button
          color="error"
          variant="contained"
          sx={{ mr: 1 }}
          disabled={props.selectedItemInfoIds.length==0}
          onClick={()=>{deleteItemInfos(props.selectedItemInfoIds,router);}}
        >
          상품 삭제
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="상품 검색"
              variant="outlined"
              onChange={(event)=>{props.setSearchKeyword(event.target.value);}}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
            }
