import React from "react";
import { Box } from "@mui/material";

const RightBar = () => {
  return (
    <Box bgcolor="skyblue" flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">RightBar</Box>
    </Box>
  )
};

export default RightBar;