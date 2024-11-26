import { Box, Button, Typography } from "@mui/material";
import React from "react";
import useScreenSize from "../../Hooks/ScreenSize";
import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  const screenSize = useScreenSize();
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"91.68svh"}
      sx={{ bgcolor: "secondary.main" }}
      gap={2}
    >
      <Typography variant={screenSize.width > 800 ? "h1" : "h3"} color="error">
        404
      </Typography>
      <Typography
        variant={screenSize.width > 800 ? "h4" : "h6"}
        color="primary"
      >
        We Can't Find This Page
      </Typography>
      <Typography
        variant={screenSize.width > 800 ? "body1" : "body2"}
        color="primary"
      >
        Check the URL and try again, or go back to our homepage.
      </Typography>
      <Button variant="outlined" onClick={() => navigate("/")}>
        GO BACK HOME
      </Button>
    </Box>
  );
};

export default NoMatch;
