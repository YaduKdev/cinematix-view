import {
  AppBar,
  Autocomplete,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api-calls/api-calls";
import { Link } from "react-router-dom";

const Header = () => {
  const [pageValue, setPageValue] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (window.location.pathname === "/movies") {
      setPageValue(0);
    } else if (window.location.pathname === "/admin") {
      setPageValue(1);
    } else if (window.location.pathname === "/auth") {
      setPageValue(2);
    } else if (window.location.pathname === "/") {
      setPageValue(false);
    }

    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppBar
      color="secondary"
      position="sticky"
      sx={{
        boxShadow: "none",
        borderBottom: "2px solid #b71c1c",
        paddingBottom: "5px",
      }}
    >
      <Toolbar>
        <Box width={"10%"}>
          <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
            <TheatersIcon
              color="primary"
              onClick={() => setPageValue(false)}
              fontSize="large"
            />
          </Link>
        </Box>
        <Box width={"30%"} margin="auto">
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={movies && movies.map((movie) => movie.title)}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
                placeholder="Search From Movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="primary"
            value={pageValue}
            onChange={(e, val) => setPageValue(val)}
          >
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
            <Tab LinkComponent={Link} to="/admin" label="Admin" />
            <Tab LinkComponent={Link} to="/auth" label="Auth" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
