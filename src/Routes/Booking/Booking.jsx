import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api-calls/api-calls";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./Booking.css";
import BookingDialog from "../../Components/BookingDialog/BookingDialog";
import useScreenSize from "../../Hooks/ScreenSize";
import Spinner from "../../Components/Spinner/Spinner";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Booking = () => {
  const id = useParams().id;
  const [movie, setMovie] = useState();
  const [open, setOpen] = useState(false);
  const [noUserOpen, setNoUserOpen] = useState(false);
  const screenSize = useScreenSize();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    if (!localStorage.getItem("userID")) {
      setNoUserOpen(true);
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setNoUserOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("movie")) localStorage.removeItem("movie");

    getMovieById(id)
      .then((data) => {
        if (data) setMovie(data.movie);
        if (!data) navigate("*");
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      {movie ? (
        <Box sx={{ bgcolor: "secondary.main" }} className="booking-container">
          {movie && (
            <Box
              sx={{ bgcolor: "background.paper" }}
              className="movie-container"
            >
              <div className="movie-pic-container">
                <img
                  className="movie-pic"
                  src={movie.posterUrl}
                  alt={movie.title}
                  loading="lazy"
                />
              </div>
              <div className="movie-info-primary">
                <div className="movie-title">
                  <Typography
                    gutterBottom={true}
                    fontFamily="fantasy"
                    variant="h4"
                    color="#fafafa"
                  >
                    {movie.title}
                  </Typography>
                  <Typography
                    gutterBottom={true}
                    className="movie-rlg"
                    variant="subtitle1"
                    color="#fafafa"
                    width={screenSize.width < 1300 ? "100%" : "auto"}
                  >
                    ({movie.rating}), {movie.language}, {movie.genre}
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Released On:</span>{" "}
                      {new Date(movie.releaseDate).toDateString()}
                    </Typography>
                  </Typography>
                </div>
                <div className="movie-description">
                  <Typography
                    gutterBottom={true}
                    fontWeight="bold"
                    variant="h6"
                    color="primary"
                  >
                    About The Movie...
                  </Typography>
                  <Typography
                    gutterBottom={true}
                    variant="body1"
                    color="primary"
                  >
                    {movie.description}
                  </Typography>
                </div>
                <div className="movie-cast">
                  <div className="cast-container">
                    <Typography
                      gutterBottom={true}
                      fontWeight="bold"
                      variant="h6"
                      color="primary"
                    >
                      Cast
                    </Typography>
                  </div>
                  <div className="movie-actors">
                    {movie.actors.map((actor, idx) => {
                      return (
                        <div key={idx} className="actor-details">
                          {actor.imageUrl ? (
                            <div className="actor-img">
                              <img
                                className="actor-pic"
                                src={actor.imageUrl}
                                alt={actor.name}
                              />
                            </div>
                          ) : null}
                          <div className="actor-name">
                            <Typography
                              gutterBottom={true}
                              variant="body2"
                              color="primary"
                              fontSize={screenSize.width < 600 && "11px"}
                            >
                              {actor.name}
                            </Typography>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="movie-booking-button">
                  <Button
                    variant="contained"
                    size={
                      screenSize.width > 1200
                        ? "large"
                        : screenSize.width < 600
                        ? "small"
                        : "medium"
                    }
                    color="warning"
                    onClick={handleClickOpen}
                  >
                    BOOK TICKETS
                  </Button>
                </div>
              </div>
            </Box>
          )}
          {open && (
            <BookingDialog
              open={open}
              handleClose={handleClose}
              movie={movie}
            />
          )}
          {noUserOpen && (
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={noUserOpen}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Login To Continue
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                })}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <Typography gutterBottom>
                  You need to be logged in to book tickets.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="primary"
                  autoFocus
                  LinkComponent={Link}
                  to="/auth"
                >
                  Login
                </Button>
              </DialogActions>
            </BootstrapDialog>
          )}
        </Box>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Booking;
