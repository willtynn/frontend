/**
 * src\Pages\Route\trace\Loading\index.js
 */
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';

export function Loading(props) {
  const { show } = props;

  return show ? (
    <div className='dialog'>
      <CircularProgress className='icon' />
    </div>
  ) : (
    <></>
  );
}
