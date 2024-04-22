import React, { createContext, useContext } from 'react';
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
} from '@mui/material';
import {
    KubeAutocomplete
} from '@/components/Input';
import {
    searchModelByName,
    PIPELINE_SEARCH
} from '@/actions/inferPipelineAction';
import ModelInfo from "./modelInfo";
import { DataRow } from './DataRow';
import { fontFamily } from '@/utils/commonUtils';
import { json, map } from 'd3';

const tableHeaders = [
    { key: 'models', align: 'center', text: '已选择模型列表', minWidth: 50, maxWidth: 50 },
];

const spanNumPerPage = 15;

export default function ModelInformation() {

    // const MyContext = createContext();

    const dispatch = useDispatch();
    const [row, setRow] = useState([]);
    const [tracePage, setTracePage] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [detailSpan, setDetailSpan] = useState(null);
    const [modelList, setModelList] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);

    const { models } =
        useSelector(state => {
            var allModels = state.InferPipeline.queryResult
            if (allModels){
                modelList.map((item, index) => {
                    allModels = allModels.filter(model => model.id !== item.id)
                });
                return {models: allModels}
            }else{
                return {models: []}
            }
        });

    useEffect(() => {
        dispatch(searchModelByName(''));
        const stored = localStorage.getItem('modelList');
        console.log(stored)
        if (stored) {
            var localModelList = JSON.parse(stored)
            setModelList(localModelList)
        } else {
            setModelList([])
        }
    }, []);

    useEffect(() => {
        if (modelList) {
            let row = modelList.map((item, index) => {
                return (
                    <DataRow
                        key={item}
                        onRowClick={() => handleSpanClick(index)}
                        onDelete={() => handleSpanDeleteClick(index)}
                        selected={selectedIndex === index}
                        rowData={item.name}
                        path={item}
                    />
                );
            });
            for (let i = row.length; i < spanNumPerPage; i++) {
                row.push(<DataRow key={i} onRowClick={() => { }} rowData={null} />);
            }
            setRow(row);
        }
    }, [modelList]);

    const addModel = value => {
        if (value != null) {
            setSelectedIndex(-1)
            modelList.push(value)
            updateRow()
            localStorage.setItem('modelList', JSON.stringify(modelList));
            dispatch({ type: PIPELINE_SEARCH, data: models.filter(item => item !== value) })
            console.log(modelList)
        }
    }

    const updateRow = () => {
        let row = modelList.map((item, index) => {
            return (
                <DataRow
                    key={item}
                    onRowClick={() => handleSpanClick(index)}
                    onDelete={() => handleSpanDeleteClick(index)}
                    selected={selectedIndex === index}
                    rowData={item.name}
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
        setSelectedIndex(index);
        setDetailSpan(modelList[index]);
        setOpenModal(true);
    };

    const handleSpanDeleteClick = index => {
        var udpateModelList = modelList.filter(item => item !== modelList[index])
        setModelList(udpateModelList)
        localStorage.setItem('modelList', JSON.stringify(udpateModelList))
        models.push(modelList[index])
        dispatch({ type: PIPELINE_SEARCH, data: models })
        setSelectedIndex(-1);
        setDetailSpan(null);
        setOpenModal(false);
    };


    const handleSpanChangePage = (_, newPage) => {
        if (tracePage !== newPage) {
            setTracePage(newPage);
            setOpenModal(false);
        }
    };

    return (
        <Stack sx={{ p: '10px 5px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)" }}>
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
                        options={models ? models : []}
                        getOptionLabel={(option) => option.name || ''}
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
                    <StyledTableContainer sx={{ width: '100%', height: "calc(100% - 244px)" } }>
                        <Table stickyHeader size='small' sx={{ tableLayout: 'auto' }}>
                            <TableHead>
                                <TableRow sx={{ height: '52px' }}>
                                    {tableHeaders.map(item => {
                                        return (
                                            <StyledTableRowCell
                                                key={item.key}
                                                align={item.align}
                                                width="100%"
                                            >
                                                {item.text}
                                            </StyledTableRowCell>
                                        );
                                    })}
                                    <StyledTableRowCell
                                        key={''}
                                        align={''}
                                        width="10%"
                                    >
                                    </StyledTableRowCell>
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
                        count={modelList ? modelList.length : 0}
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