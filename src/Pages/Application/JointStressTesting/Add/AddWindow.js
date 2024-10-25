import React, { useState } from 'react';
import { Box, Stack, Button, TextField, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { createJointTestPlan } from '../../../../actions/applicationAction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '960px',
    boxShadow: 24,
    height: 'calc(100% - 120px)',
    fontFamily: 'Arial, sans-serif', // 确保字体已定义
};

export function AddModal(props) {
    const { handleConfirmClick, handleCancelClick, showError, setShowError } = props;
    const intl = useIntl();
    const dispatch = useDispatch();

    const {
        jointPlanName,
        jointPlanComment,
        testPlanIds,
    } = useSelector(state => ({
        jointPlanName: state.Application.jointPlanName,
        jointPlanComment: state.Application.jointPlanComment,
        testPlanIds: state.Application.testPlanIds,
    }));

    const [name, setName] = useState(jointPlanName);
    const [description, setDescription] = useState(jointPlanComment);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTestPlanId, setSelectedTestPlanId] = useState(null);

    const handleConfirmButtonClick = (event) => {
        event.preventDefault(); // 防止表单提交的默认行为
        const jointTestPlan = {
            name,
            comment: description,
            testPlanIds: testPlanIds,
        };
        dispatch(createJointTestPlan(jointTestPlan));
        handleConfirmClick(); // 调用确认点击处理函数
    };

    return (
        <Box sx={style}>
            <Typography variant="h2" gutterBottom>
                {intl.formatMessage({ id: 'createNewTestPlan' })}
            </Typography>
            <form onSubmit={handleConfirmButtonClick}>
                <Stack spacing={2}>
                    <TextField
                        label={intl.formatMessage({ id: 'name' })}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label={intl.formatMessage({ id: 'description' })}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        multiline
                        rows={4}
                    />
                    <TextField
                        label={intl.formatMessage({ id: 'selectTestPlan' })}
                        placeholder={intl.formatMessage({ id: 'searchTestPlan' })}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {testPlanIds.filter(id => id.includes(searchTerm)).map((id) => (
                            <li
                                key={id}
                                onClick={() => setSelectedTestPlanId(id)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '8px',
                                    background: selectedTestPlanId === id ? '#007bff' : 'transparent',
                                    color: selectedTestPlanId === id ? 'white' : 'black',
                                }}
                            >
                                {id}
                            </li>
                        ))}
                    </ul>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" onClick={handleCancelClick}>
                            {intl.formatMessage({ id: 'close' })}
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {intl.formatMessage({ id: 'submit' })}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
}
