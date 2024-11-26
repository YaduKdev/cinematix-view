import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createBooking } from "../../api-calls/api-calls";
import useScreenSize from "../../Hooks/ScreenSize";
import { useReactToPrint } from "react-to-print";

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState();
  const contentRef = useRef();

  const handlePrint = useReactToPrint({ contentRef });

  const goHome = () => {
    if (localStorage.getItem("movie")) localStorage.removeItem("movie");

    navigate("/");
  };

  useEffect(() => {
    let sessionQuery = `${searchParams}`;
    let sessionId = sessionQuery.replace("session_id=", "");

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

    setTicketData({ ...bookingData });

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

    console.log("TICKETDATA===========", ticketData);
  }, []);

  return (
    <Box
      sx={{ bgcolor: "secondary.main" }}
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"92.5vh"}
      className="booked-success"
    >
      <Typography
        variant={screenSize.width > 800 ? "h2" : "h5"}
        color="primary"
      >
        <CheckCircleOutlineRoundedIcon
          sx={{ mr: "10px", verticalAlign: "middle" }}
          color="success"
          fontSize={screenSize.width > 800 ? "60" : "40"}
        />
        Successfully Booked Ticket
      </Typography>
      {ticketData && (
        <Box display={"none"}>
          <Card
            ref={contentRef}
            sx={{
              display: "flex",
              width: "100%",
              bgcolor: "warning.main",
              justifyContent: "space-between",
              borderRadius: "0%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  flex: "1 0 auto",
                  padding: "20px",
                }}
              >
                <Typography
                  component="div"
                  variant="h5"
                  color="secondary"
                  fontWeight={"bold"}
                >
                  {ticketData.movieTheater.movieName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "secondary.main" }}
                >
                  {ticketData.movieTheater.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "secondary.main" }}
                >
                  Date: &nbsp;{ticketData.movieTheater.date}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "secondary.main" }}
                >
                  Time: &nbsp;{ticketData.movieTheater.time}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "secondary.main" }}
                >
                  Seats: &nbsp;
                  {ticketData.movieTheater.seatNumbers.map((seat) => (
                    <span>{seat} &nbsp;</span>
                  ))}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 1,
                  pb: 1,
                }}
              ></Box>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 121 }}
              image={ticketData.movieTheater.poster}
              alt={ticketData.movieTheater.movieName}
            />
          </Card>
        </Box>
      )}
      <Box
        display={"flex"}
        flexDirection={screenSize.width > 800 ? "row" : "column"}
        gap={screenSize.width > 800 ? 3 : 2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button
          variant="outlined"
          size={screenSize.width > 800 ? "large" : "small"}
          onClick={handlePrint}
        >
          PRINT TICKET
        </Button>
        <Button
          variant="outlined"
          size={screenSize.width > 800 ? "large" : "small"}
          onClick={goHome}
        >
          GO BACK HOME
        </Button>
      </Box>
    </Box>
  );
};

export default BookingSuccess;
