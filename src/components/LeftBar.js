import React from "react";
import { Box } from "@mui/material";
import redwavey from "../images/redwavey.jpg"

const LeftBar = () => {
  return (
    <Box bgcolor="#1f1f1f" flex={1}
      sx={{
        display: { xs: "none", sm: "block" },
        backgroundImage: `url(${redwavey})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat"
      }}
    >
      <Box position="fixed"></Box>
    </Box>
  )
};

export default LeftBar;