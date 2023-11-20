import { styled } from '@mui/system';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab, tabClasses } from '@mui/base/Tab';

export const StyledTab = styled(Tab)`
  height: 28px;
  
  color: #36435C;
  cursor: pointer;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 108px;
  background-color: #f9fbfd;
  

  &.${tabClasses.selected} {
    background-color: #36435C;
    color: #FFFFFF;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledTabsList = styled(TabsList)`
  padding: 0px 2px;
  margin: 0px 12px;
  height: 32px;
  background-color: #f9fbfd;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
  boxShadow: 0 4px 8px 0 rgba(36,46,66,.06);
  border: 1px solid #ccd3db;
  display: inline-flex;
`;

export const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  margin-top: 12px;
`;