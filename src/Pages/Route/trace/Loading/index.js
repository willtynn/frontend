import React from 'react';
//import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';

export function Loading(props) {
  //const [show, setShow] = useState(false);
  const { show } = props;

  return (
    show ?
    <div className="dialog">
      <CircularProgress className='icon'/>
    </div> : <></>
  )

}
