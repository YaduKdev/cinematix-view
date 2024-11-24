import React, { useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../../api-calls/api-calls";
import { Box, Divider, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "./UserProfile.css";
import useScreenSize from "../../Hooks/ScreenSize";

const UserProfile = () => {
  const [userBookings, setUserBookings] = useState();
  const [userDetails, setUserDetails] = useState();
  const screenSize = useScreenSize();

  useEffect(() => {
    getUserBooking()
      .then((res) => setUserBookings(res.userBookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUserDetails(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Box
      width={"100%"}
      padding={3}
      display={"flex"}
      flexDirection={screenSize.width > 1000 ? "row" : "column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ bgcolor: "secondary.main" }}
    >
      {userDetails && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"30%"}
          gap={2}
        >
          <AccountCircleIcon sx={{ fontSize: "10rem" }} color="primary" />
          <Typography
            padding={1}
            width={"auto"}
            textAlign={"center"}
            color="primary"
            variant="h6"
            fontWeight={"bold"}
          >
            {userDetails.name}
          </Typography>
          <Typography
            padding={1}
            width={"auto"}
            textAlign={"center"}
            color="primary"
            marginBottom={2}
            variant="body1"
            fontWeight={"bold"}
            fontStyle={"oblique"}
          >
            {userDetails.email}
          </Typography>
        </Box>
      )}
      <Divider
        orientation={screenSize.width > 1000 ? "vertical" : "horizontal"}
        variant="middle"
        flexItem
      />
      {userBookings && userBookings.length !== 0 && (
        <Box width={"70%"} marginBottom={5}>
          <Typography
            padding={1}
            width={"auto"}
            textAlign={"center"}
            color="primary"
            marginBottom={4}
            variant="h5"
            fontWeight={"bold"}
          >
            BOOKINGS
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            sx={{ overflowY: "auto" }}
          >
            {userBookings.map((booking) => {
              return (
                <Card
                  sx={{
                    display: "flex",
                    width:
                      screenSize.width > 1000
                        ? "600px"
                        : screenSize.width > 800
                        ? "350px"
                        : "220px",
                    bgcolor: "warning.main",
                    justifyContent:
                      screenSize.width < 1000 ? "center" : "space-between",
                    alignItems: screenSize.width < 1000 && "center",
                    flexDirection:
                      screenSize.width > 1000 ? "row" : "column-reverse",
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
                        // flex: "1 0 auto",
                        padding: screenSize.width < 800 ? "7px" : "20px",
                      }}
                    >
                      <Typography
                        component="div"
                        variant={screenSize.width > 800 ? "h5" : "body1"}
                        color="secondary"
                        fontWeight={"bold"}
                      >
                        {booking.movieTheater.movieName}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontSize={screenSize.width < 800 && "13px"}
                        component="div"
                        sx={{ color: "secondary.main" }}
                      >
                        {booking.movieTheater.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontSize={screenSize.width < 800 && "13px"}
                        component="div"
                        sx={{ color: "secondary.main" }}
                      >
                        Date: &nbsp;{booking.movieTheater.date}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        fontSize={screenSize.width < 800 && "13px"}
                        sx={{ color: "secondary.main" }}
                      >
                        Time: &nbsp;{booking.movieTheater.time}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        fontSize={screenSize.width < 800 && "13px"}
                        sx={{ color: "secondary.main" }}
                      >
                        Seats: &nbsp;
                        {booking.movieTheater.seatNumbers.map((seat) => (
                          <span>{seat} &nbsp;</span>
                        ))}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: screenSize.width > 1000 ? 1 : 0,
                        pb: screenSize.width > 1000 ? 1 : 0,
                      }}
                    >
                      <IconButton
                        sx={{ "&:hover": { backgroundColor: "warning.light" } }}
                      >
                        <DeleteForeverIcon
                          onClick={() => handleDelete(booking._id)}
                          color="error"
                          sx={{
                            height: screenSize.width > 800 ? 38 : 26,
                            width: screenSize.width > 800 ? 38 : 26,
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: screenSize.width > 1000 ? 200 : "100%" }}
                    image={booking.movieTheater.poster}
                    alt={booking.movieTheater.movieName}
                  />
                </Card>
              );
            })}
          </Box>
        </Box>
      )}
      {userBookings && userBookings.length === 0 && (
        <Box width={"70%"}>
          <Typography
            padding={1}
            width={"auto"}
            textAlign={"center"}
            color="primary"
            marginBottom={2}
            variant="h5"
            fontWeight={"bold"}
          >
            You Do Not Have Any Bookings
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;
