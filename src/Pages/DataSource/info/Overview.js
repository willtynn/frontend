import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Box, Stack, TextField, Autocomplete, Table, TableBody, TableCell, TableRow, TableHead} from '@mui/material';
import { useIntl } from 'react-intl';
import { KubeConfirmButton } from '@/components/Button';
import dayjs from 'dayjs';
import { fetchAllDataSources, fetchDataSourceData } from '@/actions/dataSourceAction';
import { StyledTableContainer, StyledTableBodyCell, StyledTableHead } from '@/components/DisplayTable';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';

export default function DataSourceComponent() {
    const [dataTypes, setDataTypes] = useState([]);
    const [selectedDataSource, setSelectedDataSource] = useState(null);
    const [selectedDataType, setSelectedDataType] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tableData, setTableData] = useState([]);

    const intl = useIntl();
    const dispatch = useDispatch();
    const dataSources = useSelector(state => state.DataSource.dataSources);
    const tableDataFromState = useSelector(state => state.DataSource.tableData);

    useEffect(() => {
        dispatch(fetchAllDataSources());

        const today = dayjs().format('YYYY-MM-DD');
        setStartDate(`${today} 00:00:00`);
        setEndDate(`${today} 23:59:59`);
    }, [dispatch]);

    useEffect(() => {
        if (selectedDataSource) {
            setDataTypes(selectedDataSource.types || []);
            setSelectedDataType(null); // Reset selected data type when data source changes
        } else {
            setDataTypes([]);
        }
    }, [selectedDataSource]);

    useEffect(() => {
        if (Array.isArray(tableDataFromState)) {
            setTableData(tableDataFromState);
        } else {
            setTableData([]);
        }
    }, [tableDataFromState]);

    const handleQuery = () => {
        if (selectedDataSource && selectedDataType) {
            dispatch(fetchDataSourceData(selectedDataSource.name, selectedDataType.name));
        }
    };

    const autocompleteStyles = {
        '& .MuiOutlinedInput-root': {
            height: '32px',
            fontSize: '12px',
            fontWeight: 600,
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
        },
        '& .MuiInputBase-input::placeholder': {
            color: '#A0A0A0',
            opacity: 1,
        },
        '& .MuiInputBase-input': {
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            height: '100%',
        },
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
            padding: 0,
        },
        '& .MuiAutocomplete-input': {
            padding: '0 12px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
        }
    };

    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            height: '32px',
            fontSize: '12px',
            fontWeight: 600,
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
        },
        '& .MuiInputBase-input::placeholder': {
            color: '#A0A0A0',
            opacity: 1,
        },
        '& .MuiInputBase-input': {
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            height: '100%',
        }
    };

    const headFirstRow = [
        { id: 'id', label: intl.messages['dataSource.ID'], minWidth: 150, align: 'left' },
        { id: 'value', label: intl.messages['dataSource.value'], minWidth: 150, align: 'left' }
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Autocomplete
                    options={dataSources || []}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => setSelectedDataSource(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={intl.messages['dataSource.dataSource']}
                            variant="outlined"
                            sx={autocompleteStyles}
                        />
                    )}
                    sx={{ width: 300 }}
                />
                <Autocomplete
                    options={dataTypes || []}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => setSelectedDataType(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={intl.messages['dataSource.dataType']}
                            variant="outlined"
                            sx={autocompleteStyles}
                        />
                    )}
                    sx={{ width: 300 }}
                />
                <TextField
                    placeholder={intl.messages['dataSource.startTime']}
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    variant="outlined"
                    sx={{ width: 200, ...textFieldStyles }}
                />
                <TextField
                    placeholder={intl.messages['dataSource.endTime']}
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    variant="outlined"
                    sx={{ width: 200, ...textFieldStyles }}
                />
                <KubeConfirmButton
                    sx={{ width: '150px' }}
                    onClick={handleQuery}
                >
                    {intl.messages['dataSource.query']}
                </KubeConfirmButton>
            </Stack>
            <StyledTableContainer sx={{ bgcolor: '#FFF' }}>
                <Table stickyHeader size="small" sx={{ tableLayout: 'auto' }}>
                    <TableHead>
                        <TableRow>
                            {headFirstRow.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, color: '#A0A0A0', fontSize: '12px' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.length > 0 ? (
                            tableData.map((row) => (
                                <TableRow key={row.id}>
                                    <StyledTableBodyCell>{row.id}</StyledTableBodyCell>
                                    <StyledTableBodyCell>{JSON.stringify(row.value)}</StyledTableBodyCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow style={{ height: '220px' }}>
                                <TableCell colSpan={2} align="center">
                                    <Question />
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
        </Box>
    );
}
