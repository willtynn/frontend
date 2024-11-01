import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    Box,
    Stack,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    InputAdornment,
    TablePagination
} from '@mui/material';
import {useIntl} from 'react-intl';
import {KubeConfirmButton} from '@/components/Button';
import {fetchAllDataSources} from '@/actions/dataSourceAction';
import {StyledTableContainer, StyledTableBodyCell} from '@/components/DisplayTable';
import Task from '@/assets/Task.svg';
import {NormalBoldFont, SmallLightFont} from '@/components/Fonts';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";


export default function DataSourceComponent() {
    const [tableData, setTableData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // 搜索框的状态
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10); // 每页显示的行数


    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 初始化 useNavigate 钩子用于详情页面跳转
    const dataSources = useSelector(state => state.DataSource.dataSources);

    useEffect(() => {
        dispatch(fetchAllDataSources());
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(dataSources)) {
            const formattedData = dataSources.map(source => ({
                name: source.name,
                description: source.description,
                typesCount: source.types ? source.types.length : 0,
            }));
            setTableData(formattedData);
        } else {
            setTableData([]);
        }
    }, [dataSources]);

    // 使用 useCallback 确保 handleSearch 引用最新的 searchTerm 值
    const handleSearch = useCallback(() => {
        setTableData(
            dataSources
                .filter(source => source.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(source => ({
                    name: source.name,
                    description: source.description,
                    typesCount: source.types ? source.types.length : 0,
                }))
        );
        setPage(0); // 搜索后重置到第一页
    }, [dataSources, searchTerm]);

    // 切换分页
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // 更改每页显示的行数
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // 重置到第一页
    };

    const headFirstRow = [
        {id: 'dataSourceName', label: intl.messages['dataSource.dataSourceName'], minWidth: 150, align: 'left'},
        {id: 'dataSourceDes', label: intl.messages['dataSource.dataSourceDes'], minWidth: 150, align: 'left'},
        {id: 'dataSourceTypes', label: intl.messages['dataSource.dataSourceTypes'], minWidth: 150, align: 'left'}
    ];


    return (
        <Box sx={{p: 3}}>
            <Stack direction="row" spacing={2} sx={{mb: 2, alignItems: 'center'}}>
                {/* 搜索框 */}
                <TextField
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={intl.messages['dataSource.dataSourceSearchPrompt']}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSearch(); // 回车执行搜索
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        style: {
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#36435c',
                            backgroundColor: '#EFF4F9',
                            padding: '4px 12px',
                            borderRadius: '20px', // 增加圆角
                            height: '36px', // 调整高度
                        }
                    }}
                    sx={{
                        width: '900px',
                        '& .MuiOutlinedInput-root': {
                            paddingRight: '8px',
                            '& fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                            },
                            '&:hover fieldset': {
                                borderColor: '#000',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#55bc8a',
                                boxShadow: '0 4px 8px 0 rgba(85,188,138,.2)',
                            },
                            borderRadius: '20px' // 增加圆角
                        }
                    }}
                />

                <Box sx={{ flexGrow: 1 }} /> {/* 用于将按钮推到右边 */}

                <KubeConfirmButton
                    sx={{width: '150px'}}
                    onClick={handleSearch}
                >
                    {intl.messages['dataSource.query']}
                </KubeConfirmButton>
            </Stack>

            <StyledTableContainer sx={{bgcolor: '#FFF'}}>
                <Table stickyHeader size="small" sx={{tableLayout: 'auto'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ padding: '4px 8px', width: '40px' ,textAlign: 'center', verticalAlign: 'middle'}} /> {/* 图标列 */}
                            {headFirstRow.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth, color: '#333', fontSize: '12px', fontWeight: 'bold'}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.length > 0 ? (
                            tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Task style={{ width: 35, height: 35 }} />
                                    </TableCell>
                                    {/*数据源名称列*/}
                                    <StyledTableBodyCell
                                        sx = {{
                                            fontWeight: 'bold',
                                            color: '#000',
                                            cursor: 'pointer',
                                            '&:hover': { color: '#2e7d32' } // 深绿色
                                        }}
                                        onClick={() => navigate(`/detail/dataSource/${row.name}`)} // 跳转到详情页面
                                    >
                                        {row.name}
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.description}</StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.typesCount}</StyledTableBodyCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow style={{height: '220px'}}>
                                <TableCell colSpan={3} align="center">
                                    <Task />
                                    <NormalBoldFont>
                                        {intl.messages['dataSource.noData']}
                                    </NormalBoldFont>
                                    <SmallLightFont>
                                        {intl.messages['dataSource.noDataHint']}
                                    </SmallLightFont>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </StyledTableContainer>

            {/* 分页控件 */}
            <TablePagination
                component="div"
                count={tableData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[1, 2, 10, 100]}
                labelRowsPerPage={intl.messages['dataSource.numsPerPage']}
                labelDisplayedRows={({ from, count, page }) => `${page + 1} of ${Math.ceil(count / rowsPerPage)}`} // 自定义显示格式
            />
        </Box>
    );
}
