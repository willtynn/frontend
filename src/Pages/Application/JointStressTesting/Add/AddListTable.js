
import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { SmallLightFont } from '@/components/Fonts';
import { Stack } from '@mui/material';
import { useIntl } from 'react-intl';



const AddListTable = ({ listItems, setTestPlanIds,selectedIds }) => {
    const intl = useIntl();
    const [selectionModel, setSelectionModel] = useState([]);

    const columns = [
        { field: 'testPlanName', headerName: intl.messages['common.testPlan'], width: 130 },
        { field: 'serialized', headerName: intl.messages['common.serialized'], width: 70 },
        { field: 'functionalMode', headerName: intl.messages['common.functionMode'], width: 80 },
        { field: 'tearDown', headerName: 'Tear', width: 80 },
        { field: 'namespace', headerName: 'Namespace', width: 130 },
        { field: 'podName', headerName: 'PodName', width: 130 },
        { field: 'comment', headerName: intl.messages['stressTesting.comment'], width: 130 },
      ];
    const paginationModel = { page: 0, pageSize: 5 };

    const handleSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);
        setTestPlanIds(newSelectionModel); 
    };

    useEffect(() => {
      setTestPlanIds(selectedIds);
    },[]);

    useEffect(() => {
      setSelectionModel(selectedIds);
  }, [selectedIds]);

    return (
        <Stack>
        <SmallLightFont>
        {intl.messages['jointStressTesting.sonTestPlans']}
      </SmallLightFont>

        <Paper sx={{ height: 300, width: '100%' }}>
          <DataGrid
            rows={listItems}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onSelectionModelChange={handleSelectionModelChange} 
            selectionModel={selectionModel}
            sx={{ border: 0 }}
          />
        </Paper>
        </Stack>
      );
};

export default AddListTable;
