import { Box, Typography } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../Hooks/ScreenSize";

const BookingFail = () => {
  const navigate = useNavigate();
  const screenSize = useScreenSize();

  useEffect(() => {
    let movieId = localStorage.getItem("movie");

    localStorage.removeItem("cinema");
    localStorage.removeItem("city");
    localStorage.removeItem("seatNumbers");
    localStorage.removeItem("bookingDate");
    localStorage.removeItem("showTime");
    localStorage.removeItem("moviePoster");
    localStorage.removeItem("movieTitle");

    setTimeout(() => navigate(`/booking/${movieId}`), 3000);
  }, []);

  return (
    <Box
      sx={{ bgcolor: "secondary.main" }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
      width={"100%"}
      height={"92.5vh"}
      className="booked-success"
    >
      <Typography
        variant={screenSize.width > 800 ? "h2" : "h5"}
        color="primary"
      >
        <ErrorOutlineRoundedIcon
          sx={{ mr: "10px", verticalAlign: "middle" }}
          color="error"
          fontSize={screenSize.width > 800 ? "60" : "40"}
        />
        Could Not Book Ticket.
      </Typography>
      <Box
        display={"flex"}
        gap={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CircularProgress
          color="success"
          size={screenSize.width < 800 ? 20 : 40}
        />
        <Typography
          variant={screenSize.width > 800 ? "h4" : "body1"}
          color="primary"
        >
          Redirecting To Booking Page.....
        </Typography>
      </Box>
    </Box>
  );
};

export default BookingFail;
