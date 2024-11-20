import {
  AppBar,
  Autocomplete,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-calls/api-calls";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../../store";

const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [pageValue, setPageValue] = useState(false);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const logout = (isAdmin) => {
    setPageValue(false);
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const checkPage = () => {
    if (window.location.pathname === "/movies") {
      setPageValue(0);
    } else if (window.location.pathname === "/admin") {
      setPageValue(1);
    } else if (window.location.pathname === "/auth") {
      setPageValue(2);
    } else if (window.location.pathname === "/user") {
      setPageValue(1);
    } else if (window.location.pathname === "/add") {
      setPageValue(1);
    } else if (window.location.pathname === "/user-admin") {
      setPageValue(2);
    } else if (
      window.location.pathname === "/" ||
      window.location.pathname.includes("/booking")
    ) {
      setPageValue(false);
    }
  };

  const goToMovie = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    navigate(`/booking/${movie._id}`);
  };

  useEffect(() => {
    checkPage();

    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  window.onpopstate = () => checkPage();

  return (
    <AppBar
      color="secondary"
      position="sticky"
      sx={{
        paddingBottom: "5px",
      }}
    >
      <Toolbar>
        <Box width={"10%"}>
          <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
            <img
              className="logo"
              onClick={() => setPageValue(false)}
              src={logo}
            />
          </Link>
        </Box>
        <Box width={"30%"} margin="auto">
          <Autocomplete
            onChange={goToMovie}
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

            {!isAdminLoggedIn && !isUserLoggedIn && (
              <Tab LinkComponent={Link} to="/admin" label="Admin" />
            )}
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <Tab LinkComponent={Link} to="/auth" label="Auth" />
            )}
            {isUserLoggedIn && (
              <Tab LinkComponent={Link} to="/user" label="Profile" />
            )}
            {isUserLoggedIn && (
              <Tab
                onClick={() => logout(false)}
                LinkComponent={Link}
                to="/"
                label="Logout"
              />
            )}
            {isAdminLoggedIn && (
              <Tab
                LinkComponent={Link}
                to="/add"
                onClick={() => setPageValue(1)}
                label="Add Movie"
              />
            )}
            {isAdminLoggedIn && (
              <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
            )}
            {isAdminLoggedIn && (
              <Tab
                onClick={() => logout(true)}
                LinkComponent={Link}
                to="/"
                label="Logout"
              />
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
