import * as React from 'react';
import Box from '@mui/material/Box';
import './Loader.css'
import {  Loader as NewLoader } from "@mantine/core";


export default function Loader() {
  return (
    <div className='loader-container' >
      <Box sx={{ flexGrow: 1 }} >
        <NewLoader style={{ margin: "auto" }} color="#30a652" />
      </Box>      
    </div>
  );
}