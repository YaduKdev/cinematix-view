import { Box, Typography } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import React, { useEffect } from "react";

const BookingFail = () => {
  useEffect(() => {
    localStorage.removeItem("movie");
    localStorage.removeItem("cinema");
    localStorage.removeItem("city");
    localStorage.removeItem("seatNumbers");
    localStorage.removeItem("bookingDate");
    localStorage.removeItem("showTime");
    localStorage.removeItem("moviePoster");
    localStorage.removeItem("movieTitle");
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
        <ErrorOutlineRoundedIcon
          sx={{ mr: "10px", verticalAlign: "middle" }}
          color="error"
          fontSize="60"
        />
        Could Not Book Ticket
      </Typography>
    </Box>
  );
};

export default BookingFail;
