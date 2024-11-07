import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../api-calls/api-calls";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import "./Booking.css";

const Booking = () => {
  const id = useParams().id;
  const [movie, setMovie] = useState({ actors: [] });

  useEffect(() => {
    getMovieById(id).then((data) => setMovie(data.movie));
  }, []);

  return (
    <Box sx={{ bgcolor: "secondary.main" }} className="booking-container">
      <Box sx={{ bgcolor: "background.paper" }} className="movie-container">
        <div className="movie-pic-container">
          <img className="movie-pic" src={movie.posterUrl} alt={movie.title} />
        </div>
        <div className="movie-info-primary">
          <div className="movie-title">
            <Typography gutterBottom={true} variant="h4" color="primary">
              {movie.title}
            </Typography>
            <Typography
              gutterBottom={true}
              className="movie-rlg"
              variant="subtitle1"
              color="primary"
            >
              ({movie.rating}), {movie.language}, {movie.genre}
            </Typography>
          </div>
          <div className="movie-description">
            <Typography gutterBottom={true} variant="h6" color="primary">
              About The Movie...
            </Typography>
            <Typography gutterBottom={true} variant="body1" color="primary">
              {movie.description}
            </Typography>
          </div>
          <div className="movie-cast">
            <div className="cast-container">
              <Typography gutterBottom={true} variant="h6" color="primary">
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
              LinkComponent={Link}
              to="/movies"
              variant="contained"
              size="large"
              color="warning"
            >
              BOOK TICKETS
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Booking;
