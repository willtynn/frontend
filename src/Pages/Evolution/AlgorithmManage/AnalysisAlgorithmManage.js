//本组件用于管理与演化功能相关的分析算法和规划算法
//index.js为主页，然后汇总其他两个板块，共计三个界面
import { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { KubeConfirmButton, KubeCancelButton } from '@/components/Button';
import { KubeInput, KubeAutocomplete, KubeTextField } from '@/components/Input';
import Link from '@mui/material/Link';
import _, { set } from 'lodash';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Warning from '@/assets/popup/warning.svg'
import { useIntl } from 'react-intl';
import {
    ana_delete,
    ana_modify,
    exe_delete,
    exe_modify,
    evo_get_algorithm,
} from '../../../actions/evolutionAction';
import { setSnackbarMessageAndOpen } from '../../../actions/snackbarAction';
import { SEVERITIES } from '../../../components/CommonSnackbar';
import { saveAs } from 'file-saver';


function createData(id, name, description, type, content) {
    return {
        id,
        name,
        description,
        type,
        content,
    };
}

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

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID of Algorithm',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Algorithm Name',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
]

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell> */}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.id == 'id' ? "right" : "left"}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


export function AnalysisManage(props) {
    const { checkoutByState } = props;
    //暂时用不上上面这个函数，但是也许以后会用上
    const { ana_alg_list } = useSelector(state => {
        return {
            ana_alg_list: state.Evolution.ana_alg_list,
        };
    });
    const [listChangeState, setListChangeState] = useState(false);

    useLayoutEffect(() => {
        dispatch(evo_get_algorithm());
    }, [listChangeState])

    const intl = useIntl();
    const dispatch = useDispatch();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [state, setState] = useState("all")

    const [algID, setAlgID] = useState("");
    const [algName, setAlgName] = useState("");
    const [algDesc, setAlgDesc] = useState("");
    const [algContent, setAlgContent] = useState("");
    const [deleltDialogOpen, setDeleteDialogOpen] = useState(false);

    var rows = _.map(ana_alg_list, function (obj) {
        //小于10的我们认为其实是系统默认算法，不允许修改和查看
        if (obj.analyze_id < 10) {
            return {
                id: obj.analyze_id,
                name: obj.analyze_name,
                description: obj.analyze_text,
                content: obj.analyze_content,
                type: "system"
            }
        } else {
            return {
                id: obj.analyze_id,
                name: obj.analyze_name,
                description: obj.analyze_text,
                content: obj.analyze_content,
                type: "user"
            };
        }

    })

    const changeListState = () => {
        setListChangeState(!listChangeState);
    }

    const handleNewAlgName = e => {
        setAlgName(e.target.value);
    }
    const handleNewAlgDescribe = e => {
        setAlgDesc(e.target.value);
    }
    const handleNewAlgContent = e => {
        setAlgContent(e.target.value);
    }
    const handleModifyAlgorithm = () => {
        var modifyAlgorithm = {
            analyze_id: algID,
            analyze_name: algName,
            analyze_text: algDesc,
            analyze_content: algContent,
            
        }
        console.log(modifyAlgorithm)
        if (algID == "") {
            dispatch(
                setSnackbarMessageAndOpen(
                    'common.errorMessage',
                    { msg: "通信错误，请稍等再试" },
                    SEVERITIES.warning
                )
            );
        }
        dispatch(ana_modify(modifyAlgorithm))
        changeListState();
        setPage(0)
        setState("all")
    }
    const handleDeleteAlgorithm = () => {
        dispatch(ana_delete(algID));
        handleDeleteDialogClose();
        changeListState();
        setPage(0)
        setState("all")
    }

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleGoDetail = (e, index) => {
        console.log(index)
        console.log(e.target.value)
        // setAlgID(visibleRows[index].id);
        // setAlgName(visibleRows[index].name);
        // setAlgDesc(visibleRows[index].description);
        // setAlgContent(visibleRows[index].content);
        // return;
    }
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, row) => {
        if (row.type == "user") {
            setAlgContent(row.content);
            setAlgID(row.id)
            setAlgName(row.name)
            setAlgDesc(row.description)
            setState("one");
        } else {
            dispatch(
                setSnackbarMessageAndOpen(
                    'common.errorMessage',
                    { msg: "系统默认算法，不能修改" },
                    SEVERITIES.warning
                )
            );
        }


    };

    const backToAllState = () => {
        setState("all");
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page >= 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );




    return (

        <Box sx={{ width: '100%' }} >
            {/* //对应有两个界面，一个是查看所有算法，另一个是对具体算法进行修改/注册/删除 */}
            {state == "all" ?
                <Paper sx={{ width: '100%', mb: 2 }}>
                    {/* <EnhancedTableToolbar numSelected={selected.length}/> */}

                    <TableContainer>
                        <Table
                            sx={{ minWidth: 400, maxHeight: '350px' }}
                            aria-labelledby="tableTitle"
                            size={'small'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = selected.includes(row.analyze_id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            {/* <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell> */}
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                sx={{ width: '100px' }}
                                                align='center'
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: '200px' }}>{row.name}</TableCell>
                                            <TableCell align="left" sx={{ width: '400px' }}>{row.description}</TableCell>
                                            <TableCell align="left" sx={{ width: '50px' }}>{row.type}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (33) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[4, 7, 9]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                : <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "350px", overflow: 'scroll' }} direction='column' justifyContent='space-between' >
                    <Box>
                        <KubeInput
                            label={"算法名称"}
                            decription={"此处为算法的名称"}
                            requried={true}
                            id='test-evo_name-input'
                            variant='outlined'
                            value={algName}
                            onChange={handleNewAlgName}
                            validation={{
                                required: "First Name is required!"
                            }}
                        />
                        <br></br>
                        <KubeInput
                            label={"算法描述"}
                            decription={"简要描述算法"}
                            requried={false}
                            id='test-evo_name-input'
                            variant='outlined'
                            value={algDesc}
                            onChange={handleNewAlgDescribe}
                            validation={{
                                required: "First Name is required!"
                            }}

                        />
                        <br></br>
                        {/* //TODO 参考手册还没写，故连接还没确定 */}
                        <Typography
                            sx={{
                                color: '#36435c',
                                fontSize: '12px',
                                lineHeight: 1.67,
                                fontWeight: 400,
                            }}
                        >
                            {"算法内容,请使用JAVA语言并阅读"}
                            {<Link href="#">参考手册</Link>}
                        </Typography>
                        {/* 写算法的内容，直接用JAVA代码写 */}
                        <KubeTextField
                            multiline
                            maxRows={10}
                            value={algContent}
                            onChange={handleNewAlgContent}
                        />
                        <br></br>
                        <KubeCancelButton
                            onClick={backToAllState}
                            sx={{ height: '32px', minWidth: '96px' }}
                        >
                            <Stack direction='row' alignItems='center' justifyContent='center'>
                                <Box sx={{ ml: '4px' }}>{"返回"}</Box>
                            </Stack>
                        </KubeCancelButton>
                        <KubeCancelButton
                            onClick={handleModifyAlgorithm}
                            sx={{ height: '32px', minWidth: '96px', width: '10%' }}
                        >
                            <Stack direction='row' alignItems='center' justifyContent='center'>
                                <Box sx={{ ml: '4px' }}>{"修改该算法"}</Box>
                            </Stack>
                        </KubeCancelButton>
                        <KubeCancelButton
                            onClick={handleDeleteDialogOpen}
                            sx={{ height: '32px', minWidth: '96px', width: '10%' }}
                        >
                            <Stack direction='row' alignItems='center' justifyContent='center'>
                                <Box sx={{ ml: '4px' }}>{"删除该算法"}</Box>
                            </Stack>
                        </KubeCancelButton>
                    </Box>
                </Stack>
            }

            {/* 确认删除提示框 */}
            <Dialog
                open={deleltDialogOpen}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"
                    sx={{
                        fontSize: '25px',
                        alignItems: 'center',
                    }}>
                    <Warning />
                    <span sx={{
                        fontSize: '25px',
                        alignItems: 'center',
                        display: 'flex'
                    }}>{intl.messages['evolution.deleteWarning']}</span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"该操作不可逆，是否确定删除？"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Stack
                        sx={{ mt: '12px' }}
                        direction='row'
                        spacing={1.5}
                        alignItems='center'
                    >
                        <KubeCancelButton sx={{ height: '32px', minWidth: '96px' }} onClick={() => {
                            handleDeleteDialogClose()
                        }}>
                            {intl.messages['common.cancel']}
                        </KubeCancelButton>
                        <KubeCancelButton
                            onClick={handleDeleteAlgorithm}
                            sx={{ height: '32px', minWidth: '96px' }}
                        >
                            <Stack direction='row' alignItems='center' justifyContent='center'>
                                <Box sx={{ ml: '4px' }}>{intl.messages['common.confirm']}</Box>
                            </Stack>
                        </KubeCancelButton>
                    </Stack>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
