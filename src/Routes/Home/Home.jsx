// REACT
import React, { useState, useEffect } from "react";

//REACT COMPONENTS
import HomeCarousel from "../../Components/HomeCarousel/HomeCarousel";

//MUI
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Box, IconButton, Tooltip } from "@mui/material";
import Spinner from "../../Components/Spinner/Spinner";

//API (AXIOS)
import { getAllMovies } from "../../api-calls/api-calls";

//CSS
import "./Home.css";

const Home = () => {
  //State Components
  const [notification, setNotification] = useState(false);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("movie")) localStorage.removeItem("movie");

    if (localStorage.getItem("transaction"))
      localStorage.removeItem("transaction");

    if (localStorage.getItem("logging")) localStorage.removeItem("logging");

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
      {topMovies.length > 0 ? (
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
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Home;
