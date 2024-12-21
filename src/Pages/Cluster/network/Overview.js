import { useEffect, useState, useMemo, forwardRef } from 'react';
import { StyledModal } from '../../../components/Modal';
import {
    StyledTableContainer,
    StyledTableBodyCell,
    StyledTableFooter,
    StyledTableHead,
} from '@/components/DisplayTable';
import { ContainedButton, KubeConfirmButton } from '@/components/Button';
import {
    TableRow,
    Box,
    Table,
    TableCell,
    TableBody,
    Popover,
    Popper,
    Stack,
    TextField,
    Slide,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { transformVersion } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import Task from '@/assets/Task.svg';
import Delete16 from "@/assets/Delete16.svg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from 'react-redux';
import { StyledAutocomplete, ChipTextField } from '../../../components/Input';
import {
    CHANGE_PAGE_NUM,
    CHANGE_PAGE_SIZE,
    RESET_CONTROL,
    UPDATE_CONTROL_EDIT,
    UPDATE_NETWORK_CONTROL_INFO,
    DELETE_BANDWIDTH_CONTROL,
    getAllNetworkControlInfo,
    getNetworkControlInfo,
    deleteBandwidthControl,
    UPDATE_ALL_NETWORK_CONTROL_INFO, setBandwidthControl,
} from '../../../actions/clusterAction';
import { EclipseTransparentButton } from '../../../components/Button';
import { KubeCheckbox } from '../../../components/Checkbox';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { useIntl } from 'react-intl';
import {
    SERVICE_TAG,
    SEARCHLIST_FLAG,
    PAGE_NUM_FLAG,
    PAGE_SIZE_FLAG,
    ORDER_BY_FLAG,
    ORDER_FLAG,
} from '../../../utils/page_persist';

import { SetBandwidth } from './setBandwidth';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function createRow(
    id,
    label,
    isOrder = true,
    minWidth = '110px',
    maxWidth = '120px',
    show = true,
    colSpan = 1,
    rowSpan = 1,
    align
) {
    return {
        id,
        label,
        isOrder,
        minWidth,
        maxWidth,
        show,
        colSpan,
        rowSpan,
        align,
    };
}

const localIPPattern = new RegExp(/^(源Ip|LocalIp):/);

export default function NetworkNodeControl(props) {
    const { data, embeddingButton } = props;
    const SEARCHLIST_TAG = `${SERVICE_TAG}_${SEARCHLIST_FLAG}`;
    const PAGE_NUM_TAG = `${SERVICE_TAG}_${PAGE_NUM_FLAG}`;
    const PAGE_SIZE_TAG = `${SERVICE_TAG}_${PAGE_SIZE_FLAG}`;
    const ORDER_TAG = `${SERVICE_TAG}_${ORDER_FLAG}`;
    const ORDER_BY_TAG = `${SERVICE_TAG}_${ORDER_BY_FLAG}`;
    const intl = useIntl();
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState(null);
    const [projectList, setProjectList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [filteredData, setFilteredData] = useState(data || []);
    const [tableData, setTableData] = useState(data || []);
    const [count, setCount] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);
    const searchSelectOpen = Boolean(searchSelectAnchorEl);
    const [searchBy, setSearchBy] = useState([
        intl.messages['cluster.localIp'],
    ]);
    const [colDisplay, setColDisplay] = useState([true, true, true, true]);
    const [customContentAnchorEl, setCustomContentAnchorEl] = useState(null);
    const customContentOpen = Boolean(customContentAnchorEl);
    const [checkAll, setCheckAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [AddOpen, setAddOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const selectFlag = selectedItems && selectedItems.length > 0;
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { networkControlInfo, pageSize, pageNum } = useSelector(state => {
        return {
            networkControlInfo: state.Cluster.networkControlInfo,
            pageSize: state.Cluster.pageSize,
            pageNum: state.Cluster.pageNum,
        };
    });

    const [allData, setAllData] = useState(data || []);

    useEffect(() => {
        if (data) {
            setAllData(data);
            setTableData(data);
            setFilteredData(data);
            setCount(data.length); // 更新记录数
        }
    }, [data]);

    /*useEffect(() => {
        const fetchData = async () => {
            const result = await dispatch(getAllNetworkControlInfo());
            console.log('Fetched data:', result);
            if (result && Array.isArray(result)) {
                setAllData(result);
            } else {
                setAllData([]); // 确保 allData 为数组
            }
        };
        fetchData();
    }, [dispatch]);

     */

    /*useEffect(() => {
        const fetchData = async () => {
            const ips = ['192.168.1.104','192.168.1.171','192.168.1.172','192.168.1.173','192.168.1.181'];
            const promises = ips.map(ip => dispatch(getNetworkControlInfo(ip)));
            const results = await Promise.all(promises);
            console.log('Fetched data:', results);
            setAllData(results.filter(item => item !== null));
        };
        fetchData();
    }, [dispatch]);

     */

    const headFirstRow = [
        createRow(
            'localIp',
            intl.messages['cluster.localIp'],
            false,
            '220px',
            '240px',
            true,
            1,
            1,
            'left'
        ),
        createRow(
            'targetIp',
            intl.messages['cluster.targetIp'],
            false,
            '220px',
            '240px',
            colDisplay[1],
            1,
            1,
            'center'
        ),
        createRow(
            'bandWidth',
            intl.messages['cluster.bandWidth'],
            false,
            '220px',
            '240px',
            colDisplay[2],
            1,
            1,
            'center'
        ),
        createRow(
            'operation',
            intl.messages['cluster.operation'],
            false,
            '220px',
            '240px',
            colDisplay[3],
            1,
            1,
            'center',
        )
    ];

    useEffect(() => {
        //dispatch({ type: UPDATE_NETWORK_CONTROL_INFO, data: data });
        //dispatch({ type: UPDATE_ALL_NETWORK_CONTROL_INFO, data: data });
        const persistentOrderBy = localStorage.getItem(ORDER_BY_TAG);
        const persistentOrder = localStorage.getItem(ORDER_TAG);
        const persistentPageSize = localStorage.getItem(PAGE_SIZE_TAG);
        const persistentPageNum = localStorage.getItem(PAGE_NUM_TAG);
        const persistentSearchList = localStorage.getItem(SEARCHLIST_TAG);
        if (persistentOrderBy !== null) {
            setOrderBy(persistentOrderBy);
        }
        if (persistentOrder !== null) {
            setOrder(persistentOrder);
        }
        if (persistentPageSize !== null) {
            dispatch({ type: CHANGE_PAGE_SIZE, data: parseInt(persistentPageSize) });
        }
        if (persistentPageNum !== null) {
            dispatch({ type: CHANGE_PAGE_NUM, data: parseInt(persistentPageNum) });
        }
        if (persistentSearchList !== null) {
            setSearchList(JSON.parse(persistentSearchList));
        }
        return () => {
            localStorage.setItem(ORDER_BY_TAG, orderBy);
            localStorage.setItem(ORDER_TAG, order);
            localStorage.setItem(PAGE_SIZE_TAG, pageSize);
            localStorage.setItem(SEARCHLIST_TAG, JSON.stringify(searchList));
        };
    }, [dispatch, data, orderBy, order, pageSize, searchList]);

    useEffect(() => {
        if (projectList.length < 1) {
            return;
        }
        // setProject(projectList[0]);
    }, [projectList]);

    // 搜索栏提示list的更新
    useEffect(() => {
        setSearchBy([intl.messages['cluster.localIp']]);
    }, [intl.messages]);

    useEffect(() => {
        if (!allData) {
            return;
        }
        const tmpData = allData.map(value => ({
            localIp: value.localIp || '',
            targetIp: value.targetIp || '',
            bandWidth: value.bandWidth || value.defaultBandWidth || '',
        }));
        console.log('tmpData:', tmpData);
        setCount(tmpData.length);
        setTableData(tmpData);
        setFilteredData(tmpData);
    }, [allData]);



    useEffect(() => {
        if (searchValue) {
            const searchValueWithoutPrefix = searchValue.replace(localIPPattern, '');
            const filtered = tableData.filter(row => row.localIp.includes(searchValueWithoutPrefix));
            setFilteredData(filtered);
            setCount(filtered.length);
        } else {
            setFilteredData(tableData);
            setCount(tableData.length);
        }
    }, [searchValue, tableData]);

    const handleRequestSort = (_event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    };

    const visibleRows = useMemo(() => {
        let tmpData = JSON.parse(JSON.stringify(filteredData));
        if (pageSize * (pageNum - 1) > count && count > 0) {
            dispatch({ type: CHANGE_PAGE_NUM, data: 1 });
            return stableSort(tmpData, getComparator(order, orderBy)).slice(
                0,
                pageSize
            );
        }
        return stableSort(tmpData, getComparator(order, orderBy)).slice(
            (pageNum - 1) * pageSize,
            (pageNum - 1) * pageSize + pageSize
        );
    }, [order, orderBy, pageNum, pageSize, filteredData, count, dispatch]);

    useEffect(() => {
        if (checkAll) {
            setSelectedItems(previousSelectedItems => {
                return [
                    ...previousSelectedItems,
                    ...visibleRows.map((item) => {
                        return item.localIp;
                    }),
                ];
            });
        } else {
            setSelectedItems(previousSelectedItems => {
                const arr = visibleRows.map((row) => {
                    return row.localIp;
                });
                return previousSelectedItems.filter(item => !arr.includes(item));
            });
        }
    }, [checkAll, visibleRows]);

    useEffect(() => {
        setCheckAll(
            visibleRows
                .map((row) => {
                    return row.localIp;
                })
                .every((value) => selectedItems.includes(value))
        );
    }, [visibleRows, selectedItems]);

    useEffect(() => {
        if (!selectedItems || selectedItems.length === 0) {
            setCheckAll(false);
        }
    }, [selectedItems]);


    const isDuplicate = () => {
        return false;
    };


    // 改变每页的数量
    const handlePerPageChange = pageSize => {
        dispatch({ type: CHANGE_PAGE_SIZE, data: pageSize });
    };

    // 改变页码
    const handlePageChange = (_event, newPage) => {
        localStorage.setItem(PAGE_NUM_TAG, newPage);
        dispatch({ type: CHANGE_PAGE_NUM, data: newPage });
    };

    const handleSearchByClick = by => {
        setSearchValue(by + ':');
        var text = document.getElementById('network-search-input');
        text.focus();
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

    const handleEyeClick = (event) => {
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

    const handleAddClick = () => {
        setAddOpen(true);
    };

    const resetParameters = () => {
        dispatch({ type: UPDATE_CONTROL_EDIT, data: false });
        dispatch({ type: RESET_CONTROL });
    };

    const handleClose = () => {
        resetParameters();
        setAddOpen(false);
    };

    // const handleConfirmClick = () => {
    //     resetParameters();
    //     setAddOpen(false);
    // };

    const handleConfirmClick = async (newBandwidthData) => {
        const newData = await dispatch(setBandwidthControl(newBandwidthData));
        if (newData) {
            // 添加新数据到当前表格数据
            setTableData(prevData => [...prevData, newData]); // 直接更新 tableData
            setFilteredData(prevData => [...prevData, newData]); // 也更新过滤后的数据
            setCount(prevCount => prevCount + 1); // 增加记录数
        }
        resetParameters();
        setAddOpen(false);
        dispatch(getAllNetworkControlInfo());
    };

    const handleCancelClick = () => {
        resetParameters();
        setAddOpen(false);
    };

    // 删除处理函数
    const handleDelete = (localIp, targetIp) => {
        // 调用 deleteBandwidthControl action
        dispatch(deleteBandwidthControl(localIp, targetIp));

        // 更新本地状态
        const updatedData = tableData.filter(row => row.localIp !== localIp || row.targetIp !== targetIp);
        setTableData(updatedData);
        setFilteredData(updatedData);
    };


    return (
        <Box>
            {/* 条件过滤悬浮框 */}
            <Popper
                id='network-query-table-serch-popper'
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
                    {searchBy &&
                        searchBy.map((value, index) => {
                            return (
                                <Box
                                    key={index}
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

            {/* 眼睛悬浮框 */}
            <Popover
                id='network-query-table-custom-content-popover'
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
                        border: '1px solid #FAFAFA',
                        width: '150px',
                        borderRadius: '5px',
                        padding: '8px',
                        bgcolor: '#242e42',
                        fontSize: '12px',
                        fontFamily: fontFamily,
                    }}
                >
                    {headFirstRow.slice(1).map((value, index) => {
                        return (
                            <Stack
                                key={index}
                                direction='row'
                                onClick={handleColEyeClick.bind(this, index + 1)}
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
                                {colDisplay[index + 1] ? (
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
                                    {value.label}
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
                    <StyledAutocomplete
                        height='32px'
                        padding='6px 5px 5px 12px'
                        value={project}
                        onChange={(event, newValue) => {
                            setProject(newValue);
                        }}
                        id='network_table_autocomplete'
                        options={projectList}
                        sx={{
                            width: 300,
                            color: '#36435c',
                            fontFamily: fontFamily,
                            fontSize: '12px',
                            fontWeight: 600,
                            fontStyle: 'normal',
                            fontStretch: 'normal',
                            lineHeight: 1.67,
                            letterSpacing: 'normal',
                        }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder={intl.messages['cluster.allItems']}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />

                        )}
                    />
                    {/* 搜索栏 */}
                    <ChipTextField
                        value={searchValue}
                        setValue={setSearchValue}
                        contentList={searchList}
                        setContentList={setSearchList}
                        isDuplicate={isDuplicate}
                        startAdornment={<SearchIcon />}
                        sx={{
                            width: 'calc(100% - 300px)',
                            '& .MuiOutlinedInput-input.MuiInputBase-input': {
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
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // 阻止回车键的默认行为
                                const inputValue = e.target.value.replace(localIPPattern, '');
                                setSearchValue(inputValue); // 确保搜索值正确
                            }
                        }}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        enterBlur={true}
                        id='network-search-input'
                    />
                    {/* 刷新按钮 */}
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
                    >
                        <RefreshIcon />
                    </EclipseTransparentButton>
                    {/* 眼睛按钮 */}
                    <EclipseTransparentButton
                        sx={{
                            bgcolor: '#f9fbfd !重要',
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

                    <KubeConfirmButton
                        sx={{
                            width: '200px',
                        }}
                        onClick={handleAddClick}
                    >
                        {intl.messages['cluster.setBandwidth']}
                    </KubeConfirmButton>

                    <StyledModal open={AddOpen} onClose={handleClose}>
                        <SetBandwidth
                            handleConfirmClick={handleConfirmClick}
                            handleCancelClick={handleCancelClick}
                            showError={showError}
                            setShowError={setShowError}
                        />
                    </StyledModal>
                    {embeddingButton}
                </Stack>
            </Box>

            <StyledTableContainer sx={{ bgcolor: '#FFF' }}>
                <Table
                    stickyHeader
                    size='small'
                    sx={{
                        tableLayout: 'auto',
                    }}
                >
                    <StyledTableHead
                        headRow={headFirstRow}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />

                    <TableBody>
                        {!loading && visibleRows !== null && visibleRows.length !== 0 ? (
                            visibleRows &&
                            visibleRows.map((row, index) => {
                                return (
                                    <TableRow
                                        key={row.localIp + '' + index}
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

                                        {/* localIp */}
                                        <StyledTableBodyCell
                                            align={'center'}
                                            sx={{
                                                padding: '6px 16px !important',
                                            }}
                                        >
                                            <Stack alignItems='center' direction='row' spacing={2}>
                                                <Task />
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
                                                >
                                                    {row.localIp}
                                                </Box>
                                            </Stack>
                                        </StyledTableBodyCell>

                                        {/* targetIp */}
                                        <StyledTableBodyCell
                                            align={'center'}
                                            sx={{
                                                display: headFirstRow[1].show ? 'table-cell' : 'none',
                                            }}
                                        >
                                            {row.targetIp}
                                        </StyledTableBodyCell>

                                        {/* bandWidth */}
                                        <StyledTableBodyCell
                                            align={'center'}
                                            sx={{
                                                display: headFirstRow[2].show ? 'table-cell' : 'none',
                                            }}
                                        >
                                            {row.bandWidth}
                                        </StyledTableBodyCell>

                                        {/* operation */}
                                        <StyledTableBodyCell
                                            align={'center'}
                                            sx={{
                                                display: headFirstRow[3].show ? 'table-cell' : 'none',
                                            }}
                                        >
                                            <Tooltip title={intl.messages['common.delete']}>
                                                <Delete16
                                                    onClick={() => handleDelete(row.localIp, row.targetIp)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </Tooltip>

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
    );
}

