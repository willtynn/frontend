import { Stack } from '@mui/material';
import { useParams } from 'react-router';
import GeneralInfo from './GeneralInfo';
import DetailInfo from './DetailInfo';

export function AnalysisAlgorithmDetail() {
    const { name } = useParams(); // 获取算法名称

    return (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
        >
            {/* 将算法名称作为 props 传递给 GeneralInfo */}
            <GeneralInfo algorithmName={name}/>
            <DetailInfo algorithmName={name}/>
        </Stack>
    );
}
