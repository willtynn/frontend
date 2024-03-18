import { useState } from 'react';
import { Stack } from '@mui/material';
import { KubeInput } from '@/components/Input';
import { useSelector, useDispatch } from 'react-redux';
import {EDIT_JSON_DATA, EDIT_ORIGIN_MODEL_NAME, EDIT_STRATEGY_NAME} from "@/actions/partitionAction";

export function EditBox(props) {
  const { showError } = props;

  const {
    strategyName,
    originModelName,
    jsonData,
  } = useSelector(state => {
    return {
      strategyName: state.Partition.strategyName,
      originModelName: state.Partition.originModelName,
      jsonData: state.Partition.jsonData,
    };
  });

  const [jsonDataError, setJsonDataError] = useState(true);
  const dispatch = useDispatch();

  const handleNameChange = e => {
    dispatch({type: EDIT_STRATEGY_NAME, data: e.target.value});
  };

  const handleOriginChange = e => {
    dispatch({type: EDIT_ORIGIN_MODEL_NAME, data: e.target.value});
  };

  const handleJsonChange = e => {
    if (e.target.value === '') {
      setJsonDataError(true);
    } else {
      setJsonDataError(false);
    }
    dispatch({type: EDIT_JSON_DATA, data: e.target.value});
  };

  return (
    <Stack sx={{ p: '32px 64px', backgroundColor: '#FFFFFF', height: "calc(100% - 244px)" }} direction='column' justifyContent='space-between' >
      <Stack
        direction='column'
        spacing={2}
      >
        <KubeInput
          label='拆分策略'
          decription={'输入拆分策略的名称'}
          requried={true}
          id='json-input'
          variant='outlined'
          value={strategyName}
          onChange={handleNameChange}
          error={false}
          errorMessage={'不能为空'}
        />
        <KubeInput
          label='拆分模型'
          decription={'输入将要拆分原始模型名称'}
          requried={true}
          id='json-input'
          variant='outlined'
          value={originModelName}
          onChange={handleOriginChange}
          error={false}
          errorMessage={'不能为空'}
        />
        <KubeInput
          label='JSON'
          decription={'输入拆分策略的json文件'}
          requried={true}
          id='json-input'
          variant='outlined'
          value={jsonData}
          onChange={handleJsonChange}
          error={jsonDataError && showError}
          errorMessage={'不能为空'}
        />
      </Stack>
    </Stack>
  );
}
