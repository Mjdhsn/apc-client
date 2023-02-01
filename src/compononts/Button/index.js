import React from 'react'
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';


// Inspired by the former Facebook spinners.
function FBCircularProgress(props) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        size={0}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: "#30a652",
          animationDuration: '550ms',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={25}
        thickness={4}
        {...props}
      />
    </Box>
  );
}


const Index = ({ loading, children, ...props }) => {
  return (
    <Button
      {...props}
      disabled={loading}
    >
      {loading ? 
        <Box sx={{ flexGrow: 1 }} style={{ display:"flex", justifyContent:"center" }} >
          <FBCircularProgress />
        </Box>

        :

        children
      }
    </Button>
  )
}

export default Index