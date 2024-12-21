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
    TablePagination,
} from '@mui/material';
import {useIntl} from 'react-intl';
import {KubeConfirmButton} from '@/components/Button';
import {fetchAllAlgorithms} from '@/actions/algorithmAction';
import {StyledTableContainer, StyledTableBodyCell} from '@/components/DisplayTable';
import Task from '@/assets/Task.svg';
import {NormalBoldFont, SmallLightFont} from '@/components/Fonts';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
import AddAlgorithm from "../Form/add.js";
import Question from '@/assets/Question.svg';


export default function AnalysisAlgorithmComponent() {
    const [tableData, setTableData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // 搜索框的状态
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10); // 每页显示的行数
    const [open, setOpen] = useState(false); // 控制注册表单弹窗状态


    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 初始化 useNavigate 钩子用于详情页面跳转
    const algorithms = useSelector(state => state.AlgorithmReducer.allAlgorithms) || [];


    useEffect(() => {
        dispatch(fetchAllAlgorithms());
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(algorithms)) {
            const formattedData = algorithms
                .filter(source => source.type === 'analyze') // 过滤出type为plan的算法
                .map(source => ({
                id: source.id,
                name: source.name,
                info: source.info,
                type: source.type,
                input: source.input,
                output: source.output,
                url: source.url,
                createTime: source.createTime,
                updateTime: source.updateTime,
                parameter: source.parameter,
                isDelete:source.isDelete
            }));
            setTableData(formattedData);
        } else {
            setTableData([]);
        }
    }, [algorithms]);

    // 使用 useCallback 确保 handleSearch 引用最新的 searchTerm 值
    const handleSearch = useCallback(() => {
        setTableData(
            algorithms
                .filter(source => source.type === 'analyze') // 过滤出type为plan的算法
                .filter(source => source.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(source => ({
                    name: source.name,
                    info: source.info,
                    type: source.type,
                    input: source.input,
                    output: source.output,
                    url: source.url,
                    createTime: source.createTime,
                    updateTime: source.updateTime,
                    // parameter: source.parameter
                }))
        );
        setPage(0); // 搜索后重置到第一页
    }, [algorithms, searchTerm]);

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
        {id: 'name', label: intl.messages['evolution.name'], minWidth: 150, align: 'left'},
        {id: 'info', label: intl.messages['evolution.info'], minWidth: 150, align: 'left'},
        {id: 'type', label: intl.messages['evolution.type'], minWidth: 150, align: 'left'},
        {id: 'input', label: intl.messages['evolution.input'], minWidth: 150, align: 'left'},
        {id: 'output', label: intl.messages['evolution.output'], minWidth: 150, align: 'left'},
        {id: 'url', label: intl.messages['evolution.url'], minWidth: 150, align: 'left'},
        {id: 'createTime', label: intl.messages['evolution.createTime'], minWidth: 150, align: 'left'},
        {id: 'updateTime', label: intl.messages['evolution.updateTime'], minWidth: 150, align: 'left'},
        // {id: 'parameter', label: intl.messages['evolution.parameter'], minWidth: 150, align: 'left'},
    ];

    // 控制注册数据源表单
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    return (
        <Box sx={{p: 3}}>
            <Stack direction="row" spacing={2} sx={{mb: 2, alignItems: 'center'}}>
                {/* 搜索框 */}
                <TextField
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={intl.messages['evolution.algorithmSearchPrompt']}
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
                        width: '700px',
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

                {/*查询按钮*/}
                <KubeConfirmButton
                    sx={{width: '150px'}}
                    onClick={handleSearch}
                >
                    {intl.messages['evolution.query']}
                </KubeConfirmButton>

                {/*新增算法按钮*/}
                <KubeConfirmButton
                    sx={{width: '150px'}}
                    onClick={handleOpen}
                >
                    {intl.messages['evolution.addAlgorithm']}
                </KubeConfirmButton>
            </Stack>

            {/*新增算法弹窗 */}
            <AddAlgorithm open={open} handleClose={handleClose} />

            {/*算法展示表格内容*/}
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
                                    {/*算法名称列*/}
                                    <StyledTableBodyCell
                                        sx = {{
                                            fontWeight: 'bold',
                                            color: '#000',
                                            cursor: 'pointer',
                                            '&:hover': { color: '#2e7d32' } // 深绿色
                                        }}
                                        onClick={() => navigate(`/detail/analysisAlgorithm/${row.name}`)} // 跳转到详情页面
                                    >
                                        {row.name}
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.info}</StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.type}</StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.input}</StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.output}</StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.url}</StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.createTime}</StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.updateTime}</StyledTableBodyCell>
                                    {/*<StyledTableBodyCell>{row.parameter}</StyledTableBodyCell>*/}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow style={{height: '220px'}}>
                                <TableCell colSpan={8} align="center">
                                    <Question />
                                    <NormalBoldFont>
                                        {intl.messages['evolution.noData']}
                                    </NormalBoldFont>
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
                rowsPerPageOptions={[10, 20, 50, 100]}
                labelRowsPerPage={intl.messages['evolution.numsPerPage']}
                labelDisplayedRows={({ from, count, page }) => `${page + 1} of ${Math.ceil(count / rowsPerPage)}`} // 自定义显示格式
            />
        </Box>
    );
}
