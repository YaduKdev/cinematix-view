import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import "./AdminProfile.css";
import { getAdminDetails, getAdminMovies } from "../../api-calls/api-calls";

const AdminProfile = () => {
  const [adminMovies, setAdminMovies] = useState();
  const [adminDetails, setAdminDetails] = useState();

  useEffect(() => {
    getAdminDetails()
      .then((res) => setAdminDetails(res.admin))
      .catch((err) => console.log(err));

    getAdminMovies()
      .then((res) => setAdminMovies(res.adminMovies))
      .catch((err) => console.log(err));
  }, []);

  console.log("MOVIES IN PROFILE========", adminMovies);
  console.log("ADMIN PROFILE========", adminDetails);

  return (
    <Box
      width={"100%"}
      padding={3}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ bgcolor: "secondary.main" }}
    >
      {adminDetails && (
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
            marginBottom={2}
            variant="body1"
            fontWeight={"bold"}
            fontStyle={"oblique"}
          >
            {adminDetails.email}
          </Typography>
        </Box>
      )}
      <Divider orientation="vertical" variant="middle" flexItem />
      {adminMovies && adminMovies.length !== 0 && (
        <Box
          width={"70%"}
          marginBottom={5}
          height={"763px"}
          sx={{ overflow: "hidden", overflowY: "scroll" }}
        >
          <Typography
            padding={1}
            width={"auto"}
            textAlign={"center"}
            color="primary"
            marginBottom={4}
            variant="h5"
            fontWeight={"bold"}
          >
            ADDED MOVIES
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            {adminMovies.map((movie) => {
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
                        {movie.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.primary" }}
                      >
                        {movie.language}, {movie.rating}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.primary" }}
                      >
                        Release Date: &nbsp;{movie.releaseDate}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={movie.posterUrl}
                    alt={movie.title}
                  />
                </Card>
              );
            })}
          </Box>
        </Box>
      )}
      {adminMovies && adminMovies.length === 0 && (
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
            You Have Not Added Any Movies
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AdminProfile;
