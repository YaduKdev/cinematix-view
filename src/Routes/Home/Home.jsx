import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import HeroCarousel from "../../Components/HeroCarousel";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import "./Home.css";

const Home = () => {
  const [notification, setNotification] = useState(false);

  const notify = (
    <Tooltip title="Set Notification">
      <IconButton>
        <NotificationsIcon fontSize="large" sx={{ color: "#FAFAFA" }} />
      </IconButton>
    </Tooltip>
  );

  const notified = (
    <Tooltip title="Remove Notification">
      <IconButton>
        <NotificationsActiveIcon fontSize="large" color="primary" />
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      <div className="hero">
        <div className="notifications-container">
          <div
            className="notifications"
            onClick={() => setNotification(!notification)}
          >
            {notification ? notified : notify}
          </div>
        </div>
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
