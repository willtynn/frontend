/**
 * src\Pages\Service\module\addService\index.js
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
import { Service } from './Service';
import { useSelector, useDispatch } from 'react-redux';
import {
    UPDATE_SERVICE_EDIT,
    UPDATE_SERVICE_EDIT_INDEX,
    RESET_SERVICE,
    UPDATE_SERVICE_CONFIG,
    addService,
    //UPDATE_INTERFACES,
} from '../../../../actions/serviceAction';
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

/*
const composeServiceParams = (Service, Interfaces) => {
    return {
        id: Service.serviceID,
        name: Service.serviceName,
        repo: Service.codeRepository,
        imageUrl: Service.imageURLandTAG,
        version: {
            major: Service.major,
            minor: Service.minor,
            patch: Service.patch
        },
        idleResource: {
            cpu: Service.idleCPU,
            ram: Service.idleRAM,
            disk: Service.idleDISK,
            gpuCore: Service.idleGPUCORE,
            gpuMem: Service.idleGPUMEM
        },
        desiredResource: {
            cpu: Service.desiredCPU,
            ram: Service.desiredRAM,
            disk: Service.desiredDISK,
            gpuCore: Service.desiredGPUCORE,
            gpuMem: Service.desiredGPUMEM
        },
        desiredCapability: Service.processCapability,

        interfaces: Interfaces.map(interfaceItem => ({
            id:interfaceItem.id,
            path: interfaceItem.path,
            inputSize: interfaceItem.inputSize,
            outputSize: interfaceItem.outputSize,
            method: interfaceItem.method,
            info: interfaceItem.description
        }))
    };
};
*/

const composeServiceParams = (Service) => {
    return {
        id: Service.serviceID,
        name: Service.serviceName,
        repo: Service.codeRepository,
        imageUrl: Service.imageURLandTAG,
        version: {
            major: Service.major,
            minor: Service.minor,
            patch: Service.patch
        },
        idleResource: {
            cpu: Service.idleCPU,
            ram: Service.idleRAM,
            disk: Service.idleDISK,
            gpuCore: Service.idleGPUCORE,
            gpuMem: Service.idleGPUMEM
        },
        desiredResource: {
            cpu: Service.desiredCPU,
            ram: Service.desiredRAM,
            disk: Service.desiredDISK,
            gpuCore: Service.desiredGPUCORE,
            gpuMem: Service.desiredGPUMEM
        },
        desiredCapability: Service.processCapability,
        swaggerUrl:Service.swaggerUrl,

    };
};

