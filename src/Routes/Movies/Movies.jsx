import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-calls/api-calls";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
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
import { Link } from "react-router-dom";
import useScreenSize from "../../Hooks/ScreenSize";
import Spinner from "../../Components/Spinner/Spinner";

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
  const screenSize = useScreenSize();

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
    if (localStorage.getItem("movie")) localStorage.removeItem("movie");
    if (localStorage.getItem("transaction"))
      localStorage.removeItem("transaction");

    if (screenSize.width < 1200) {
      setSortOpen(false);
      setLangOpen(false);
      setGenreOpen(false);
    } else {
      setSortOpen(true);
      setLangOpen(true);
      setGenreOpen(true);
    }

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
  }, [screenSize]);

  return (
    <>
      {displayMovies.length > 0 ? (
        <Box
          sx={{
            bgcolor: "secondary.main",
          }}
          className="movies-container"
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              width: screenSize.width < 1200 ? "100%" : "375px",
              position: "fixed",
              zIndex: 1,
              height: screenSize.width > 1200 ? "100%" : "auto",
              left: screenSize.width > 1200 && 0,
              top:
                screenSize.width < 1200
                  ? screenSize.width < 800
                    ? "148px"
                    : "77px"
                  : "78px",
              overflowY: "auto",
            }}
            className="filter-container"
          >
            <List
              sx={{
                width: screenSize.width > 1200 ? "400px" : "100%",
                maxWidth: screenSize.width > 1200 ? 380 : "100%",
                height: screenSize.width > 1200 ? "1050px" : "auto",
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  sx={{
                    display: screenSize.width < 1200 && "flex",
                    justifyContent: screenSize.width < 1200 && "center",
                    alignItems: screenSize.width < 1200 && "center",
                  }}
                  component="div"
                  id="nested-list-subheader"
                >
                  FILTERS
                </ListSubheader>
              }
            >
              <Divider />
              <Box
                sx={{
                  display: screenSize.width < 1200 && "flex",
                  justifyContent: screenSize.width < 1200 && "center",
                }}
              >
                <Box>
                  <ListItemButton onClick={() => handleClick("sort")}>
                    <ListItemText secondary="Sort By" />
                    {sortOpen ? (
                      <ExpandLess sx={{ color: "primary.main" }} />
                    ) : (
                      <ExpandMore sx={{ color: "primary.main" }} />
                    )}
                  </ListItemButton>
                  <Collapse in={sortOpen} timeout="auto" unmountOnExit>
                    <List component="div" disableRipple disablePadding>
                      <ListItemButton
                        disableRipple
                        sx={{
                          pl: screenSize.width > 800 ? 4 : 2,
                          cursor: "default",
                          "&:hover": {
                            background: "none",
                          },
                        }}
                      >
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="newest"
                          name="radio-buttons-group"
                          onClick={handleSorting}
                        >
                          <FormControlLabel
                            sx={{ color: "primary.main" }}
                            value="newest"
                            control={
                              <Radio
                                size={
                                  screenSize.width < 800 ? "small" : "medium"
                                }
                              />
                            }
                            label={
                              screenSize.width > 1200 ? (
                                "New To Old"
                              ) : screenSize.width > 800 ? (
                                "Newest"
                              ) : (
                                <Typography variant="body1" fontSize={12}>
                                  New
                                </Typography>
                              )
                            }
                          />
                          <FormControlLabel
                            sx={{ color: "primary.main" }}
                            value="oldest"
                            control={
                              <Radio
                                size={
                                  screenSize.width < 800 ? "small" : "medium"
                                }
                              />
                            }
                            label={
                              screenSize.width > 1200 ? (
                                "Old To New"
                              ) : screenSize.width > 800 ? (
                                "Oldest"
                              ) : (
                                <Typography variant="body1" fontSize={12}>
                                  Old
                                </Typography>
                              )
                            }
                          />
                        </RadioGroup>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </Box>
                <Divider />
                <Box>
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
                      <ListItemButton
                        disableRipple
                        sx={{
                          pl: screenSize.width > 800 ? 4 : 2,
                          cursor: "default",
                          "&:hover": {
                            background: "none",
                          },
                        }}
                      >
                        <FormGroup onClick={handleLangSort}>
                          <FormControlLabel
                            sx={{ color: "primary.main" }}
                            value="all"
                            control={
                              <Checkbox
                                size={
                                  screenSize.width < 800 ? "small" : "medium"
                                }
                                checked={defaultCheckMovies}
                                disabled
                              />
                            }
                            label={
                              screenSize.width > 800 ? (
                                "All"
                              ) : (
                                <Typography variant="body1" fontSize={12}>
                                  All
                                </Typography>
                              )
                            }
                          />
                          {langOptions.map((lang, idx) => {
                            return (
                              <FormControlLabel
                                sx={{ color: "primary.main" }}
                                value={lang.toLowerCase()}
                                control={
                                  <Checkbox
                                    size={
                                      screenSize.width < 800
                                        ? "small"
                                        : "medium"
                                    }
                                  />
                                }
                                label={
                                  screenSize.width > 800 ? (
                                    lang
                                  ) : (
                                    <Typography variant="body1" fontSize={12}>
                                      {lang}
                                    </Typography>
                                  )
                                }
                              />
                            );
                          })}
                        </FormGroup>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </Box>
                <Divider />
                <Box>
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
                      <ListItemButton
                        disableRipple
                        sx={{
                          pl: screenSize.width > 800 ? 4 : 2,
                          cursor: "default",
                          "&:hover": {
                            background: "none",
                          },
                        }}
                      >
                        <FormGroup onClick={handleGenreSort}>
                          <FormControlLabel
                            sx={{ color: "primary.main" }}
                            value="all"
                            control={
                              <Checkbox
                                size={
                                  screenSize.width < 800 ? "small" : "medium"
                                }
                                checked={defaultCheckGenre}
                                disabled
                              />
                            }
                            label={
                              screenSize.width > 800 ? (
                                "All"
                              ) : (
                                <Typography variant="body1" fontSize={12}>
                                  All
                                </Typography>
                              )
                            }
                          />
                          {genreOptions.map((genre, idx) => {
                            return (
                              <FormControlLabel
                                sx={{ color: "primary.main" }}
                                value={genre.toLowerCase()}
                                control={
                                  <Checkbox
                                    size={
                                      screenSize.width < 800
                                        ? "small"
                                        : "medium"
                                    }
                                  />
                                }
                                label={
                                  screenSize.width > 800 ? (
                                    genre
                                  ) : (
                                    <Typography variant="body1" fontSize={12}>
                                      {genre}
                                    </Typography>
                                  )
                                }
                              />
                            );
                          })}
                        </FormGroup>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </Box>
              </Box>
            </List>
          </Box>
          <Box
            sx={{
              bgcolor: "secondary.main",
              ml: screenSize.width > 1200 && "400px",
              mt: screenSize.width < 1200 && "55px",
            }}
            className="preview-container"
          >
            {displayMovies.map((movie) => {
              return (
                <Link key={movie._id} to={`/booking/${movie._id}`}>
                  <div
                    className="preview"
                    style={{
                      backgroundImage: `url(${movie.posterUrl})`,
                      position: "relative",
                    }}
                  >
                    <Box
                      width={"100%"}
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"flex-start"}
                      paddingTop={1}
                      sx={{
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        background: "rgba(8, 8, 8, 0.63)",
                        boxShadow:
                          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
                      }}
                    >
                      <Typography
                        variant={screenSize.width > 1200 ? "h5" : "h6"}
                        color="#fafafa"
                        fontSize={screenSize.width < 600 && "13px"}
                        fontWeight={"bold"}
                        paddingLeft={1}
                      >
                        {movie.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontSize={screenSize.width < 600 && "10px"}
                        color="#fafafa"
                        paddingLeft={1}
                        paddingBottom={1}
                      >
                        {movie.rating}, {movie.language}
                      </Typography>
                    </Box>
                  </div>
                </Link>
              );
            })}
          </Box>
        </Box>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Movies;
