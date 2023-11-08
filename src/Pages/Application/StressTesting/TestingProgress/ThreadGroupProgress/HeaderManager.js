import { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { KubeInput, EditableTextField } from '@/components/Input';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { StyledRadioGroup } from '../../../../../components/Radio';
import { KubeCheckbox } from '../../../../../components/Checkbox';
import { UPDATE_REQUEST_HEADER } from '../../../../../actions/applicationAction';
import { KubeSubCard } from '../../../../../components/InfoCard';
import Editor from '@monaco-editor/react';
import {
  StyledTableHead,
  StyledTableContainer,
  StyledTableBodyCell,
  StyledTableBox,
} from '../../../../../components/DisplayTable';
import { fontFamily } from '../../../../../utils/commonUtils';
import {
  KubeConfirmButton,
  KubeCancelButton,
} from '../../../../../components/Button';

function createRow(
  id,
  label,
  isOrder = true,
  minWidth = '110px',
  maxWidth = '220px',
  show = true,
  align,
  colSpan = 1,
  rowSpan = 1
) {
  return {
    id,
    label,
    isOrder,
    minWidth,
    maxWidth,
    show,
    align,
    colSpan,
    rowSpan,
  };
}

export function HeaderManager(props) {
  const { showError } = props;

  const [parameterDeletedRows, setParameterDeletedRows] = useState([]);
  const [allCheck, setAllCheck] = useState(false);

  const intl = useIntl();
  const dispatch = useDispatch();

  const { requestHeader } = useSelector(state => {
    return {
      requestHeader: state.Application.requestHeader,
    };
  });

  const headRow = [
    createRow('name', '名称', false, '300px', '300px', true, 'center'),
    createRow('value', '值', false, '300px', '300px', true, 'center'),
  ];

  useEffect(() => {
    setAllCheck(
      parameterDeletedRows.every((value, index) => {
        return value === true;
      })
    );
  }, [parameterDeletedRows]);

  const handleParameterAdd = () => {
    dispatch({
      type: UPDATE_REQUEST_HEADER,
      data: [
        ...requestHeader,
        {
          name: '',
          value: '',
        },
      ],
    });
    setParameterDeletedRows(prevRows => [...prevRows, false]);
  };

  const handleTableCellChange = (index, key, value) => {
    let tmpParameters = JSON.parse(JSON.stringify(requestHeader));
    tmpParameters[index][key] = value;
    dispatch({ type: UPDATE_REQUEST_HEADER, data: tmpParameters });
  };

  const handleAllCheck = checked => {
    setAllCheck(checked);
    setParameterDeletedRows(new Array(requestHeader.length).fill(checked));
  };

  const handleSingleRowCheck = (checked, index) => {
    let tmpRows = JSON.parse(JSON.stringify(parameterDeletedRows));
    tmpRows[index] = checked;
    setParameterDeletedRows(tmpRows);
  };

  const handleParameterDelete = () => {
    dispatch({
      type: UPDATE_REQUEST_HEADER,
      data: requestHeader.filter((v, index) => {
        return parameterDeletedRows[index] === false;
      }),
    });
    setParameterDeletedRows(
      parameterDeletedRows.filter((value, index) => {
        return value === false;
      })
    );
  };

  return (
    <Box sx={{ p: '12px' }}>
      <KubeSubCard title='信息头存储在信息头管理器中'>
        <Stack
          sx={{ height: "320px" }}
          direction='column'
          justifyContent='space-between'
        >
          <StyledTableContainer sx={{ bgcolor: '#FFF', mt: '12px' }}>
            <Table
              stickyHeader
              size='small'
              sx={{
                tableLayout: 'auto',
              }}
            >
              <StyledTableHead
                headRow={headRow}
                selectAll={true}
                checkAll={allCheck}
                setCheckAll={handleAllCheck}
              />
              <TableBody>
                {requestHeader &&
                requestHeader.length &&
                requestHeader.length > 0 ? (
                  requestHeader.map((row, index) => {
                    return (
                      <TableRow
                        key={row.id + '' + index}
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
                      >
                        <StyledTableBodyCell align={'center'}>
                          <KubeCheckbox
                            size='small'
                            disableRipple
                            checked={parameterDeletedRows[index]}
                            onChange={e =>
                              handleSingleRowCheck(e.target.checked, index)
                            }
                          />
                        </StyledTableBodyCell>
                        <StyledTableBodyCell align={'center'}>
                          <EditableTextField
                            sx={{
                              height: '32px',
                              '& input': {
                                textAlign: 'center',
                              },
                            }}
                            onChange={e =>
                              handleTableCellChange(
                                index,
                                'name',
                                e.target.value
                              )
                            }
                            value={row.name}
                            inputProps={{
                              autocomplete: 'off',
                            }}
                          />
                        </StyledTableBodyCell>
                        <StyledTableBodyCell align={'center'}>
                          <EditableTextField
                            sx={{
                              height: '32px',
                              '& input': {
                                textAlign: 'center',
                              },
                            }}
                            onChange={e =>
                              handleTableCellChange(
                                index,
                                'value',
                                e.target.value
                              )
                            }
                            value={row.value}
                            inputProps={{
                              autocomplete: 'off',
                            }}
                          />
                        </StyledTableBodyCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow style={{ height: '200px' }}>
                    <TableCell
                      colSpan={6}
                      sx={{
                        textAlign: 'center',
                        fontSize: '14px',
                        fontFamily: fontFamily,
                        fontStyle: 'normal',
                      }}
                    >
                      暂无参数
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>

          <Stack
            direction='row'
            sx={{
              width: '100%',
              mt: '12px',
            }}
            spacing={2}
            justifyContent='center'
          >
            <KubeConfirmButton
              sx={{ height: '32px', width: '84px' }}
              onClick={handleParameterAdd}
            >
              添加
            </KubeConfirmButton>
            <KubeCancelButton
              sx={{ height: '32px', width: '84px' }}
              onClick={handleParameterDelete}
            >
              删除
            </KubeCancelButton>
          </Stack>
        </Stack>
      </KubeSubCard>
    </Box>
  );
}
