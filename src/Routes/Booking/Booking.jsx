import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../api-calls/api-calls";
import { Box, Button, Typography } from "@mui/material";

import "./Booking.css";
import BookingDialog from "../../Components/BookingDialog/BookingDialog";

const Booking = () => {
  const id = useParams().id;
  const [movie, setMovie] = useState();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getMovieById(id)
      .then((data) => setMovie(data.movie))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Box sx={{ bgcolor: "secondary.main" }} className="booking-container">
      {movie && (
        <Box sx={{ bgcolor: "background.paper" }} className="movie-container">
          <div className="movie-pic-container">
            <img
              className="movie-pic"
              src={movie.posterUrl}
              alt={movie.title}
            />
          </div>
          <div className="movie-info-primary">
            <div className="movie-title">
              <Typography
                gutterBottom={true}
                fontFamily="fantasy"
                variant="h4"
                color="primary"
              >
                {movie.title}
              </Typography>
              <Typography
                gutterBottom={true}
                className="movie-rlg"
                variant="subtitle1"
                color="primary"
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
              <Typography gutterBottom={true} variant="body1" color="primary">
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
                {movie.actors.map((actor) => {
                  return (
                    <div className="actor-details">
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
                size="large"
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
        <BookingDialog open={open} handleClose={handleClose} movie={movie} />
      )}
    </Box>
  );
};

export default Booking;
