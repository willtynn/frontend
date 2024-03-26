import {
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import {
  StyledTableRowCell,
  StyledTableContainer,
  StyledTableBodyCell,
} from '@/components/DisplayTable';
import {
  GET_SUBMODEL
} from '@/actions/inferPipelineAction';
import InfoAlert from '@/assets/InfoAlert.svg';
import { YaHeiLargeFont } from '@/components/Fonts';
import InfoCard from '@/components/InfoCard';
import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NormalFont, NormalFontBlack } from "@/components/Fonts";
import { Box } from "@mui/system";
import { dispatch } from 'd3';
import { DataRow } from './DataRow';

const tableHeaders = [
  { key: 'models', align: 'center', text: '子模型名称', minWidth: 20, maxWidth: 20 },
  { key: 'models', align: 'center', text: '子模型大小', minWidth: 20, maxWidth: 20 },
];

const fack_row = [
  { 'name': 'sub1', 'size': 5000 },
  { 'name': 'sub2', 'size': 5000 },
  { 'name': 'sub3', 'size': 5000 },
  { 'name': 'sub4', 'size': 5000 },
];

export default function ModelInfo(props) {
  const { showInfo, info } = props;
  const intl = useIntl();

  const [row, setRow] = useState([]);

  const dispatch = useDispatch();

  const { modelList } =
    useSelector(state => {
      return { modelList: state.InferPipeline.subModel }
    });

  const handleSpanClick = index => {

  };

  useEffect(() => {
    dispatch({ type: GET_SUBMODEL, data: fack_row })
  }, []);

  useEffect(() => {
    console.log(111111111111111111111)
    console.log(modelList)
    if (modelList) {
      let row = modelList.map((item, index) => {
        return (
          <DataRow
            key={item}
            onRowClick={() => handleSpanClick(index)}
            rowData={item.name}
            path={item}
          />
        );
      });
      setRow(row);
    }
  }, [modelList]);

  return (
    <>
      <InfoCard title={'子模型信息'}>
        <Stack
          sx={{
            minHeight: '200px',

          }}
          spacing={3}
        >
          {showInfo ?
            <Stack sx={{ padding: '20px' }}>
              <StyledTableContainer sx={{ width: '100%' }}>
                <Table stickyHeader size='small' sx={{ tableLayout: 'auto' }}>
                  <TableHead>
                    <TableRow sx={{ height: '52px' }}>
                      {tableHeaders.map(item => {
                        return (
                          <StyledTableRowCell
                            key={item.key}
                            align={item.align}
                          >
                            {item.text}
                          </StyledTableRowCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      borderBottom: 'solid 2px #B8B5B7',
                      borderTop: 'solid 2px #B8B5B7',
                    }}
                  >
                    {row.map((item, index) => {
                      return (
                        <TableRow
                          key={item.id + '' + index}
                          aria-checked={false}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            },
                            fontWeight: 600,
                            maxWidth: '110px',
                            position: 'sticky',
                            left: 0,
                            zIndex: 6,
                          }}
                          selected={false}
                        >
                          {/* 模型名称 */}
                          <StyledTableBodyCell
                            align={'left'}
                            // align='center'
                            sx={{ display:  'table-cell'}}
                          >
                            {item.name}
                          </StyledTableBodyCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Stack> :
            <Stack sx={{ pt: "80px" }} direction="row" spacing={2} alignItems="center" justifyContent="center">
              <InfoAlert />
              <YaHeiLargeFont>{'请选择一个模型'}</YaHeiLargeFont>
            </Stack>
          }
        </Stack>
      </InfoCard>
      <InfoCard title={'子模型结构'}>
        <Stack
          sx={{
            minHeight: '200px',

          }}
          spacing={3}
        >
          {showInfo ?
            <Stack spacing={3}>
              <iframe
                style={{
                  borderRadius: '5px',
                  border: 'none',
                }}
                height={'435px'}
                src={'http://192.168.1.104:32589/static?modelPath=/models/' + info.file}
              />
            </Stack> :
            <Stack sx={{ pt: "80px" }} direction="row" spacing={2} alignItems="center" justifyContent="center">
              <InfoAlert />
              <YaHeiLargeFont>{'请选择一个模型'}</YaHeiLargeFont>
            </Stack>
          }
        </Stack>
      </InfoCard>
    </>

  );
}