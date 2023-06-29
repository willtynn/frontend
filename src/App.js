import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <div className='App'>
      <Stack direction='row' spacing={2}>
        <Button>MUI的示例按钮</Button>
        <Button>在/src的App.js加入Router</Button>
        <Button href='#'>其余页面通过路由访问</Button>
      </Stack>
    </div>
  );
}

export default App;
