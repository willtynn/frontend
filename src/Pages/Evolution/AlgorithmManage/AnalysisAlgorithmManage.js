//本组件用于管理与演化功能相关的分析算法和规划算法
//index.js为主页，然后汇总其他两个板块，共计三个界面
import { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import PropTypes from 'prop-types';
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
import { alpha } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
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
    evo_get_ana_alg_list,
} from '../../../actions/evolutionAction';
import { setSnackbarMessageAndOpen } from '../../../actions/snackbarAction';
import { SEVERITIES } from '../../../components/CommonSnackbar';
import { saveAs } from 'file-saver';
import StressTestingIcon from '@/assets/StressTesting.svg';


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
    const { checkoutByState,exit} = props;

    const {ana_alg} = useSelector(state => {
        return {
            ana_alg: state.Evolution.evo_ana_alg,
        };
    });
    const intl = useIntl();
    const dispatch = useDispatch();
    const [state, setState] = useState("one")

    const [algID, setAlgID] = useState(ana_alg.analyze_id);
    const [algName, setAlgName] = useState(ana_alg.analyze_name);
    const [algDesc, setAlgDesc] = useState(ana_alg.analyze_text);
    const [algContent, setAlgContent] = useState(ana_alg.analyze_content);
    const [deleltDialogOpen, setDeleteDialogOpen] = useState(false);
    const handleNewAlgName = e => {
        setAlgName(e.target.value);
    }
    const handleNewAlgDescribe = e => {
        setAlgDesc(e.target.value);
    }
    const handleNewAlgContent = e => {
        setAlgContent(e.target.value);
    }
    async function handleModifyAlgorithm(){
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
        await dispatch(ana_modify(modifyAlgorithm))
        dispatch(evo_get_ana_alg_list("",""));
    }
    async function handleDeleteAlgorithm(){
        await dispatch(ana_delete(algID));
        handleDeleteDialogClose();
        dispatch(evo_get_ana_alg_list("",""));
        exit();
    }

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    return (
        <div>
            <Box sx={{ width: '100%' }} >
                <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "500px", overflow: 'scroll' }} direction='column' justifyContent='space-between' >
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
                                maxRows={50}
                                rows={5}
                                value={algContent}
                                onChange={handleNewAlgContent}
                            />
                            <br></br>
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
        </div>
    );
}
