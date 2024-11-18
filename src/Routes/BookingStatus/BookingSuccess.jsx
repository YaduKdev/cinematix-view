import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useSearchParams } from "react-router-dom";
import { createBooking } from "../../api-calls/api-calls";

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let sessionQuery = `${searchParams}`;
    let sessionId = sessionQuery.replace("session_id=", "");

    console.log("SESSIONID=================", sessionId);

    const bookingData = {
      movie: localStorage.getItem("movie"),
      movieTheater: {
        name: localStorage.getItem("cinema"),
        location: localStorage.getItem("city"),
        seatNumbers: JSON.parse(localStorage.getItem("seatNumbers")),
        date: localStorage.getItem("bookingDate"),
        time: localStorage.getItem("showTime"),
        poster: localStorage.getItem("moviePoster"),
        movieName: localStorage.getItem("movieTitle"),
      },
      user: localStorage.getItem("userID"),
      sessionId,
    };

    createBooking(bookingData).then((res) => {
      console.log(res);
      localStorage.removeItem("movie");
      localStorage.removeItem("cinema");
      localStorage.removeItem("city");
      localStorage.removeItem("seatNumbers");
      localStorage.removeItem("bookingDate");
      localStorage.removeItem("showTime");
      localStorage.removeItem("moviePoster");
      localStorage.removeItem("movieTitle");
    });
  }, []);

  return (
    <Box
      sx={{ bgcolor: "secondary.main" }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"92.5vh"}
      className="booked-success"
    >
      <Typography variant="h2" color="primary">
        <CheckCircleOutlineRoundedIcon
          sx={{ mr: "10px", verticalAlign: "middle" }}
          color="success"
          fontSize="60"
        />
        Successfully Booked Ticket
      </Typography>
    </Box>
  );
};

export default BookingSuccess;
