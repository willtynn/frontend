import React, { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { updateJointPlan, getTestPlans, UPDATE_CURRENT_JOINT_TEST_PLAN } from '../../../../actions/applicationAction';
import { KubeInput } from '@/components/Input';
import { fontFamily } from '@/utils/commonUtils';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { KubeCancelButton, KubeConfirmButton } from '@/components/Button';
import {
    UPDATE_JOINT_PLAN_NAME,
    UPDATE_JOINT_PLAN_COMMENT,
} from '../../../../actions/applicationAction';
import AddListTable from '../Add/AddListTable';

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


export function UpdateModal(props) {
    const { handleConfirmClick, handleCancelClick, showError, setError } = props;
    const intl = useIntl();
    const dispatch = useDispatch();
    const { jointTestPlanId } = useParams();

    const {
        currentJointPlan,
        testPlans,
        selectedIds,
    } = useSelector(state => ({
        currentJointPlan: state.Application.currentJointPlan,
        testPlans: state.Application.testPlans,
        selectedIds: state.Application.currentJointPlan.testPlanIds,
    }));

    const [jointPlanName, setJointPlanName] = useState('');
    const [jointPlanComment, setJointPlanComment] = useState('');
    const [jointPlanNameError, setJointPlanNameError] = useState(false);
    const [testPlanIds, setTestPlanIds] = useState([]);

    useEffect(() => {
        setError(jointPlanNameError);
    }, [jointPlanNameError]);

    useEffect(() => {
        setJointPlanName(currentJointPlan.name);
        setJointPlanComment(currentJointPlan.comment);
        dispatch(getTestPlans());
      }, []);

    const handleJointPlanNameChange = e => {
        const value = e.target.value;
        setJointPlanNameError(value === '');
        setJointPlanName(value);
        dispatch({ type: UPDATE_JOINT_PLAN_NAME, data: value });
    };

    const handleJointPlanCommentChange = e => {
        const value = e.target.value;
        setJointPlanComment(value);
        dispatch({ type: UPDATE_JOINT_PLAN_COMMENT, data: value });
    };


    const handleConfirmButtonClick = (event) => {
        event.preventDefault(); 
        const jointTestPlan = {
            id: jointTestPlanId,
            name: jointPlanName,
            comment: jointPlanComment,
            testPlanIds: testPlanIds,
        };

        dispatch(updateJointPlan(jointTestPlan));
        dispatch({type: UPDATE_CURRENT_JOINT_TEST_PLAN ,data: jointTestPlan})
        handleConfirmClick(); 
    };

    const handleCancelButtonClick = () => {
        handleCancelClick();
    };

    

    return (
        <Box sx={style}>
            <KubeDeploymentCard
                title={intl.messages['jointStressTesting.updateTestPlan']}
                handleClose={handleCancelClick}
            >
                <Stack
                    direction='column'
                    spacing={0}
                    sx={{ bgcolor: '#eff4f9', p: '0px 20px', overflow: 'auto', flex: 1 }}
                >
                    <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)", overflow: 'auto' }}
                        direction='column' justifyContent='space-between'>
                        <Stack direction='column' spacing={2}>
                            <Box>
                                <KubeInput
                                    label={intl.messages['jointStressTesting.name']}
                                    //description={intl.messages['jointStressTesting.nameDescription']}
                                    required={true}
                                    id='jointPlan-name-input'
                                    variant='outlined'
                                    value={jointPlanName}
                                    onChange={handleJointPlanNameChange}
                                    error={jointPlanNameError && showError}
                                    errorMessage={intl.messages['jointStressTesting.nameEmptyError']}
                                />

                                <KubeInput
                                    label={intl.messages['jointStressTesting.comment']}
                                    description={intl.messages['jointStressTesting.commentDescription']}
                                    required={false}
                                    id='jointPlan-comment-input'
                                    variant='outlined'
                                    value={jointPlanComment}
                                    onChange={handleJointPlanCommentChange}
                                />

                            </Box>
                            
                            <Box>
                                <AddListTable listItems={testPlans} setTestPlanIds={setTestPlanIds} selectedIds={selectedIds}/>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>

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
                        {intl.messages['common.add']}
                        {/* {!serviceEdit
                            ? intl.messages['common.create']
                            : serviceEditIndex !== null
                                ? intl.messages['serviceOverview.editService']
                                : intl.messages['common.add']} */}
                    </KubeConfirmButton>
                </Stack>
            </KubeDeploymentCard>
        </Box>
    );
}