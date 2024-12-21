import { Box } from '@mui/material';
import { Tabs } from '@mui/base/Tabs';
import {
  StyledTab,
  StyledTabsList,
  StyledTabPanel,
} from '@/components/Tab';
import { Information } from './Information';
import { InstanceInfo }  from './InstanceInfo';
import { useIntl } from 'react-intl';
import {useState} from "react";
import { useSelector } from 'react-redux';  // 导入 useSelector

export default function DetailInfo({ algorithmName }) {

  const intl = useIntl();

  // 状态管理当前选中的 tab 和当前选中的 runName
  const [value, setValue] = useState(1);
  const [selectedRunName, setSelectedRunName] = useState(null);
  const [selectedInstanceDetails, setSelectedInstanceDetails] = useState(null);
  // 从 Redux 中获取 instances 数据
  const instances = useSelector(state => state.AlgorithmReducer.allInstances);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };


  // 在点击 runName 时，更新 selectedRunName，切换为 InstanceInfo 组件
  const handleInstanceClick = (runName) => {
    setSelectedRunName(runName); // 更新选中的 runName
    setValue(2); // 切换到第二个 Tab 显示 InstanceInfo


  // 直接从已加载的实例数据中筛选对应的 runName 实例
  const instanceDetails = instances.find(item => item.runName === runName);
  setSelectedInstanceDetails(instanceDetails); // 将对应实例数据传递给 InstanceInfo
  };

  return (
    <Box
      sx={{
        width: 'calc(100% - 380px)',
        height: '300px',
      }}
    >
      <Tabs value={value} onChange={handleTabChange}>
        <StyledTabsList>
          <StyledTab
              value={1}
              sx={{
                backgroundColor: '#55bc8a',
                '&:not(.Mui-selected)': {
                  color: '#eff4f9', // 未选中状态下的背景色保持一致
                },
                color: '#eff4f9'
              }}
          >
            {intl.messages['evolution.instanceInfo']}
          </StyledTab>
        </StyledTabsList>

        <StyledTabPanel value={1}>
          {/* 将 algorithmName 传递给 Information */}
          <Information
              algorithmName={algorithmName}
              onInstanceClick={handleInstanceClick} // 将点击事件传递给 Information
          />
        </StyledTabPanel>

        {selectedRunName && (
            <StyledTabPanel value={2}>
              {/* 根据 selectedRunName 渲染 InstanceInfo */}
              <InstanceInfo instanceDetails={selectedInstanceDetails}
                            onBackToList={() => setValue(1)} // 切换回 Information
              />
            </StyledTabPanel>
        )}
      </Tabs>
    </Box>
  );
}