// REACT
import React from "react";

//MUI
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"91.68svh"}
      sx={{ bgcolor: "secondary.main" }}
    >
      <CircularProgress color="warning" />
    </Box>
  );
};

export default Spinner;
