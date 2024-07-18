/**
 * src\Pages\DataSource\info\index.js
 */
import React,{ useEffect, useState } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import ClusterNode from '@/assets/ClusterNode.svg';
import DataSourceComponent from './Overview';  // 导入 Overview 组件

export default function DataSource() {
    const dispatch = useDispatch();
    const intl = useIntl();

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
                            {intl.messages['dataSource.dataSourceInfo']}
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
                            {intl.messages['dataSource.dataSourceDescription']}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <DataSourceComponent />
        </Box>
    );
}