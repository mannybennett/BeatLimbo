import React from "react";
import { Box } from "@mui/material";

const LeftBar = () => {
  return (
    <Box bgcolor="skyblue" flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">LeftBar</Box>
    </Box>
  )
};

export default LeftBar;