import { Box, Stack, Button, Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux'
import ReactDOM from 'react-dom';
import { shadowStyle } from '@/utils/commonUtils';
import { fontFamily } from '../../../utils/commonUtils';
import KubeClose from '@/assets/KubeClose.svg';
import { KubeInput } from '../../../components/Input';
import { useIntl } from 'react-intl';
import {
	KubeCancelButton,
	KubeConfirmButton,
} from '../../../components/Button';


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '560px',
	boxShadow: 24,
	height: 'calc(100% - 520px)',
	fontFamily: fontFamily,
};

export default function Upload(props) {
	const { handleConfirmClick, handleCancelClick, modelName, 
		modelFile, selectFile, handleModelNameChange, handleFileChange} =
		props;
	const intl = useIntl();
	const dispatch = useDispatch();
	// const [modelName, setModelName] = useState('');
	// const [modelFile, setModelFile] = useState('');
	// const [selectFile, setSelectFile] = useState(null);
	const [idError, setIdError] = useState(false);
	const [fileError, setFileError] = useState(false);

	const { isLoading } = useSelector(state => {
		return {
			isLoading: state.Model.isLoading
		};
	});

	useEffect(() => {
		if (modelName === "") {
			setIdError(true);
		} else {
			setIdError(false);
		}
	}, []);


	const deployValues = [
		<KubeInput
			label='模型名称'
			decription={intl.messages['instance.serverIdDescription']}
			requried={true}
			id='upload-model-name'
			variant='outlined'
			value={modelName}
			onChange={handleModelNameChange}
			error={idError && fileError}
			errorMessage={intl.messages["instance.serviceIdEmptyError"]}
		/>,
		<KubeInput
			label='模型文件'
			decription={intl.messages['instance.serverIdDescription']}
			requried={true}
			id='upload-model-file'
			variant='outlined'
			value={modelFile}
			// onChange={handleModelNameChange}
			error={idError && fileError}
			errorMessage={intl.messages["instance.serviceIdEmptyError"]}
		/>,
		<div>
			<Input
				type="file"
				inputProps={{ accept: '.onnx' }} // 可选的文件类型
				onChange={handleFileChange}
				style={{ display: 'none' }}
				id="file-input"
			/>
			<label htmlFor="file-input">
				<Button variant="contained" component="span">
					选择文件
				</Button>
			</label>
		</div>
	];


	return (
		<Box sx={style}>
			<Box
				className='KubeDeployCard'
				sx={{
					bgcolor: '#f9fbfd',
					borderRadius: '4px',
					...shadowStyle,
					p: 0,
					height: '100%',
				}}
			>
				<Box
					sx={{
						borderBottom: '1px #ccd3db solid',
						p: '10px 20px 10px 20px',
						color: '#262E35',
						fontSize: '12px',
						fontFamily: fontFamily,
						fontStyle: 'normal',
						fontWeight: 700,
						height: '40px',
					}}
				>
					{/* 窗口上方 */}
					<Stack
						direction='row'
						justifyContent='space-between'
						alignItems='center'
					>
						<Box sx={{ height: '40px', lineHeight: '40px' }}>{"上传模型文件"}</Box>
						<Box
							sx={{
								cursor: 'pointer',
								boxShadow: '0 8px 16px 0 rgba(35,45,65,.28)',
								'&:hover': {
									boxShadow: 'none',
								},
								height: '32px',
							}}
							onClick={handleCancelClick}
						>
							<KubeClose />
						</Box>
					</Stack>

					{/* 输入框 */}
					<Box sx={{ p: '64px 64px 32px 64px', bgcolor: '#FFFFFF' }}>
						<Stack direction='row' spacing={3}>
							<Stack sx={{ width: '100%' }} spacing={3}>
								{deployValues.map((value, index) => {
									return (
										<Box
											sx={{
												width: '100%',
												fontFamily: fontFamily,
												fontStyle: 'normal',
												fontWeight: 400,
												color: '#262E35',
												flex: 'none',
												alignSelf: 'stretch',
												flexGrow: 0,
											}}
											key={index}
										>
											{value}
										</Box>
									);
								})}
							</Stack>
						</Stack>
					</Box>

					{/* 按钮组 */}
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
							onClick={handleCancelClick}
						>
							取消
						</KubeCancelButton>

						<KubeConfirmButton
							sx={{ height: '32px', p: '5px 23px' }}
							onClick={handleConfirmClick}
						>
							确定
						</KubeConfirmButton>

					</Stack>
				</Box>
				{props.children}
			</Box>
		</Box>
	);
}
