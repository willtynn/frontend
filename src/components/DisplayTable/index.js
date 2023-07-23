import React from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Stack,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';

// // 改变标题行的颜色
export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f1f3f5',
    color: '#505050',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '18px',
    textTransform: 'uppercase',
  },
  [`&.${tableCellClasses.root}`]: {
    height: '43px',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '24px',
  },
}));

export const NewStyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#DFE4E8",
    color: "#596A7C",
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '18px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  [`&.${tableCellClasses.root}`]: {
    // paddingTop: 0,
    // paddingBottom: 0,
    // paddingLeft: "24px",
    // paddingRight: '24px',
    maxWidth: '260px',
    border: "1px solid white"
  },
}));

export function MyTableHeader(props) {
  //order:排序顺序，asc、desc、none
  //orderBy：根据某一字段排序
  //items：表头元素
  //hasCheckbox:表头是否有复选框
  //isAllCheck：是否全选
  //onSelectAllClick：全选后的逻辑处理
  //CheckboxColor：CheckBox的颜色，默认是MUI的Primary
  //ifLinefeed:判断是否根据items.label进行换行
  //ifIndeterminate:判断是否启用不确定状态
  //select:选中的内容
  const {
    order = 'none',
    orderBy,
    items,
    onRequestSort = () => { },
    hasCheckbox = false,
    showColumns,
    handleSelectAll = () => { },
    handleUnselectAll = () => { },
    CheckboxColor,
    checkboxIcon,
    checkboxCheckedIcon,
    checkboxindeterminateIcon,
    forUserTable,
    color = '#596A7C',
    backgroundColor = '#f1f3f5',
    ifLinefeed = false,
    ifIndeterminate = false,
    selected = [],
    PaddingLeft = '24px',
    Header0PaddingLeft = '24px',
    allNum,
  } = props;
  const dispatch = useDispatch();

  const createSortHandler = property => event => {
    onRequestSort(event, property);
    // console.log(`property: ${property}`);
    // console.log(`orderBy: ${orderBy}`)
  };
  let paddingVertical = '12px';
  const doubleLine = [
    'JOURNAL CODE',
    'SI PUBLICATION FORMAT',
    'OPEN FOR SUBMISSION DATE',
    'SUBMISSION DEADLINE',
    'EXPECTED ACCEPTANCE DATE',
    'EXPECTED PUBLICATION DATE',
    'CLOSED FOR SUBMISSION',
    'PAPER COMMISSIONING METHOD',
    'ACTUAL PUBLICATION DATE',
    'NUMBER OF OO ARTICLE',
    'NUMBER OF OA ARTICLE',
    'LAST ACTION DATE',
  ];
  const ChooseHeadFormatByLabel = (label, index) => {
    if (!ifLinefeed || !showColumns[index]) return label;
    if (doubleLine.includes(label)) {
      paddingVertical = '3px';
      switch (label) {
        case 'JOURNAL CODE':
          return 'JOURNAL\nCODE';
        case 'SI PUBLICATION FORMAT':
          return 'SI PUBLICATION\nFORMAT';
        case 'SUBMISSION DEADLINE':
          return 'SUBMISSION\nDEADLINE';
        case 'NUMBER OF OA ARTICLE':
          return 'NUMBER\nOF OA ARTICLE';
        case 'NUMBER OF OO ARTICLE':
          return 'NUMBER\nOF OO ARTICLE';
        case 'PAPER COMMISSIONING METHOD':
          return 'PAPER\nCOMMISSIONING METHOD';
        case 'ACTUAL PUBLICATION DATE':
          return 'ACTUAL\nPUBLICATION DATE';
        case 'LAST ACTION DATE':
          return 'LAST\nACTION DATE';
        case 'CLOSED FOR SUBMISSION':
          return 'CLOSED FOR\nSUBMISSION';
        case 'EXPECTED ACCEPTANCE DATE':
          return 'EXPECTED\nACCEPTANCE DATE';
        case 'EXPECTED PUBLICATION DATE':
          return 'EXPECTED\nPUBLICATION DATE';
        case 'OPEN FOR SUBMISSION DATE':
          return 'OPEN FOR\nSUBMISSION DATE';
        default:
          return label;
      }
    } else {
      return label;
    }
  };
  // 改变标题行的颜色
  const NewStyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: backgroundColor,
      color: color,
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '18px',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    [`&.${tableCellClasses.root}`]: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: PaddingLeft,
      paddingRight: '24px',
      maxWidth: '260px',
    },
  }));

  return (
    <TableHead>
      <TableRow>
        {items.map((item, index) => (
          <NewStyledTableCell
            key={item.id}
            align={item.align}
            sx={{
              maxWidth: item.maxWidth,
              minWidth: item.minWidth,
              display:
                showColumns && !showColumns[index] ? 'none' : 'table-cell',
              ...(item.sx ?? {}),
            }}
            sortDirection={orderBy === item.id ? order : false}
            style={{
              position: item.stick ? 'sticky' : '',
              left: item.stick ? item.stickPX : '',
              zIndex: item.stick ? 6 : '',
            }}
          >
            {!item.isOrder ? (
              //<Box id={`myTableHeaderItem${index}`}>{item.label}</Box>

              <Box
                id={`myTableHeaderItem${index}`}
                style={{
                  whiteSpace: 'nowrap',
                  paddingTop: paddingVertical,
                  paddingBottom: paddingVertical,
                  // paddingLeft: '24px',
                }}
              >
                {ChooseHeadFormatByLabel(item.label, index)}
              </Box>
            ) : (
              <TableSortLabel
                id={`myTableHeaderItem${index}`}
                active={orderBy === item.id}
                direction={orderBy === item.id ? order : 'asc'}
                onClick={item.isOrder ? createSortHandler(item.id) : null}
                hideSortIcon
                style={{
                  //index===0? is the header "SI CODE", beacuse of the timePassedClock(defined in IssueTable) so it need more 24px
                  paddingLeft:
                    item.stick && !hasCheckbox
                      ? index === 0
                        ? '64px'
                        : '40px'
                      : index === 0
                        ? Header0PaddingLeft
                        : '0px',
                  whiteSpace: 'pre-line',
                }}
              >
                {ChooseHeadFormatByLabel(item.label, index)}
                {orderBy === item.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </NewStyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export function TableFooter(props) {
  const {
    numSelected = 0,
    Page,
    perPageNumber,
    perPageList,
    count,
    handlePerPageChange,
    handlePageChange,
    width = '100%',
    backgroundColor = '#f1f3f5',
    ...others
  } = props;

  return (
    <Box
      display='flex'
      sx={{
        background: backgroundColor,
        pl: 0,
        pr: 0,
        width: width,
        borderRadius: '0px 0px 8px 8px',
        border: '1px solid #DFE4E8',
        borderTop: 'none',
      }}
      paddingY='3px'
      {...others}
    >
      <Stack
        // container
        direction='row'
        spacing={2}
        sx={{ width: '100%' }}
        justifyContent='center'
        alignItems='center'
      >
        <Grid item md={3} alignItems='center' justifyContent='center'>
          {/* <span id="tableFooterSelectedText" style={{ fontSize: "small", textAlign: 'center' }}> */}
          <Stack
            direction='row'
            justifyContent='flex-end'
            alignItems='center'
            spacing={1}
          >
            <span
              style={{
                fontFamily: 'Open Sans',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: 'small',
                lineHeight: '18px',
                color: '#262E35',
              }}
            >
              Selected Items: 
            </span>

            {numSelected ? (
              <span
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 800,
                  fontSize: 'small',
                  lineHeight: '18px',
                  color: '#262E35',
                }}
              >
                {numSelected}
              </span>
            ) : (
              <></>
            )}
          </Stack>
          {/* </span> */}
        </Grid>
        <Grid item container md={6} justifyContent='center' alignItems='center'>
          <Pagination
            id='tableFooterPagination'
            count={Math.ceil(count / perPageNumber)}
            shape='rounded'
            onChange={handlePageChange}
            page={Page}
            variant='text'
            renderItem={item => (
              <PaginationItem
                {...item}
                id={`tableFooterPage${item.page}`}
                selected={false}
                sx={{
                  backgroundColor:
                    item.selected && item.type === 'page'
                      ? '#113D95'
                      : 'transparent',
                  color:
                    item.selected && item.type === 'page'
                      ? '#F4F5F7'
                      : '#596A7C',
                  fontWeight: item.type !== 'page' ? 'bold' : 'regular',
                  '&:hover': {
                    color: '#596A7C',
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid item md={3} alignItems='center' justifyContent='center'>
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={1}
          >
            <span
              id='tableFooterRowsPerPageText'
              style={{ fontSize: 'small', fontWeight: '600', color: '#262E35' }}
            >
              Rows per page: 
            </span>
            <FormControl
              id='tableFooterPageSelectFormControl'
              sx={{ minWidth: 50 }}
            >
              <Select
                id='tableFooterRowsPerPageSelect'
                sx={{ fontSize: 'small', fontWeight: '600', color: '#262E35' }}
                value={perPageNumber}
                onChange={handlePerPageChange}
                input={<Input disableUnderline={true} />}
              >
                {perPageList.map(num => (
                  <MenuItem
                    id={`tableFooterRowsPerPagePageSize${num}`}
                    key={'pageSize-' + num}
                    value={num}
                  >
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
      </Stack>
    </Box>
  );
}

export function NewTableHeader(props) {
  //order:排序顺序，asc、desc、none
  //orderBy：根据某一字段排序
  //items：表头元素
  //hasCheckbox:表头是否有复选框
  //isAllCheck：是否全选
  //onSelectAllClick：全选后的逻辑处理
  //CheckboxColor：CheckBox的颜色，默认是MUI的Primary
  const { items, color = '#505050', backgroundColor = '#E3E8F2' } = props;

  // 改变标题行的颜色
  const NewStyledTableCell = styled(TableCell)(props => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: backgroundColor,
      color: color,
      // backgroundColor: "green",
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '18px',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    [`&.${tableCellClasses.root}`]: {
      height: '43px',
      padding: 0,
      paddingLeft: lastCell(props.index, props.length),
      paddingRight: props.index == props.length - 1 ? '24px' : 0,
    },
  }));

  const lastCell = (index, length) => {
    if (index == length - 1) {
      return '24px';
    } else {
      return '24px';
    }
  };

  return (
    <TableHead>
      <TableRow>
        {items.map((item, index) => (
          <NewStyledTableCell
            index={index}
            length={items.length}
            style={{ 'text-transform': 'capitalize' }}
            key={item.id}
            align={item.align ? item.align : 'left'}
            sx={{
              maxWidth: item.maxWidth,
              minWidth: item.minWidth,
            }}
          >
            <Box id={`myTableHeaderItem${index}`}>{item.label}</Box>
          </NewStyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
