import { useEffect, useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Stack,
    Popper,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material';
import { setSnackbarMessageAndOpen } from '../../../actions/snackbarAction';
import { SEVERITIES } from '../../../components/CommonSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { KubeConfirmButton } from '@/components/Button';
import {
    fontFamily,
    formatDatetimeString
} from '@/utils/commonUtils';
import {
    StyledTableContainer,
    StyledTableBodyCell,
    StyledTableFooter,
    StyledTableHead,
} from '@/components/DisplayTable';
import { ChipTextField } from '@/components/Input';
import StressTestingIcon from '@/assets/StressTesting.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useIntl } from 'react-intl';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { EclipseTransparentButton } from '@/components/Button';
import RunningIcon from '@/assets/RunningIcon.svg';
import PendingIcon from '@/assets/PendingIcon.svg';
import FailedIcon from '@/assets/FailedIcon.svg';
import SucceededIcon from '@/assets/SucceededIcon.svg';
import Question from '@/assets/Question.svg';
import { EvolutionProgress } from '../EvolutionProgress';
import { AlgorithmManage } from '.';
import Task from '@/assets/Task.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { useNavigate } from 'react-router-dom';
import {
    UPDATE_GROUP_EDIT,
    RESET_GROUP,
    RESET_PLAN,
    UPDATE_TEST_PLAN_PAGE_NUM,
    UPDATE_TEST_PLAN_PAGE_SIZE,
    getTestPlans,
} from '../../../actions/applicationAction';
import { StyledModal } from '../../../components/Modal';
import {
    evo_get_ana_alg_list,
    evo_modify,
    EVO_UPDATE_EVO_ANA_ALG
} from '../../../actions/evolutionAction';
import LeftArrow from '@/assets/WhiteLeftArrow.svg';
import RightArrow from '@/assets/WhiteRightArrow.svg';
import { set } from 'lodash';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function createRow(
    id,
    label,
    isOrder = true,
    minWidth,
    maxWidth,
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

const IDPattern = new RegExp(/^(ID|ID):/);
const namePattern = new RegExp(/^(名称|Algorithm Name):/);

export function AnalysisAlgList() {
    const intl = useIntl();
    const [planOpen, setPlanOpen] = useState(false);
    const [algorithmOpen, setAlgorithmOpen] = useState(false);
    const [showError, setShowError] = useState(false);

    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('ID');

    const [searchValue, setSearchValue] = useState('');
    const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);
    const searchSelectOpen = Boolean(searchSelectAnchorEl);
    const [searchBy, setSearchBy] = useState([
        intl.messages['common.name'],
        intl.messages['common.createTime'],
    ]);

    //TODO:此处只是权宜之计，上面的searchBy不能切换语言，而且考虑到setSearchBy暂未使用，所以干脆以不变的数组表示搜索项
    const searchByList = [
        "ID",
        "名称",
    ]

    const [colDisplay, setColDisplay] = useState([true, true, true]);
    const [customContentAnchorEl, setCustomContentAnchorEl] = useState(null);
    const customContentOpen = Boolean(customContentAnchorEl);

    const [searchList, setSearchList] = useState([]);

    const { pageSize, pageNum, evo_plans, ana_alg_list } = useSelector(state => {
        return {
            pageSize: state.Evolution.pageSize || [],
            pageNum: state.Evolution.pageNum || [],
            evo_plans: state.Evolution.evo_plans,
            ana_alg_list: state.Evolution.ana_alg_list,
        };
    });

    //表示想要跳转的页面框目标
    const [target,setTarget] = useState("create")
    //表示携带的算法数据
    const [Algorithm,setAlgorithm] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(evo_get_ana_alg_list("", ""));
    }, []);

    useEffect(() => {
        searchByTwo();
    }, [searchList]);

    useEffect(() => {
        // setTableData(evolutionPlans);
        setTableData(ana_alg_list);
    }, [ana_alg_list]);

    const headRow = [
        createRow(
            'algorithmID',
            "ID",
            true,
            '30px',
            '30px',
            true,
            'center'
        ),
        createRow(
            'algorithmName',
            "Algorithm Name",
            false,
            '100px',
            '100px',
            colDisplay[0],
            'center'
        ),
        createRow(
            'description',
            "description",
            false,
            '400px',
            '400px',
            colDisplay[1],
            'center'
        ),
        createRow(
            'type',
            "type",
            false,
            '120px',
            '130px',
            colDisplay[2],
            'center'
        ),
    ];

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const filtering = () => {
        let tmpData = JSON.parse(JSON.stringify(tableData));
        setCount(tableData.length);
        searchList.forEach((value, _) => {
            if (value.startsWith(`${intl.messages['common.createTime']}:`)) {
                tmpData = tmpData.filter((tableRow, _) => {
                    return tableRow.cre_time.includes(value.replace(IDPattern, ''));
                });
            } else if (value.startsWith(`${intl.messages['common.name']}:`)) {
                tmpData = tmpData.filter((tableRow, _) => {
                    return tableRow.evo_name.includes(value.replace(namePattern, ''));
                });
            } else {
                tmpData = tmpData.filter((tableRow, _) => {
                    return tableRow.testPlanName.includes(value);
                });
            }
        });
        return tmpData;
    };

    const searchByTwo = () => {
        const listSearchName = [];
        const listSearchID = [];
        searchList.forEach((value, _) => {
            if (value.startsWith(`${"ID"}:`)) {
                listSearchID.push(value.replace(IDPattern, ''))
            } else if (value.startsWith(`${"名称"}:`)) {
                listSearchName.push(value.replace(namePattern, ''))
            } else {
                return ana_alg_list;
            }
        });

        //暂时先只允许第一个参数起效
        //TODO 后续可能需要改成允许同时查询多个名称
        if (listSearchName.length != 0 && listSearchID != 0) {
            dispatch(evo_get_ana_alg_list(listSearchName[0], listSearchID[0]))
        } else if (listSearchName.length != 0) {
            dispatch(evo_get_ana_alg_list(listSearchName[0], ""))
        } else if (listSearchID.length != 0) {
            dispatch(evo_get_ana_alg_list("", listSearchID[0]))
        } else {
            dispatch(evo_get_ana_alg_list("", ""))
        }

    };

    const visibleRows = useMemo(() => {
        //当前算法的总数是ana_alg_list中的长度
        setCount(ana_alg_list.length);
        //如果页码超过了最大页码就返回1
        if (pageSize * (pageNum - 1) > count) {
            dispatch({ type: UPDATE_TEST_PLAN_PAGE_NUM, data: 1 });
            return ana_alg_list.slice(
                0,
                pageSize
            );
        }
        return ana_alg_list.slice(
            (pageNum - 1) * pageSize,
            (pageNum - 1) * pageSize + pageSize
        );
    }, [pageNum, pageSize, searchList, ana_alg_list]);

    //改变每页的数量
    const handlePerPageChange = pageSize => {
        dispatch({ type: UPDATE_TEST_PLAN_PAGE_SIZE, data: pageSize });
    };

    //改变页码
    const handlePageChange = (_event, newPage) => {
        //页码小于1直接返回
        if (newPage <= 0) {
            return;
        }
        console.log(newPage)
        dispatch({ type: UPDATE_TEST_PLAN_PAGE_NUM, data: newPage });
    };

    const handleSearchByClick = by => {
        setSearchValue(by + ':');
        var text = document.getElementById('instance-status-search-input');
        text.focus();
    };

    const resetParameters = () => {
        dispatch({ type: UPDATE_GROUP_EDIT, data: false });
        dispatch({ type: RESET_PLAN });
        dispatch({ type: RESET_GROUP });
    };

    const isDuplicate = () => {
        return false;
    };

    //处理管理创建算法框打开关闭的函数
    const handleAlgorithmClick = () => {
        setAlgorithmOpen(true);
    }
    const handleAlgorithmConfirmClick = () => {
        setAlgorithmOpen(false);
    };
    const handleAlgorithmClose = () => {
        setAlgorithmOpen(false);
    };
    const handleAlgorithmCancelClick = () => {
        setAlgorithmOpen(false);
    };

    const handleSearchFocus = event => {
        if (searchBy.length === 0) {
            return;
        }
        if (searchValue === '') {
            setSearchSelectAnchorEl(event.currentTarget);
        }
    };

    const handleSearchBlur = () => {
        setTimeout(() => {
            setSearchSelectAnchorEl(null);
        }, 300);
    };

    const handleEyeClick = event => {
        setCustomContentAnchorEl(event.currentTarget);
    };

    const handleEyeClose = () => {
        setCustomContentAnchorEl(null);
    };

    const handleColEyeClick = index => {
        setColDisplay(prevDisplay => {
            let tmpDisplay = JSON.parse(JSON.stringify(prevDisplay));
            tmpDisplay[index] = !tmpDisplay[index];
            return tmpDisplay;
        });
    };

    const handleRefresh = () => {
        setSearchList([]);
    }


    return (
        <Stack>
            <Box
                sx={{
                    borderRadius: '4px',
                    backgroundColor: '#FFFFFF',
                    padding: '24px 20px',
                    width: 'calc(100% - 40px)',
                    height: '58px',
                    mb: '12px',
                }}
            >
                <Stack direction='row' spacing={1}>
                    <StressTestingIcon />
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontStyle: 'normal',
                                color: '#242e42',
                                textShadow: '0 4px 8px rgba(36,46,66,.1)',
                                fontSize: '24px',
                                lineHeight: '32px',
                            }}
                        >
                            {intl.messages['evolution.analysisAlgorithm']}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontStyle: 'normal',
                                color: '#79879c',
                                fontSize: '12px',
                                lineHeight: 1.67,
                            }}
                        >
                            {intl.messages['evolution.analysisAlgorithmDes']}
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Box>
                {/* 条件过滤悬浮框 */}
                <Popper
                    id='instance-status-table-search-popper'
                    open={searchSelectOpen}
                    anchorEl={searchSelectAnchorEl}
                    placement='bottom-start'
                    sx={{
                        zIndex: 1000,
                        boxShadow: '0 4px 16px 0 rgba(39,50,71,.28)',
                        borderRadius: '4px',
                        mt: '2px !important',
                    }}
                >
                    <Stack
                        direction='column'
                        sx={{
                            border: '1px solid #FAFAFA',
                            width: '90px',
                            borderRadius: '5px',
                            padding: '8px',
                            bgcolor: '#242e42',
                            fontSize: '12px',
                            fontFamily: fontFamily,
                        }}
                    >
                        {searchByList.map((value, index) => {
                            return (
                                <Box
                                    sx={{
                                        '&:hover': {
                                            bgcolor: '#36435c',
                                        },
                                        color: '#FFFFFF',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        height: '30px',
                                        lineHeight: '30px',
                                        fontWeight: 600,
                                    }}
                                    onClick={handleSearchByClick.bind(this, value)}
                                >
                                    {value}
                                </Box>
                            );
                        })}
                    </Stack>
                </Popper>

                {/* 选择内容悬浮框 */}
                <Popover
                    id='instance-status-table-custom-content-popover'
                    open={customContentOpen}
                    anchorEl={customContentAnchorEl}
                    onClose={handleEyeClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    sx={{
                        zIndex: 1000,
                        boxShadow: '0 4px 16px 0 rgba(39,50,71,.28)',
                        borderRadius: '4px',
                        mt: '2px !important',
                    }}
                >
                    <Stack
                        direction='column'
                        sx={{
                            width: '150px',
                            borderRadius: '5px',
                            padding: '8px',
                            bgcolor: '#242e42',
                            fontSize: '12px',
                            fontFamily: fontFamily,
                        }}
                    >
                        {colDisplay.map((value, index) => {
                            return (
                                <Stack
                                    direction='row'
                                    onClick={handleColEyeClick.bind(this, index)}
                                    sx={{
                                        color: '#FFFFFF',
                                        '&:hover': {
                                            bgcolor: '#36435c',
                                        },
                                        p: '0px 8px',
                                    }}
                                    justifyContent='flex-start'
                                    alignItems='center'
                                    spacing={1}
                                >
                                    {value === true ? (
                                        <VisibilityIcon fontSize='small' />
                                    ) : (
                                        <VisibilityOffIcon fontSize='small' />
                                    )}
                                    <Box
                                        sx={{
                                            color: '#FFFFFF',
                                            cursor: 'pointer',
                                            height: '30px',
                                            lineHeight: '30px',
                                            fontWeight: 600,
                                            letterSpacing: '0.04em',
                                        }}
                                    >
                                        {headRow[index + 1].label}
                                    </Box>
                                </Stack>
                            );
                        })}
                    </Stack>
                </Popover>

                <Box
                    sx={{
                        height: '32px',
                        padding: '10px 30px 10px 30px',
                        bgcolor: '#f9fbfd',
                    }}
                >
                    <Stack direction='row' spacing={2}>
                        <ChipTextField
                            value={searchValue}
                            setValue={setSearchValue}
                            contentList={searchList}
                            setContentList={setSearchList}
                            isDuplicate={isDuplicate}
                            startAdornment={<SearchIcon />}
                            sx={{
                                width: 'calc(100% - 600px)',
                                '& .MuiOutlinedInput-input.MuiInputBase-input': {
                                    // padding: '6px 12px !important',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    fontStyle: 'normal',
                                    fontStretch: 'normal',
                                    lineHeight: 1.67,
                                    letterSpacing: 'normal',
                                    color: '#36435c',
                                    height: '20px',
                                },
                            }}
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                            enterBlur={true}
                            id='instance-status-search-input'
                        />
                        <EclipseTransparentButton
                            sx={{
                                bgcolor: '#f9fbfd !important',
                                '&:hover': {
                                    bgcolor: '#FFFFFF !important',
                                },
                                '& svg': {
                                    color: '#3d3b4f',
                                },
                                height: '32px',
                            }}
                            onClick={handleRefresh}
                        >
                            <RefreshIcon />
                        </EclipseTransparentButton>

                        <EclipseTransparentButton
                            sx={{
                                bgcolor: '#f9fbfd !important',
                                '&:hover': {
                                    bgcolor: '#FFFFFF !important',
                                },
                                '& svg': {
                                    color: '#3d3b4f',
                                },
                                height: '32px',
                            }}
                            onClick={handleEyeClick}
                        >
                            <VisibilityIcon />
                        </EclipseTransparentButton>
                        {/* 管理演化功能相关的分析算法和执行算法 */}
                        <KubeConfirmButton
                            sx={{
                                width: '200px',
                            }}
                            onClick={() =>{
                                setTarget("create");
                                handleAlgorithmClick();
                            }}
                        >
                            {intl.messages['evolution.createAnalysisAlgorithm']}
                        </KubeConfirmButton>
                    </Stack>
                </Box>

                {/* <StyledTableBox> */}
                <StyledTableContainer sx={{ bgcolor: '#FFF' }}>
                    <Table
                        stickyHeader
                        size='small'
                        sx={{
                            tableLayout: 'auto',
                        }}
                    >
                        <StyledTableHead
                            headRow={headRow}
                            selectAll={false}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {!loading && visibleRows !== null && visibleRows.length !== 0 ? (
                                visibleRows.map((row, index) => {
                                    return (
                                        <TableRow
                                            key={row.analyze_id + '' + index}
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
                                            <StyledTableBodyCell
                                                align={'center'}
                                                sx={{
                                                    padding: '6px 16px !important',
                                                    width: '30px',
                                                }}
                                            >
                                                <Stack alignItems='center' direction='row' spacing={2}>
                                                    <Task />
                                                    <Box
                                                        sx={{
                                                            height: '40px',
                                                            lineHeight: '40px',
                                                            fontWeight: 600,
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                color: '#55bc8a',
                                                            },
                                                        }}
                                                    >
                                                        {row.analyze_id}
                                                    </Box>
                                                </Stack>
                                            </StyledTableBodyCell>
                                            <StyledTableBodyCell
                                                align={'center'}
                                                sx={{
                                                    display: headRow[1].show ? 'table-cell' : 'none',
                                                    width: '100px',
                                                }}
                                            >

                                                <Box
                                                    sx={{
                                                        height: '30px',
                                                        lineHeight: '30px',
                                                        fontWeight: 600,
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            color: '#55bc8a',
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        if(row.analyze_content == null){
                                                            dispatch(
                                                                setSnackbarMessageAndOpen(
                                                                    'common.errorMessage',
                                                                    { msg: "暂不允许修改系统算法" },
                                                                    SEVERITIES.warning
                                                                )
                                                            );
                                                            return;
                                                        }
                                                        setTarget("analysis");
                                                        dispatch({type:EVO_UPDATE_EVO_ANA_ALG,data:row})
                                                        handleAlgorithmClick();

                                                    }}
                                                >
                                                    {row.analyze_name}
                                                </Box>

                                            </StyledTableBodyCell>
                                            <StyledTableBodyCell
                                                align={'center'}
                                                sx={{
                                                    display: headRow[2].show ? 'table-cell' : 'none',
                                                }}
                                            >
                                                {row.analyze_text}
                                            </StyledTableBodyCell>
                                            <StyledTableBodyCell
                                                align={'center'}
                                                sx={{
                                                    display: headRow[3].show ? 'table-cell' : 'none',
                                                }}
                                            >
                                                {row.analyze_content == null ? intl.messages['evolution.system'] : intl.messages['evolution.user']}
                                            </StyledTableBodyCell>
                                        </TableRow>
                                    );
                                })
                            ) : !loading ? (
                                <TableRow style={{ height: '220px' }}>
                                    <TableCell
                                        colSpan={colDisplay.reduce(
                                            (accumulator, currentValue) =>
                                                accumulator + (currentValue === true),
                                            2
                                        )}
                                        sx={{
                                            textAlign: 'center',
                                            fontSize: '20px',
                                            fontFamily: fontFamily,
                                            fontStyle: 'normal',
                                        }}
                                    >
                                        <Question />
                                        <NormalBoldFont>
                                            {intl.messages['common.serviceTableContentNoData']}
                                        </NormalBoldFont>

                                        <SmallLightFont>
                                            {intl.messages['common.serviceTableContentNoDataHint']}
                                        </SmallLightFont>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <div></div>
                            )}
                        </TableBody>
                    </Table>
                </StyledTableContainer>

                <StyledTableFooter
                    pageNum={pageNum}
                    pageSize={pageSize}
                    perPageList={[10, 20, 50, 100]}
                    count={count}
                    handlePerPageChange={handlePerPageChange}
                    handlePageChange={handlePageChange}
                    sx={{
                        pt: '12px',
                        pb: '12px',
                    }}
                />
            </Box>
            {/* 创建算法框 */}
            <StyledModal open={algorithmOpen} onClose={handleAlgorithmClose}>
                <AlgorithmManage
                    handleConfirmClick={handleAlgorithmConfirmClick}
                    handleCancelClick={handleAlgorithmCancelClick}
                    target={target}
                    type={"analysis"}
                />
            </StyledModal>
        </Stack>
    );
}
