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

export const InWarehouseReportListToolbar = (props) => (
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
        입고 신청
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
          href="/in-warehouse-report?method=create"
          passHref
        >
          <Button
            color="primary"
            variant="contained"
            sx={{ mr: 1 }}
          >
            입고 신청 추가
          </Button>
        </NextLink>
        <NextLink
          href={"/item-info?method=update"+(props.selectedInWarehouseReportIds.length==1?'&'+toParameters(props.selectedInWarehouseReportIds[0]):'')}
          passHref
        >
          <Button
            color="secondary"
            variant="contained"
            sx={{ mr: 1 }}
            disabled={props.selectedInWarehouseReportIds.length!=1}
          >
            입고 신청 수정
          </Button>
        </NextLink>
        <Button
          color="error"
          variant="contained"
          sx={{ mr: 1 }}
          disabled={props.selectedInWarehouseReportIds.length==0}
        >
          입고 신청 삭제
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
              placeholder="입고 신청 검색"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
