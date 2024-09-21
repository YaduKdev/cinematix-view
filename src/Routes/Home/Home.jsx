import { Box } from "@mui/material";
import React from "react";
import HeroCarousel from "../../Components/HeroCarousel";

import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-text-container">
          <div className="hero-text"></div>
        </div>
      </div>
      <Box
        width={"100%"}
        margin="auto"
        paddingTop={2}
        paddingBottom={2}
        sx={{ bgcolor: "secondary.main" }}
      >
        <HeroCarousel />
      </Box>
    </>
  );
};

export default Home;
