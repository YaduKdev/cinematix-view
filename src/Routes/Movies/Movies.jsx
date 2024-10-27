import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-calls/api-calls";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import { Checkbox } from "@mui/material";
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [sortOpen, setSortOpen] = useState(true);
  const [langOpen, setLangOpen] = useState(true);
  const [genreOpen, setGenreOpen] = useState(true);
  const [selectLangs, setSelectLangs] = useState([]);
  const [selectGenre, setSelectGenre] = useState([]);
  const [defaultCheckMovies, setDefaultCheckMovies] = useState(true);
  const [defaultCheckGenre, setDefaultCheckGenre] = useState(true);

  const langOptions = [
    "English",
    "Hindi",
    "Marathi",
    "Gujarati",
    "Punjabi",
    "Bengali",
    "Tamil",
    "Telugu",
    "Malayalam",
  ];
  const genreOptions = ["Drama", "Comedy", "Thriller", "Action", "Horror"];

  const handleClick = (value) => {
    if (value === "sort") setSortOpen(!sortOpen);
    if (value === "lang") setLangOpen(!langOpen);
    if (value === "genre") setGenreOpen(!genreOpen);
  };

  const handleSorting = (event) => {
    const { value } = event.target;
    let sorted;

    sorted = [...displayMovies].sort((a, b) => {
      let aDate = new Date(a.releaseDate);
      let bDate = new Date(b.releaseDate);

      if (value === "newest") return bDate - aDate;
      if (value === "oldest") return aDate - bDate;
    });

    setDisplayMovies(sorted);
    setMovies(sorted);
  };

  const handleLangSort = (event) => {
    const langArray = [...selectLangs];
    let moviesByLang = [];

    const langSort = () => {
      if (selectGenre.length !== 0) {
        movies.map((movie) => {
          langArray.map((lang) => {
            selectGenre.map((genre) => {
              if (
                lang === movie.language.toLowerCase() &&
                genre === movie.genre.toLowerCase()
              ) {
                moviesByLang.push(movie);
              }
            });
          });
        });
      } else {
        movies.map((movie) => {
          langArray.map((lang) => {
            if (lang === movie.language.toLowerCase()) {
              moviesByLang.push(movie);
            }
          });
        });
      }
    };

    if (event.target.checked) {
      langArray.push(event.target.value);
      setSelectLangs(langArray);
      langSort();
      setDisplayMovies(moviesByLang);
    }

    if (!event.target.checked) {
      langArray.splice(langArray.indexOf(event.target.value), 1);
      setSelectLangs(langArray);
      langSort();
      setDisplayMovies(moviesByLang);
    }

    if (langArray.length === 0) {
      setDefaultCheckMovies(true);

      if (selectGenre.length !== 0) {
        movies.map((movie) => {
          selectGenre.map((genre) => {
            if (genre === movie.genre.toLowerCase()) {
              moviesByLang.push(movie);
            }
          });
        });
      } else {
        setDisplayMovies(movies);
      }
    }

    if (langArray.length !== 0) setDefaultCheckMovies(false);
  };

  const handleGenreSort = (event) => {
    const genreArray = [...selectGenre];
    let moviesByGenre = [];

    const genreSort = () => {
      if (selectLangs.length !== 0) {
        movies.map((movie) => {
          genreArray.map((genre) => {
            selectLangs.map((lang) => {
              if (
                lang === movie.language.toLowerCase() &&
                genre === movie.genre.toLowerCase()
              ) {
                moviesByGenre.push(movie);
              }
            });
          });
        });
      } else {
        movies.map((movie) => {
          genreArray.map((genre) => {
            if (genre === movie.genre.toLowerCase()) {
              moviesByGenre.push(movie);
            }
          });
        });
      }
    };

    if (event.target.checked) {
      genreArray.push(event.target.value);
      setSelectGenre(genreArray);
      genreSort();
      setDisplayMovies(moviesByGenre);
    }

    if (!event.target.checked) {
      genreArray.splice(genreArray.indexOf(event.target.value), 1);
      setSelectGenre(genreArray);
      genreSort();
      setDisplayMovies(moviesByGenre);
    }

    if (genreArray.length === 0) {
      setDefaultCheckGenre(true);

      if (selectLangs.length !== 0) {
        movies.map((movie) => {
          selectLangs.map((lang) => {
            if (lang === movie.language.toLowerCase()) {
              moviesByGenre.push(movie);
            }
          });
        });
      } else {
        setDisplayMovies(movies);
      }
    }

    if (genreArray.length !== 0) setDefaultCheckGenre(false);
  };

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setDisplayMovies(
          data.movies.sort((a, b) => {
            let aDate = new Date(a.releaseDate);
            let bDate = new Date(b.releaseDate);

            return bDate - aDate;
          })
        );

        setMovies(
          data.movies.sort((a, b) => {
            let aDate = new Date(a.releaseDate);
            let bDate = new Date(b.releaseDate);

            return bDate - aDate;
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ bgcolor: "secondary.main" }} className="movies-container">
      <Box sx={{ bgcolor: "secondary.main" }} className="filter-container">
        <List
          sx={{
            width: "400px",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              FILTERS
            </ListSubheader>
          }
        >
          <Divider />
          <ListItemButton onClick={() => handleClick("sort")}>
            <ListItemText secondary="Sort By" />
            {sortOpen ? (
              <ExpandLess sx={{ color: "primary.main" }} />
            ) : (
              <ExpandMore sx={{ color: "primary.main" }} />
            )}
          </ListItemButton>
          <Collapse in={sortOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="newest"
                  name="radio-buttons-group"
                  onClick={handleSorting}
                >
                  <FormControlLabel
                    sx={{ color: "primary.main" }}
                    value="newest"
                    control={<Radio />}
                    label="New To Old"
                  />
                  <FormControlLabel
                    sx={{ color: "primary.main" }}
                    value="oldest"
                    control={<Radio />}
                    label="Old To New"
                  />
                </RadioGroup>
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={() => handleClick("lang")}>
            <ListItemText secondary="Languages" />
            {langOpen ? (
              <ExpandLess sx={{ color: "primary.main" }} />
            ) : (
              <ExpandMore sx={{ color: "primary.main" }} />
            )}
          </ListItemButton>
          <Collapse in={langOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <FormGroup onClick={handleLangSort}>
                  <FormControlLabel
                    sx={{ color: "primary.main" }}
                    value="all"
                    control={<Checkbox checked={defaultCheckMovies} disabled />}
                    label="All"
                  />
                  {langOptions.map((lang, idx) => {
                    return (
                      <FormControlLabel
                        sx={{ color: "primary.main" }}
                        value={lang.toLowerCase()}
                        control={<Checkbox />}
                        label={lang}
                      />
                    );
                  })}
                </FormGroup>
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={() => handleClick("genre")}>
            <ListItemText secondary="Genres" />
            {genreOpen ? (
              <ExpandLess sx={{ color: "primary.main" }} />
            ) : (
              <ExpandMore sx={{ color: "primary.main" }} />
            )}
          </ListItemButton>
          <Collapse in={genreOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <FormGroup onClick={handleGenreSort}>
                  <FormControlLabel
                    sx={{ color: "primary.main" }}
                    value="all"
                    control={<Checkbox checked={defaultCheckGenre} disabled />}
                    label="All"
                  />
                  {genreOptions.map((genre, idx) => {
                    return (
                      <FormControlLabel
                        sx={{ color: "primary.main" }}
                        value={genre.toLowerCase()}
                        control={<Checkbox />}
                        label={genre}
                      />
                    );
                  })}
                </FormGroup>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
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
    </Box>
  );
};

export default Movies;
