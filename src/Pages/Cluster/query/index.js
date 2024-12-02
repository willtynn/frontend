/**
 * src\Pages\Cluster\query\index.js
 */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography } from '@mui/material';
import {
    UPDATE_NETWORK_CONTROL_INFO,
    UPDATE_EXACT_NETWORK_CONTROL_INFO,
    UPDATE_IP,
    getNetworkControlInfo,
} from '@/actions/clusterAction';
import NetworkNodeControl from '../network/Overview';
import { useIntl } from 'react-intl';
import GeneralService from '@/assets/GeneralService.svg';
import {useParams} from "react-router";


export default function ControlQuery() {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const intl = useIntl();
    const dispatch = useDispatch();

    const { networkControlInfo } = useSelector(state => ({
        networkControlInfo: state.Cluster.networkControlInfo,
    }));

    const ip = '100.105.103.116';
    useEffect(() => {
        dispatch(getNetworkControlInfo(ip));
        localStorage.setItem('serviceFrom', 'overview');
        //dispatch({ type: UPDATE_NETWORK_CONTROL_INFO, data: fakeInfo });
        return () => {
            dispatch({ type: UPDATE_NETWORK_CONTROL_INFO, data: null });
            dispatch({ type: UPDATE_EXACT_NETWORK_CONTROL_INFO, data: null });
        };
    }, []);


    /*useEffect(() => {
        const ips = [
            '100.105.103.116',
            '192.168.1.171',
            '192.168.1.172',
            '192.168.1.173',
            '192.168.1.181'
        ];
        console.log("IPs to request network control info for:", ips);

        ips.forEach(ip => {
            console.log(`Dispatching getNetworkControlInfo for IP: ${ip}`);
            dispatch(getNetworkControlInfo(ip));
        });
        localStorage.setItem('serviceFrom', 'overview');
        return () => {
            dispatch({ type: UPDATE_NETWORK_CONTROL_INFO, data: null });
            dispatch({ type: UPDATE_EXACT_NETWORK_CONTROL_INFO, data: null });
        };
    }, [dispatch]);

     */


    useEffect(() => {
        if (networkControlInfo && networkControlInfo.length > 0) {
            setSelectedIndex(0);
        }
    }, [networkControlInfo]);

    return (
        <Box
            sx={{
                minHeight: '800px',
                m: '16px 32px 0px 32px',
            }}
        >
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
                    <GeneralService />
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
                            {intl.messages['cluster.bandwidthControlInfo']}
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
                            {intl.messages['cluster.bandwidthControlInfo']}
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Box
                sx={{
                    maxWidth: '100%',
                }}
            >
                {/* 表格主体 */}
                <NetworkNodeControl
                    data={networkControlInfo}
                    setIndex={setSelectedIndex}
                    selectedIndex={selectedIndex}
                />
            </Box>
        </Box>
    );
}
