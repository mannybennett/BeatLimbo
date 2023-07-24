import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import white from '../images/white.jpg';

const RightBar = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <>
      {!isLandingPage &&
        <Box bgcolor="#1f1f1f" flex={1}
          sx={{
            display: { xs: "none", sm: "block"},
            // backgroundImage: `url(${white})`,
            backgroundImage: 'linear-gradient(to bottom right, #333333, white)',
            backgroundAttachment: 'fixed',
            backgroundSize: '100% 100%'
          }}
        >
          <Box position="fixed"></Box>
        </Box>
      }
    </>
  )
};

export default RightBar;