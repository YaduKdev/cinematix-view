import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import HomeCarousel from "../../Components/HomeCarousel/HomeCarousel";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { getAllMovies } from "../../api-calls/api-calls";

import "./Home.css";

const Home = () => {
  const [notification, setNotification] = useState(false);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("movie")) localStorage.removeItem("movie");
    if (localStorage.getItem("transaction"))
      localStorage.removeItem("transaction");

    getAllMovies()
      .then((data) => {
        setTopMovies(
          data.movies
            .sort((a, b) => {
              let aDate = new Date(a.releaseDate);
              let bDate = new Date(b.releaseDate);

              return bDate - aDate;
            })
            .slice(0, 7)
        );

        console.log("top moviii====", topMovies);
      })
      .catch((err) => console.log(err));
  }, []);

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
        <NotificationsActiveIcon fontSize="large" sx={{ color: "#b71c1c" }} />
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
        <HomeCarousel movies={topMovies} />
      </Box>
    </>
  );
};

export default Home;
