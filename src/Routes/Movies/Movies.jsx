import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-calls/api-calls";
import { Box } from "@mui/material";
import "./Movies.css";

const Movies = () => {
  const [displayMovies, setDisplayMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setDisplayMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ bgcolor: "secondary.main" }} className="preview-container">
      {displayMovies.map((movie) => {
        return (
          <div
            className="preview"
            style={{ backgroundImage: `url(${movie.posterUrl})` }}
          ></div>
        );
      })}
    </Box>
  );
};

export default Movies;
