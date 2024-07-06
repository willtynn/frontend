/**
 * src\Pages\Cluster\network\index.js
 */
import React,{ useEffect, useState } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import ClusterNode from '@/assets/ClusterNode.svg';
import { StyledAutocomplete } from '@/components/Input';
import { fontFamily } from '../../../utils/commonUtils';
import { getAllNetworkControlInfo } from '../../../actions/clusterAction';
import NetworkNodeControl from './Overview';

export default function ClusterNetwork() {
    const dispatch = useDispatch();
    const intl = useIntl();

    //const data = useSelector(state => state.Cluster.networkControlInfo);
    const data = useSelector(state => state.Cluster.allNetworkControlInfo);

    useEffect(() => {
        dispatch(getAllNetworkControlInfo());
    }, [dispatch]);

    return (
        <Box>
            <Box
                sx={{
                    borderRadius: '4px',
                    backgroundColor: '#FFFFFF',
                    padding: '24px 20px',
                    width: 'calc(100% - 40px)',
                    height: '58px',
                    mb: '12px',
                }}
            >
                <Stack direction='row' spacing={1}>
                    <ClusterNode />
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontStyle: 'normal',
                                color: '#242e42',
                                textShadow: '0 4px 8px rgba(36,46,66,.1)',
                                fontSize: '24px',
                                lineHeight: '32px',
                            }}
                        >
                            {intl.messages['common.clusterNetwork']}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontStyle: 'normal',
                                color: '#79879c',
                                fontSize: '12px',
                                lineHeight: 1.67,
                            }}
                        >
                            {intl.messages['common.clusterNetworkDescription']}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <NetworkNodeControl data={data || []} />
        </Box>
    );
}