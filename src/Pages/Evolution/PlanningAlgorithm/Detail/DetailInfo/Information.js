import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    TableRow,
    Table,
    TableHead, TableCell, TableBody, TablePagination
} from '@mui/material';
import { useIntl } from 'react-intl';
import Question from '@/assets/Question.svg';
import { queryInstancesWithParams } from '../../../../../actions/algorithmAction';
import {StyledTableBodyCell, StyledTableContainer} from "../../../../../components/DisplayTable";
import {NormalBoldFont} from "../../../../../components/Fonts";
import {Task} from "@mui/icons-material";



export function Information({ algorithmName, onInstanceClick }) {

    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10); // 每页显示的行数

    const intl = useIntl();
    const dispatch = useDispatch();

    // 获取所有算法数据（假设已经存储在 Redux 中）
    const allAlgorithms = useSelector(state => state.AlgorithmReducer.allAlgorithms);

    // 根据 algorithmName 获取对应的 algorithmId
    const algorithm = allAlgorithms.find(alg => alg.name === algorithmName);
    const algorithmId = algorithm ? algorithm.id : null;

    // 获取实例数据
    const instances = useSelector(state => state.AlgorithmReducer.allInstances);

    useEffect(() => {
        if (algorithmId) {
            // 查询该算法的所有实例
            dispatch(queryInstancesWithParams({ algorithmId }));
        }
    }, [algorithmId, dispatch]);

    useEffect(() => {
        if (instances && instances.length > 0) {
            const formattedData = instances.map(source => ({
                algorithmId: source.algorithmId,
                id: source.id,
                runName: source.runName,
                input: source.input,
                output: source.output,
                createTime: source.createTime,
                updateTime: source.updateTime,
                parameter: source.parameter,
                isDelete:source.isDelete
            }));
            setTableData(formattedData);
        } else {
            setTableData([]);
        }
    }, [instances]);

    // 切换分页
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // 更改每页显示的行数
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // 重置到第一页
    };

    const handleInstanceClick = (runName) => {
        console.log("Clicked runName: ", runName);
        onInstanceClick(runName); // 将点击的 runName 传递给父组件
    };

    const headFirstRow = [
        {id: 'runName', label: intl.messages['evolution.runName'], minWidth: 150, align: 'left'},
        {id: 'createTime', label: intl.messages['evolution.createTime'], minWidth: 150, align: 'left'},
        {id: 'updateTime', label: intl.messages['evolution.updateTime'], minWidth: 150, align: 'left'},
        {id: 'isDelete', label: intl.messages['evolution.isDelete'], minWidth: 150, align: 'left'},
    ];


    return (
        <Box sx={{p: 3}}>
            {/*数据源展示表格内容*/}
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
                                    {/*实例名称列*/}
                                    <StyledTableBodyCell
                                        sx = {{
                                            fontWeight: 'bold',
                                            color: '#000',
                                            cursor: 'pointer',
                                            '&:hover': { color: '#2e7d32' } // 深绿色
                                        }}
                                        onClick={() => handleInstanceClick(row.runName)} // 点击时触发 onInstanceClick 跳转
                                    >
                                        {row.runName}
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.createTime}</StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.updateTime}</StyledTableBodyCell>
                                    <StyledTableBodyCell>{row.isDelete}</StyledTableBodyCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow style={{height: '220px'}}>
                                <TableCell colSpan={6} align="center">
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
};