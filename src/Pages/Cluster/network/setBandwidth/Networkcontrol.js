/**
 * src\Pages\Cluster\network\setBandwidth\Networkcontrol.js
 */
import React, { useState, useEffect } from 'react';
import { Box, Stack, Grid, Button, IconButton, styled, TextField } from '@mui/material';
import { KubeInput, KubeAutocomplete } from '@/components/Input';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import {
    UPDATE_LOCAL,
    UPDATE_TARGET,
    UPDATE_BANDWIDTH,
} from '../../../../actions/clusterAction';

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


    const handleLocalChange = e => {
        const value = e.target.value;
        dispatch({type: UPDATE_LOCAL, data: value});
    };

    const handleTargetChange = e => {
        const value = e.target.value;
        dispatch({type: UPDATE_TARGET, data: value});
    };

    const handleBandwidthChange = e => {
        const value = e.target.value;
        dispatch({type: UPDATE_BANDWIDTH, data: value});
    };


    return (
        <Stack sx={{p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)", overflow: 'auto'}}
               direction='column' justifyContent='space-between'>
            <Stack direction='column' spacing={2}>
                <Box>
                    <KubeInput
                        label={intl.messages['cluster.localIp']}
                        description=''
                        required={true}
                        id='local-input'
                        variant='outlined'
                        value={local}
                        onChange={handleLocalChange}
                    />

                    <KubeInput
                        label={intl.messages['cluster.targetIp']}
                        description=''
                        required={true}
                        id='target-input'
                        variant='outlined'
                        value={target}
                        onChange={handleTargetChange}
                    />

                    <KubeInput
                        label={intl.messages['cluster.bandWidth']}
                        description=''
                        required={true}
                        id='bandwidth-input'
                        variant='outlined'
                        value={bandwidth}
                        onChange={handleBandwidthChange}
                    />
                </Box>
            </Stack>
        </Stack>
    );
}
