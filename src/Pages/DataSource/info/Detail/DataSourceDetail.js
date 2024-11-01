import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';
import GeneralInfo from './GeneralInfo';
import DetailInfo from './DetailInfo';

export function DataSourceDetail() {
    const { name } = useParams(); // 获取数据源名称
    const dispatch = useDispatch();


    return (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
        >
            {/* 将数据源名称作为 props 传递给 GeneralInfo */}
            <GeneralInfo dataSourceName={name}/>
            <DetailInfo dataSourceName={name}/>
        </Stack>
    );
}
