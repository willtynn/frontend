import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    StyledTableRowCell,
    StyledTableContainer,
    StyledTableFooter,
} from '@/components/DisplayTable';
import {
    Stack,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TextField,
    Box,
    Autocomplete,
} from '@mui/material';
import {
    KubeAutocomplete
} from '@/components/Input';
// import RouteIcon from '@/assets/RouteIcon.svg';
import ModelInfo from "@/Pages/DNN/Partition/overview/SubModels/modelInfo";
import { DataRow } from './DataRow';
import { fontFamily } from '@/utils/commonUtils';
import {
    GET_INSTANCES,
    getNamaspaces,
    UPDATE_CURRENT_NAMESPACE,
    getInstanceStatus,
} from '@/actions/instanceAction';
import { AllCentered } from '../../CommonComponents/MainPageFramework';
import { Rowing } from '@mui/icons-material';

const tableHeaders = [
    { key: 'models', align: 'center', text: '已选择模型列表', minWidth: 50, maxWidth: 50 }
];

const spanNumPerPage = 15;

export default function ModelInfomation() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const [row, setRow] = useState([]);
    const [tracePage, setTracePage] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [detailSpan, setDetailSpan] = useState(null);
    const [modelList, setModelList] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);

    const { partitionStrategy, subModels } = useSelector(state => {
        return {
            partitionStrategy: state.Partition.partitionStrategy,
            subModels: state.Partition.subModels,
        };
    });

    const addModel = value => {
        if(value!=null){
            modelList.push(value)
            updateRow()
        }
    }

    const updateRow = () =>{
        let row = modelList.map((item, index) => {
            return (
                <DataRow
                    key={item}
                    onRowClick={() => handleSpanClick(index)}
                    selected={selectedIndex === index}
                    rowData={item}
                    path={item}
                />
            );
        });
        for (let i = row.length; i < spanNumPerPage; i++) {
            row.push(<DataRow key={i} onRowClick={() => { }} rowData={null} />);
        }
        setRow(row);
    }

    const handleSpanClick = index => {
        // setSelectedIndex(index);
        // setDetailSpan(visibleRows[index]);
        // setOpenModal(true);
    };

    const handleSpanChangePage = (_, newPage) => {
        if (tracePage !== newPage) {
            setTracePage(newPage);
            setOpenModal(false);
        }
    };

    const handleCloseModal = () => setOpenModal(false);

    const isDuplicate = () => {
        return false;
    };

    const handleSearchBlur = () => {
        setTimeout(() => {
            setSearchSelectAnchorEl(null);
        }, 300);
    };

    const styleModalBox = {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-100%, -50%)',
        minWidth: '500px',
        maxWidth: '1150px',
        width: '50%',
        height: '100%',
        bgcolor: 'background.paper',
        boxShadow: 'inset -15px 0px  15px -15px #444444',
    };

    const visibleRows = React.useMemo(() => {
        const tmp = (tracePage - 1) * spanNumPerPage;
        return subModels ? subModels.slice(tmp, tmp + spanNumPerPage) : [];
    }, [subModels, tracePage]);

    useEffect(() => {
        if (partitionStrategy) {
            setTracePage(1);
        }
    }, [partitionStrategy]);

    useEffect(() => {
        if (modelList) {
            let row = modelList.map((item, index) => {
                return (
                    <DataRow
                        key={item}
                        onRowClick={() => handleSpanClick(index)}
                        selected={selectedIndex === index}
                        rowData={item}
                        path={item}
                    />
                );
            });
            for (let i = row.length; i < spanNumPerPage; i++) {
                row.push(<DataRow key={i} onRowClick={() => { }} rowData={null} />);
            }
            setRow(row);
        }
    }, [modelList, selectedIndex]);


    const searchSelectOpen = Boolean(searchSelectAnchorEl);

    return (
        <Stack sx={{ width: '100%' }}>
            {/* 顶部信息块 */}
            <Stack direction='row' justifyContent='space-between' spacing={2}>
                <Stack sx={{ width: '30%' }} direction='column' spacing={0} 
                padding={'0px 0px 0px 0px'}>
                    <KubeAutocomplete
                        height='50px'
                        padding='6px 5px 5px 12px'
                        value={''}
                        onChange={(event, newValue) => {
                            addModel(newValue);
                        }}
                        id='instance_status_table_autocomplete'
                        options={['a', 'b', 'c']}
                        sx={{
                            width: '100%',
                            color: '#36435c',
                            fontFamily: fontFamily,
                            fontSize: '20px',
                            fontWeight: 600,
                            fontStyle: 'normal',
                            fontStretch: 'normal',
                            lineHeight: 1.67,
                            letterSpacing: 'normal',
                        }}
                        renderInput={params => (
                            <TextField {...params} placeholder={'全部模型'} />
                        )}
                    />
                    <StyledTableContainer sx={{ width: '100%' }}>
                        <Table stickyHeader size='small' sx={{ tableLayout: 'auto' }}>
                            <TableHead>
                                <TableRow sx={{ height: '52px' }}>
                                    {tableHeaders.map(item => {
                                        return (
                                            <StyledTableRowCell
                                                key={item.key}
                                                align={item.align}
                                                sx={{ minWidth: item.minWidth }}
                                            >
                                                {item.text}
                                            </StyledTableRowCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody
                                sx={{
                                    borderBottom: 'solid 2px #B8B5B7',
                                    borderTop: 'solid 2px #B8B5B7',
                                }}
                            >
                                {row}
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                    <StyledTableFooter
                        pageSize={spanNumPerPage}
                        pageNum={tracePage}
                        count={subModels ? subModels.length : 0}
                        handlePageChange={handleSpanChangePage}
                        sx={{
                            width: '100%',
                            pt: '10px',
                            pb: '10px',
                        }}
                    />
                </Stack>
                <Stack sx={{ width: '68%' }} direction='column' spacing={2}>
                    <ModelInfo showInfo={openModal} info={detailSpan} />
                </Stack>
            </Stack>
        </Stack>
    );
}