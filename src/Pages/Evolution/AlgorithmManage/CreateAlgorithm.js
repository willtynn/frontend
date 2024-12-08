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
    ana_register,
    exe_register,
    evo_get_algorithm
} from '../../../actions/evolutionAction';
import { setSnackbarMessageAndOpen } from '../../../actions/snackbarAction';
import { SEVERITIES } from '../../../components/CommonSnackbar';
import { saveAs } from 'file-saver';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '960px',
    boxShadow: 24,
    height: 'calc(100% - 120px)',
    fontFamily: fontFamily,
};

export function CreateAlgorithm(props) {
    const { state,exit } = props;
    const dispatch = useDispatch();

    const [algID, setAlgID] = useState("");
    const [algName, setAlgName] = useState("");
    const [algDesc, setAlgDesc] = useState("");
    const [algContent, setAlgContent] = useState("");

    const handleNewAlgName = e => {
        setAlgName(e.target.value);
    }
    const handleNewAlgDescribe = e => {
        setAlgDesc(e.target.value);
    }
    const handleNewAlgContent = e => {
        setAlgContent(e.target.value);
    }

    const handleRegisterAlgorithm = () => {
        if (state == "analysis") {
            var data = {
                analyze_id: algID,
                analyze_name: algName,
                analyze_content: algContent,
                analyze_text: algDesc
            }
            dispatch(ana_register(data))
        } else if (state == "plan") {
            var data = {
                plan_id: algID,
                plan_name: algName,
                plan_content: algContent,
                plan_text: algDesc
            }
            dispatch(exe_register(data))
        }
        dispatch(evo_get_algorithm());
        exit();
        

    }

    return (
        <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "500px", overflow: 'scroll' }} direction='column' justifyContent='space-between' >
            <Box>
                <Typography
                    sx={{
                        color: '#36435c',
                        fontSize: '18px',
                        lineHeight: 1.67,
                        fontWeight: 400,
                    }}
                >
                    {"注册算法类型为" + state}
                </Typography>
                <br></br>
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
                {/* 写算法的内容,需要直接用JAVA代码写 */}
                <KubeTextField
                    multiline
                    maxRows={50}
                    rows={5}
                    value={algContent}
                    onChange={handleNewAlgContent}
                />
                <br></br>
                <KubeCancelButton
                    onClick={handleRegisterAlgorithm}
                    sx={{ height: '32px', minWidth: '96px', width: '10%' }}
                >
                    <Stack direction='row' alignItems='center' justifyContent='center'>
                        <Box sx={{ ml: '4px' }}>{"注册该算法"}</Box>
                    </Stack>
                </KubeCancelButton>

            </Box>
        </Stack>

    );
}
