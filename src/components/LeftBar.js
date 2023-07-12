import React from "react";
import { Box } from "@mui/material";

const LeftBar = () => {
  return (
    <Box bgcolor="#1f1f1f" flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed"></Box>
    </Box>
  )
};

export default LeftBar;