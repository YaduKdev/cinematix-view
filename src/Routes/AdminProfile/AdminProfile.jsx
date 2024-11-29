import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import "./AdminProfile.css";
import { getAdminDetails, getAdminMovies } from "../../api-calls/api-calls";
import useScreenSize from "../../Hooks/ScreenSize";
import Spinner from "../../Components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const [adminMovies, setAdminMovies] = useState();
  const [adminDetails, setAdminDetails] = useState();
  const screenSize = useScreenSize();
  const navigate = useNavigate();

  useEffect(() => {
    getAdminDetails()
      .then((res) => setAdminDetails(res.admin))
      .catch((err) => console.log(err));
    getAdminMovies()
      .then((res) => setAdminMovies(res.adminMovies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {adminDetails && adminMovies ? (
        <Box
          width={"100%"}
          padding={3}
          display={"flex"}
          flexDirection={screenSize.width > 1000 ? "row" : "column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ bgcolor: "secondary.main", minHeight: "91.68svh" }}
        >
          {adminDetails && (
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              width={screenSize.width > 1000 ? "30%" : "100%"}
              height={screenSize.width < 1000 ? "368px" : "100%"}
              gap={2}
              position={"fixed"}
              top={
                screenSize.width > 1000
                  ? "77px"
                  : screenSize.width > 800
                  ? "77px"
                  : "140px"
              }
              left={0}
              sx={{ bgcolor: "background.paper", zIndex: 1 }}
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
              <Button
                variant="outlined"
                color="warning"
                onClick={() => navigate("/add")}
              >
                ADD MOVIE
              </Button>
            </Box>
          )}
          {adminMovies && adminMovies.length !== 0 && (
            <Box
              width={"70%"}
              height={"100%"}
              marginBottom={5}
              sx={{
                ml: screenSize.width > 1000 ? "30%" : 0,
                mt:
                  screenSize.width > 1000
                    ? 0
                    : screenSize.width > 800
                    ? "450px"
                    : "380px",
                position: "relative",
              }}
            >
              <Typography
                paddingTop={1}
                paddingBottom={1}
                textAlign={"center"}
                color="#fafafa"
                marginBottom={4}
                variant="h5"
                fontWeight={"bold"}
                sx={{
                  position: "fixed",
                  width: screenSize.width > 1000 ? "75%" : "100%",
                  bgcolor: "error.main",
                  zIndex: 1,
                  top:
                    screenSize.width > 1000
                      ? "76px"
                      : screenSize.width > 800
                      ? "440px"
                      : "480px",
                  left: screenSize.width > 1000 ? "30%" : 0,
                }}
              >
                ADDED MOVIES
              </Typography>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
                sx={{
                  pt: "50px",
                  pb: "20px",
                }}
              >
                {adminMovies.map((movie) => {
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
                        bgcolor: "background.paper",
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
                            flex: "1 0 auto",
                            padding: screenSize.width < 800 ? "7px" : "20px",
                          }}
                        >
                          <Typography
                            component="div"
                            variant={screenSize.width > 800 ? "h5" : "body1"}
                            fontWeight={"bold"}
                          >
                            {movie.title}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            fontSize={screenSize.width < 800 && "13px"}
                            component="div"
                            sx={{ color: "text.primary" }}
                            fontWeight={"bold"}
                          >
                            {movie.language}, {movie.rating}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            fontSize={screenSize.width < 800 && "13px"}
                            component="div"
                            sx={{ color: "text.primary" }}
                            fontWeight={"bold"}
                          >
                            Release Date: &nbsp;
                            {new Date(movie.releaseDate).toDateString()}
                          </Typography>
                        </CardContent>
                      </Box>
                      <CardMedia
                        component="img"
                        sx={{ width: screenSize.width > 1000 ? 151 : "100%" }}
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
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default AdminProfile;
