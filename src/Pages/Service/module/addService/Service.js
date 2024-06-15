/**
 * src\Pages\Service\module\addService\Service.js
 */
import React, { useState, useEffect } from 'react';
import { Box, Stack, Grid, Button, IconButton, styled, TextField } from '@mui/material';
import { KubeInput, KubeAutocomplete } from '@/components/Input';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import {
    UPDATE_SERVICE_ID,
    UPDATE_SERVICE_NAME,
    UPDATE_SERVICE_CODEREPOSITORY,
    UPDATE_SERVICE_IMAGE_URL_AND_TAG,
    UPDATE_SERVICE_MAJOR,
    UPDATE_SERVICE_MINOR,
    UPDATE_SERVICE_PATCH,
    UPDATE_SERVICE_IDELCPU,
    UPDATE_SERVICE_IDELRAM,
    UPDATE_SERVICE_IDELDISK,
    UPDATE_SERVICE_IDELGPUCORE,
    UPDATE_SERVICE_IDELGPUMEM,
    UPDATE_SERVICE_DESIREDCPU,
    UPDATE_SERVICE_DESIREDRAM,
    UPDATE_SERVICE_DESIREDDISK,
    UPDATE_SERVICE_DESIREDGPUCORE,
    UPDATE_SERVICE_DESIREDGPUMEM,
    UPDATE_SERVICE_PROCESSCAPABILITY,
    UPDATE_INTERFACES,
} from '../../../../actions/serviceAction';

const nameRegExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function Service(props) {
    const { showError, setError } = props;

    const {
        serviceID,
        serviceName,
        codeRepository,
        imageURLandTAG,
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
        interfaces,
    } = useSelector(state => ({
        serviceID: state.Service.serviceID,
        serviceName: state.Service.serviceName,
        codeRepository: state.Service.codeRepository,
        imageURLandTAG: state.Service.imageURLandTAG,
        major: state.Service.major,
        minor: state.Service.minor,
        patch: state.Service.patch,
        idleCPU: state.Service.idleCPU,
        idleRAM: state.Service.idleRAM,
        idleDISK: state.Service.idleDISK,
        idleGPUCORE: state.Service.idleGPUCORE,
        idleGPUMEM: state.Service.idleGPUMEM,
        desiredCPU: state.Service.desiredCPU,
        desiredRAM: state.Service.desiredRAM,
        desiredDISK: state.Service.desiredDISK,
        desiredGPUCORE: state.Service.desiredGPUCORE,
        desiredGPUMEM: state.Service.desiredGPUMEM,
        processCapability: state.Service.processCapability,
        interfaces: state.Service.interfaces,
    }));

    const [serviceIDError, setServiceIDError] = useState(false);
    const [serviceNameError, setServiceNameError] = useState(false);
    const [serviceNameErrorType, setServiceNameErrorType] = useState(0);

    const intl = useIntl();
    const dispatch = useDispatch();

    useEffect(() => {
        setError(serviceIDError || serviceNameError);
    }, [serviceIDError, serviceNameError]);

    const handleAddInterface = () => {
        const updatedInterfaces = [...interfaces, { id: '', path: '', inputSize: 0.0, outputSize: 0.0, method: '', description: '' }];
        dispatch({ type: UPDATE_INTERFACES, data: updatedInterfaces });
    };

    const handleRemoveInterface = (index) => {
        const updatedInterfaces = [...interfaces];
        updatedInterfaces.splice(index, 1);
        dispatch({ type: UPDATE_INTERFACES, data: updatedInterfaces });
    };

    const handleChangeInterface = (index, field, value) => {
        const updatedInterfaces = [...interfaces];
        updatedInterfaces[index][field] = value;
        dispatch({ type: UPDATE_INTERFACES, data: updatedInterfaces });
    };

    const handleServiceIDChange = e => {
        const value = e.target.value;
        setServiceIDError(value === '');
        dispatch({ type: UPDATE_SERVICE_ID, data: value });
    };

    const handleServiceNameChange = e => {
        const value = e.target.value;
        if (value === '') {
            setServiceNameError(true);
            setServiceNameErrorType(0);
        } else if (!nameRegExp.test(value)) {
            setServiceNameError(true);
            setServiceNameErrorType(1);
        } else {
            setServiceNameError(false);
        }
        dispatch({ type: UPDATE_SERVICE_NAME, data: value });
    };

    const handleCodeRepositoryChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_CODEREPOSITORY, data: value });
    };

    const handleImageURLandTAGChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_IMAGE_URL_AND_TAG, data: value });
    };

    const handleMajorChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_MAJOR, data: value });
    };

    const handleMinorChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_MINOR, data: value });
    };

    const handlePatchChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_PATCH, data: value });
    };

    const handleIdleCPUChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_IDELCPU, data: value });
    };

    const handleIdleRAMChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_IDELRAM, data: value });
    };

    const handleIdleDISKChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_IDELDISK, data: value });
    };
    const handleIdleGPUCOREChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_IDELGPUCORE, data: value });
    };

    const handleIdleGPUMEMChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_IDELGPUMEM, data: value });
    };

    const handleDesiredCPUChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_DESIREDCPU, data: value });
    };

    const handleDesiredRAMChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_DESIREDRAM, data: value });
    };

    const handleDesiredDISKChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_DESIREDDISK, data: value });
    };
    const handleDesiredGPUCOREChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_DESIREDGPUCORE, data: value });
    };

    const handleDesiredGPUMEMChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_DESIREDGPUMEM, data: value });
    };

    const handleProcessCapabilityChange = e => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SERVICE_PROCESSCAPABILITY, data: value });
    };

    return (
        <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)", overflow: 'auto' }} direction='column' justifyContent='space-between'>
            <Stack direction='column' spacing={2}>
                <Box>
                    <h3>{intl.messages['serviceOverview.serviceDetails']}</h3>
                    <KubeInput
                        label={intl.messages['common.serviceId']}
                        description={intl.messages['serviceOverview.serviceIDDescription']}
                        required={true}
                        id='service-id-input'
                        variant='outlined'
                        value={serviceID}
                        onChange={handleServiceIDChange}
                        error={serviceIDError && showError}
                        errorMessage={intl.messages['instance.serviceIdEmptyError']}
                    />

                    <KubeInput
                        label={intl.messages['common.serviceName']}
                        description={intl.messages['serviceOverview.serviceNameDescription']}
                        required={true}
                        id='service-name-input'
                        variant='outlined'
                        value={serviceName}
                        onChange={handleServiceNameChange}
                        error={serviceNameError && showError}
                        errorMessage={
                            serviceNameErrorType === 0
                                ? intl.messages['instance.nameEmptyErrorMsg']
                                : intl.messages['serviceManagement.serviceNameInvalidErrorMsg']
                        }
                    />

                    <KubeInput
                        label={intl.messages['serviceOverview.codeRepository']}
                        description=''
                        required={false}
                        id='code-repository-input'
                        variant='outlined'
                        value={codeRepository}
                        onChange={handleCodeRepositoryChange}
                    />

                    <KubeInput
                        label={intl.messages['serviceOverview.imageURLandTAG']}
                        description=''
                        required={false}
                        id='image-url-and-tag-input'
                        variant='outlined'
                        value={imageURLandTAG}
                        onChange={handleImageURLandTAGChange}
                    />
                </Box>

                <Box>
                    <h3>{intl.messages['common.serviceVersion']}</h3>
                    <KubeInput
                        label={intl.messages['serviceOverview.majorVersion']}
                        description=""
                        required={false}
                        id='major-input'
                        variant='outlined'
                        value={major}
                        onChange={handleMajorChange}
                    />

                    <KubeInput
                        label={intl.messages['serviceOverview.minorVersion']}
                        description=""
                        required={false}
                        id='minor-input'
                        variant='outlined'
                        value={minor}
                        onChange={handleMinorChange}
                    />

                    <KubeInput
                        label={intl.messages['serviceOverview.patchVersion']}
                        description=""
                        required={false}
                        id='patch-input'
                        variant='outlined'
                        value={patch}
                        onChange={handlePatchChange}
                    />
                </Box>

                <Box>
                    <h3>{intl.messages['serviceOverview.resourceAndCapability']}</h3>
                    <h4>{intl.messages['serviceOverview.idleOccupation']}</h4>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <KubeInput
                                label={intl.messages['serviceOverview.cpuResource']}
                                description=""
                                required={false}
                                id='idle-cpu-resources-input'
                                variant='outlined'
                                value={idleCPU}
                                onChange={handleIdleCPUChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <KubeInput
                                label={intl.messages['serviceOverview.ramResource']}
                                description=""
                                required={false}
                                id='idle-ram-resources-input'
                                variant='outlined'
                                value={idleRAM}
                                onChange={handleIdleRAMChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <KubeInput
                                label={intl.messages['serviceOverview.diskResource']}
                                description=""
                                required={false}
                                id='idle-disk-resources-input'
                                variant='outlined'
                                value={idleDISK}
                                onChange={handleIdleDISKChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <KubeInput
                                label={intl.messages['serviceOverview.gpuCoreResource']}
                                description=""
                                required={false}
                                id='idle-gpu-core-resources-input'
                                variant='outlined'
                                value={idleGPUCORE}
                                onChange={handleIdleGPUCOREChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <KubeInput
                                label={intl.messages['serviceOverview.gpuMemResource']}
                                description=""
                                required={false}
                                id='idle-gpu-memory-resources-input'
                                variant='outlined'
                                value={idleGPUMEM}
                                onChange={handleIdleGPUMEMChange}
                            />
                        </Grid>
                    </Grid>

                    <h4>{intl.messages['serviceOverview.desiredResource']}</h4>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <KubeInput
                                label={intl.messages['serviceOverview.cpuResource']}
                                description=""
                                required={false}
                                id='desired-cpu-resources-input'
                                variant='outlined'
                                value={desiredCPU}
                                onChange={handleDesiredCPUChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <KubeInput
                                label={intl.messages['serviceOverview.ramResource']}
                                description=""
                                required={false}
                                id='desired-ram-resources-input'
                                variant='outlined'
                                value={desiredRAM}
                                onChange={handleDesiredRAMChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <KubeInput
                                label={intl.messages['serviceOverview.diskResource']}
                                description=""
                                required={false}
                                id='desired-disk-resources-input'
                                variant='outlined'
                                value={desiredDISK}
                                onChange={handleDesiredDISKChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <KubeInput
                                label={intl.messages['serviceOverview.gpuCoreResource']}
                                description=""
                                required={false}
                                id='desired-gpu-core-resources-input'
                                variant='outlined'
                                value={desiredGPUCORE}
                                onChange={handleDesiredGPUCOREChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <KubeInput
                                label={intl.messages['serviceOverview.gpuMemResource']}
                                description=""
                                required={false}
                                id='desired-gpu-memory-resources-input'
                                variant='outlined'
                                value={desiredGPUMEM}
                                onChange={handleDesiredGPUMEMChange}
                            />
                        </Grid>
                    </Grid>

                    <h4>{intl.messages['serviceOverview.processCapability']}</h4>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <KubeInput
                                label={intl.messages['serviceOverview.processCapability']}
                                description=""
                                required={false}
                                id='desired-process-capability-input'
                                variant='outlined'
                                value={processCapability}
                                onChange={handleProcessCapabilityChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Stack>

            <Stack spacing={2} mt={4}>
                <h3>{intl.messages['serviceOverview.apiCollection']}</h3>
                {interfaces.map((interfaceItem, index) => (
                    <Box key={index} sx={{ mt: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                        <Stack direction="column" spacing={2}>
                            <KubeInput
                                label={intl.messages['serviceOverview.api']}
                                description=""
                                required={true}
                                id={`id-${index}`}
                                variant="outlined"
                                value={interfaceItem.id}
                                onChange={(e) => handleChangeInterface(index, 'id', e.target.value)}
                            />
                            <KubeInput
                                label={intl.messages['serviceOverview.apiPath']}
                                description=""
                                required={true}
                                id={`path-${index}`}
                                variant="outlined"
                                value={interfaceItem.path}
                                onChange={(e) => handleChangeInterface(index, 'path', e.target.value)}
                            />
                            <KubeInput
                                label={intl.messages['serviceOverview.apiInputSize']}
                                description=""
                                required={false}
                                id={`input-size-${index}`}
                                variant="outlined"
                                value={interfaceItem.inputSize}
                                onChange={(e) => handleChangeInterface(index, 'inputSize', e.target.value)}
                            />
                            <KubeInput
                                label={intl.messages['serviceOverview.apiOutputSize']}
                                description=""
                                required={false}
                                id={`output-size-${index}`}
                                variant="outlined"
                                value={interfaceItem.outputSize}
                                onChange={(e) => handleChangeInterface(index, 'outputSize', e.target.value)}
                            />
                            <KubeInput
                                label={intl.messages['serviceOverview.apiMethod']}
                                description=""
                                required={true}
                                id={`method-${index}`}
                                variant="outlined"
                                value={interfaceItem.method}
                                onChange={(e) => handleChangeInterface(index, 'method', e.target.value)}
                            />
                            <KubeInput
                                label={intl.messages['serviceOverview.apiDescription']}
                                description=""
                                required={false}
                                id={`description-${index}`}
                                variant="outlined"
                                value={interfaceItem.description}
                                onChange={(e) => handleChangeInterface(index, 'description', e.target.value)}
                            />
                            {index > 0 && (
                                <IconButton onClick={() => handleRemoveInterface(index)}>
                                    <RemoveCircleIcon />
                                </IconButton>
                            )}
                        </Stack>
                    </Box>
                ))}
                <IconButton onClick={handleAddInterface}>
                    <AddCircleIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
}