export function AddService(props) {
    const { handleConfirmClick, handleCancelClick, showError, setShowError } = props;
    const [serviceServiceError, setAddServiceError] = useState(false);
    const intl = useIntl();
    const dispatch = useDispatch();

    const {
        serviceID,
        serviceName,
        codeRepository,
        imageURLandTAG,
        resourceAndCapacity,
        version,
        major,
        minor,
        patch,
        idleCPU,
        idleRAM,
        idleDISK,
        idleGPUCORE,
        idleGPUMEM,
        desiredCPU,
        desiredRAM,
        desiredDISK,
        desiredGPUCORE,
        desiredGPUMEM,
        processCapability,
        serviceEdit,
        serviceEditIndex,
        serviceConfig,
        serviceConfigError,
        //interfaces,
        swaggerUrl,
    } = useSelector(state => state.Service);

    /*
    useEffect(() => {
        if (!interfaces || interfaces.length === 0) {
            dispatch({ type: UPDATE_INTERFACES, data: [{ id:'', path: '', inputSize: 0, outputSize: 0, method: '', description: '' }] });
        }
    }, [dispatch, interfaces]);

     */
    const handleCancelButtonClick = () => {
        if (serviceEdit) {
            if (serviceEditIndex !== null) {
                dispatch({ type: UPDATE_SERVICE_EDIT_INDEX, data: null });
            }
            dispatch({ type: UPDATE_SERVICE_EDIT, data: false });
        } else {
            handleCancelClick();
        }
        dispatch({ type: RESET_SERVICE });
    };

    /*
    const handleConfirmButtonClick = () => {
        if (serviceEdit) {
            if (serviceEditIndex !== null) {
                const tmpConfig = JSON.parse(JSON.stringify(serviceConfig));
                tmpConfig[serviceEditIndex] = composeServiceParams({
                    serviceID,
                    serviceName,
                    codeRepository,
                    imageURLandTAG,
                    resourceAndCapacity,
                    major,
                    minor,
                    patch,
                    idleCPU,
                    idleRAM,
                    idleDISK,
                    idleGPUCORE,
                    idleGPUMEM,
                    desiredCPU,
                    desiredRAM,
                    desiredDISK,
                    desiredGPUCORE,
                    desiredGPUMEM,
                    processCapability
                }, interfaces);
                dispatch({ type: UPDATE_SERVICE_CONFIG, data: tmpConfig });
                dispatch({ type: UPDATE_SERVICE_EDIT_INDEX, data: null });
            } else {
                dispatch({
                    type: UPDATE_SERVICE_CONFIG,
                    data: [
                        ...serviceConfig,
                        composeServiceParams({
                            serviceID,
                            serviceName,
                            codeRepository,
                            imageURLandTAG,
                            resourceAndCapacity,
                            version,
                            major,
                            minor,
                            patch,
                            idleCPU,
                            idleRAM,
                            idleDISK,
                            idleGPUCORE,
                            idleGPUMEM,
                            desiredCPU,
                            desiredRAM,
                            desiredDISK,
                            desiredGPUCORE,
                            desiredGPUMEM,
                            processCapability
                        }, interfaces)
                    ]
                });
            }
            dispatch({ type: UPDATE_SERVICE_EDIT, data: false });
            dispatch({ type: RESET_SERVICE });
        } else {
            if (serviceConfigError) {
                setShowError(true);
            } else {
                setShowError(false);
                const serviceData = composeServiceParams({
                    serviceID,
                    serviceName,
                    codeRepository,
                    imageURLandTAG,
                    resourceAndCapacity,
                    version,
                    major,
                    minor,
                    patch,
                    idleCPU,
                    idleRAM,
                    idleDISK,
                    idleGPUCORE,
                    idleGPUMEM,
                    desiredCPU,
                    desiredRAM,
                    desiredDISK,
                    desiredGPUCORE,
                    desiredGPUMEM,
                    processCapability
                }, interfaces);
                console.log(serviceData); // 打印请求数据
                dispatch(addService(serviceData));
                handleConfirmClick();
                dispatch({ type: RESET_SERVICE });
            }
        }
    };
     */

    const handleConfirmButtonClick = () => {
        if (serviceEdit) {
            if (serviceEditIndex !== null) {
                const tmpConfig = JSON.parse(JSON.stringify(serviceConfig));
                tmpConfig[serviceEditIndex] = composeServiceParams({
                    serviceID,
                    serviceName,
                    codeRepository,
                    imageURLandTAG,
                    resourceAndCapacity,
                    major,
                    minor,
                    patch,
                    idleCPU,
                    idleRAM,
                    idleDISK,
                    idleGPUCORE,
                    idleGPUMEM,
                    desiredCPU,
                    desiredRAM,
                    desiredDISK,
                    desiredGPUCORE,
                    desiredGPUMEM,
                    processCapability,
                    swaggerUrl,
                });
                dispatch({ type: UPDATE_SERVICE_CONFIG, data: tmpConfig });
                dispatch({ type: UPDATE_SERVICE_EDIT_INDEX, data: null });
            } else {
                dispatch({
                    type: UPDATE_SERVICE_CONFIG,
                    data: [
                        ...serviceConfig,
                        composeServiceParams({
                            serviceID,
                            serviceName,
                            codeRepository,
                            imageURLandTAG,
                            resourceAndCapacity,
                            version,
                            major,
                            minor,
                            patch,
                            idleCPU,
                            idleRAM,
                            idleDISK,
                            idleGPUCORE,
                            idleGPUMEM,
                            desiredCPU,
                            desiredRAM,
                            desiredDISK,
                            desiredGPUCORE,
                            desiredGPUMEM,
                            processCapability,
                            swaggerUrl,
                        })
                    ]
                });
            }
            dispatch({ type: UPDATE_SERVICE_EDIT, data: false });
            dispatch({ type: RESET_SERVICE });
        } else {
            if (serviceConfigError) {
                setShowError(true);
            } else {
                setShowError(false);
                const serviceData = composeServiceParams({
                    serviceID,
                    serviceName,
                    codeRepository,
                    imageURLandTAG,
                    resourceAndCapacity,
                    version,
                    major,
                    minor,
                    patch,
                    idleCPU,
                    idleRAM,
                    idleDISK,
                    idleGPUCORE,
                    idleGPUMEM,
                    desiredCPU,
                    desiredRAM,
                    desiredDISK,
                    desiredGPUCORE,
                    desiredGPUMEM,
                    processCapability,
                    swaggerUrl
                });
                console.log(serviceData); // 打印请求数据
                dispatch(addService(serviceData));
                handleConfirmClick();
                dispatch({ type: RESET_SERVICE });
            }
        }
    };

    return (
        <Box sx={style}>
            <KubeDeploymentCard
                title={intl.messages['serviceOverview.newService']}
                handleClose={handleCancelClick}
            >
                <Stack
                    direction='column'
                    spacing={0}
                    sx={{ bgcolor: '#eff4f9', p: '0px 20px', overflow: 'auto', flex: 1 }}
                >
                    <ProgressIndicator
                        title={intl.messages['common.service']}
                        adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
                        stage={1}
                        currentStage={1}
                    />
                </Stack>
                <Service showError={showError} setError={setAddServiceError} />

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
                        {!serviceEdit
                            ? intl.messages['common.create']
                            : serviceEditIndex !== null
                                ? intl.messages['serviceOverview.editService']
                                : intl.messages['common.add']}
                    </KubeConfirmButton>
                </Stack>
            </KubeDeploymentCard>
        </Box>
    );
}
