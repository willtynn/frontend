/**
 * src\Pages\Cluster\network\setBandwidth\Networkcontrol.js
 */
import React, { useState, useEffect } from 'react';
import { Box, Stack, FormControl, MenuItem,  InputAdornment, Select } from '@mui/material';
import { KubeInput } from '@/components/Input';

import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import {
    UPDATE_LOCAL,
    UPDATE_TARGET,
    UPDATE_BANDWIDTH,
} from '../../../../actions/clusterAction';

const ipOptions = [
    '100.105.103.116',
    '192.168.1.171',
    '192.168.1.172',
    '192.168.1.173',
    '192.168.1.181',
];

const bandwidthUnits = [
    'kbit',
    'mbit',
    'gbit',
];

export function Networkcontrol(props) {
    const {showError, setError} = props;

    const {
        local,
        target,
        bandwidth,
    } = useSelector(state => ({
        local: state.Cluster.local,
        target: state.Cluster.target,
        bandwidth: state.Cluster.bandwidth,
    }));


    const intl = useIntl();
    const dispatch = useDispatch();

    const [bandwidthValue, setBandwidthValue] = useState('');
    const [bandwidthUnit, setBandwidthUnit] = useState(bandwidthUnits[0]);


    const handleLocalChange = e => {
        const value = e.target.value;
        dispatch({type: UPDATE_LOCAL, data: value});
    };

    const handleTargetChange = e => {
        const value = e.target.value;
        dispatch({type: UPDATE_TARGET, data: value});
    };

    const handleBandwidthValueChange = e => {
        const value = e.target.value;
        setBandwidthValue(value);
        dispatch({ type: UPDATE_BANDWIDTH, data: `${value}${bandwidthUnit}` });
    };

    const handleBandwidthUnitChange = e => {
        const unit = e.target.value;
        setBandwidthUnit(unit);
        dispatch({ type: UPDATE_BANDWIDTH, data: `${bandwidthValue}${unit}` });
    };




    return (
        <Stack sx={{p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)", overflow: 'auto'}}
               direction='column' justifyContent='space-between'>
            <Stack direction='column' spacing={2}>
                <Box>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <KubeInput
                            select
                            label={intl.messages['cluster.localIp']}
                            description=''
                            required={true}
                            id='local-input'
                            variant='outlined'
                            value={local}
                            onChange={handleLocalChange}
                        >
                            {ipOptions.map(ip => (
                                <MenuItem key={ip} value={ip}>
                                    {ip}
                                </MenuItem>
                            ))}
                        </KubeInput>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin="normal">
                        <KubeInput
                            select
                            label={intl.messages['cluster.targetIp']}
                            description=''
                            required={true}
                            id='target-input'
                            variant='outlined'
                            value={target}
                            onChange={handleTargetChange}
                        >
                            {ipOptions.map(ip => (
                                <MenuItem key={ip} value={ip}>
                                    {ip}
                                </MenuItem>
                            ))}
                        </KubeInput>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin="normal">
                        <KubeInput
                            label={intl.messages['cluster.bandWidth']}
                            description=''
                            required={true}
                            id='bandwidth-value-input'
                            variant='outlined'
                            value={bandwidthValue}
                            onChange={handleBandwidthValueChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Select
                                            value={bandwidthUnit}
                                            onChange={handleBandwidthUnitChange}
                                            displayEmpty
                                            sx={{ width: 90 }} // 设置选择框的宽度
                                        >
                                            {bandwidthUnits.map(unit => (
                                                <MenuItem key={unit} value={unit}>
                                                    {unit}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                </Box>
            </Stack>
        </Stack>
    );
}
