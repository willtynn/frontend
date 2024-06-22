/**
 * src\Pages\Cluster\network\setBandWidth\index.js
 */
import {useEffect, useState} from 'react';
import { Box, Stack, Button, IconButton, Grid } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import InfoNow from '@/assets/InfoNow.svg';
import InfoFinished from '@/assets/InfoFinished.svg';
import InfoWaiting from '@/assets/InfoWaiting.svg';
import { useIntl } from 'react-intl';
import { KubeCancelButton, KubeConfirmButton } from '@/components/Button';
import { Networkcontrol } from './Networkcontrol';
import { useSelector, useDispatch } from 'react-redux';
import {
    UPDATE_CONTROL_EDIT,
    UPDATE_CONTROL_EDIT_INDEX,
    RESET_CONTROL,
    UPDATE_CONTROL_CONFIG,
    setBandwidthControl,
} from '../../../../actions/clusterAction';
import ProgressIndicator from "../../../Cluster/deploy/DeployProgress/ProgressIndicator";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '960px',
    boxShadow: 24,
    height: 'calc(100% - 120px)',
    fontFamily: fontFamily,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
};
const composeControlParams = (Cluster) => {
    return {
        local: Cluster.local,
        target: Cluster.target,
        bandwidth: Cluster.bandwidth,
    };
};

export function SetBandwidth(props) {
    const { handleConfirmClick, handleCancelClick, showError, setShowError } = props;
    const [networkcontrolError, setSetBandwidthError] = useState(false);
    const intl = useIntl();
    const dispatch = useDispatch();

    const {
        local,
        target,
        bandwidth,
        controlEdit,
        controlEditIndex,
        controlConfig,
        controlConfigError,
    } = useSelector(state => state.Cluster);

    const handleCancelButtonClick = () => {
        if (controlEdit) {
            if (controlEditIndex !== null) {
                dispatch({ type: UPDATE_CONTROL_EDIT_INDEX, data: null });
            }
            dispatch({ type: UPDATE_CONTROL_EDIT, data: false });
        } else {
            handleCancelClick();
        }
        dispatch({ type: RESET_CONTROL });
    };

    const handleConfirmButtonClick = () => {
        if (controlEdit) {
            if (controlEditIndex !== null) {
                const tmpConfig = JSON.parse(JSON.stringify(controlConfig));
                tmpConfig[controlEditIndex] = composeControlParams({
                    local,
                    target,
                    bandwidth,
                });
                dispatch({ type: UPDATE_CONTROL_CONFIG, data: tmpConfig });
                dispatch({ type: UPDATE_CONTROL_EDIT_INDEX, data: null });
            } else {
                dispatch({
                    type: UPDATE_CONTROL_CONFIG,
                    data: [
                        ...controlConfig,
                        composeControlParams({
                            local,
                            target,
                            bandwidth,
                        })
                    ]
                });
            }
            dispatch({ type: UPDATE_CONTROL_EDIT, data: false });
            dispatch({ type: RESET_CONTROL });
        } else {
            if (controlConfigError) {
                setShowError(true);
            } else {
                setShowError(false);
                const controlData = composeControlParams({
                    local,
                    target,
                    bandwidth,
                });
                console.log(controlData); // 打印请求数据
                dispatch(setBandwidthControl(controlData));
                handleConfirmClick();
                dispatch({ type: RESET_CONTROL });
            }
        }
    };

    return (
        <Box sx={style}>
            <KubeDeploymentCard
                title={intl.messages['cluster.newBandwidth']}
                handleClose={handleCancelClick}
            >
                <Stack
                    direction='column'
                    spacing={0}
                    sx={{ bgcolor: '#eff4f9', p: '0px 20px', overflow: 'auto', flex: 1 }}
                >
                    <ProgressIndicator
                        title={intl.messages['cluster.bandwidthControlInfo']}
                        adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
                        stage={1}
                        currentStage={1}
                    />
                </Stack>
                <Networkcontrol showError={showError} setError={setSetBandwidthError} />

                <Stack
                    sx={{
                        mt: '80px',
                        position: 'absolute',
                        bottom: '12px',
                        width: 'calc(100% - 64px)',
                        bgcolor: '#f9fbfd',
                    }}
                    direction='row'
                    spacing={3}
                    justifyContent='flex-end'
                    alignItems='flex-end'
                >
                    <KubeCancelButton
                        sx={{ height: '32px', p: '5px 23px' }}
                        onClick={handleCancelButtonClick}
                    >
                        {intl.messages['common.cancel']}
                    </KubeCancelButton>
                    <KubeConfirmButton
                        sx={{ height: '32px', p: '5px 23px' }}
                        onClick={handleConfirmButtonClick}
                    >
                        {!controlEdit
                            ? intl.messages['common.create']
                            : controlEditIndex !== null
                                ? intl.messages['cluster.editBandwidth']
                                : intl.messages['common.add']}
                    </KubeConfirmButton>
                </Stack>
            </KubeDeploymentCard>
        </Box>
    );
}