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

const UserProfile = () => {
  const [userBookings, setUserBookings] = useState();
  const [userDetails, setUserDetails] = useState();

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

  console.log("BOOKINGS IN PROFILE========", userBookings);
  console.log("USER PROFILE========", userDetails);

  return (
    <Box
      width={"100%"}
      padding={3}
      display={"flex"}
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
      <Divider orientation="vertical" variant="middle" flexItem />
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
          >
            {userBookings.map((booking) => {
              return (
                <Card
                  sx={{
                    display: "flex",
                    width: "600px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {booking.movieTheater.movieName}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.primary" }}
                      >
                        {booking.movieTheater.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.primary" }}
                      >
                        Date: &nbsp;{booking.movieTheater.date}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.primary" }}
                      >
                        Time: &nbsp;{booking.movieTheater.time}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.primary" }}
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
                        pl: 1,
                        pb: 1,
                      }}
                    >
                      <IconButton aria-label="play/pause">
                        <DeleteForeverIcon
                          onClick={() => handleDelete(booking._id)}
                          color="error"
                          sx={{ height: 38, width: 38 }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
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
