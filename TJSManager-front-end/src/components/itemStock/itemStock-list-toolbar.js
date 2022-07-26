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

function toParameters(selectedId)
{
  console.log(selectedId);
  return selectedId.slice(1, selectedId.length-1).replaceAll(',','&').replaceAll(':','=').replaceAll('"','');
} 

export const ItemStockListToolbar = (props) => (
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
        재고 현황
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
          href="/item-stock?method=create"
          passHref
        >
          <Button
            color="primary"
            variant="contained"
            sx={{ mr: 1 }}
          >
            재고 추가
          </Button>
        </NextLink>
        <NextLink
          href={"/item-stock?method=update"+(props.selectedItemStockIds.length==1?'&'+toParameters(props.selectedItemStockIds[0]):'')}
          passHref
        >
          <Button
            color="secondary"
            variant="contained"
            sx={{ mr: 1 }}
            disabled={props.selectedItemStockIds.length!=1}
          >
            재고 수정
          </Button>
        </NextLink>
        <Button
          color="error"
          variant="contained"
          sx={{ mr: 1 }}
          disabled={props.selectedItemStockIds.length==0}
        >
          재고 삭제
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
              placeholder="재고 검색"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
