import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab, tabClasses } from '@mui/base/Tab';
import { fontFamily } from '../../utils/commonUtils';


export const StyledTab = styled(Tab)`
  height: 32px;
  
  color: #FFFFFF;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  padding: 8px 12px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 108px;
  background-color: #242E42;
  margin-right: 12px;

  &:hover {
    color: #55bc8a;
  }

  &.${tabClasses.selected} {
    background-color: #55bc8a;
    color: #FFFFFF;
    box-shadow: 0 8px 16px 0 rgba(85,188,138,.36);
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledTabsList = styled(TabsList)`
  padding: 0px 14px;
  height: 48px;
  min-width: 400px;
  background-color: #242E42;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
`;

export const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  margin-top: 12px;
`;