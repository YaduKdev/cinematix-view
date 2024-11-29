import {
  AppBar,
  Autocomplete,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box, flexbox, margin } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-calls/api-calls";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../../store";
import TheatersIcon from "@mui/icons-material/Theaters";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoupeIcon from "@mui/icons-material/Loupe";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import useScreenSize from "../../Hooks/ScreenSize";

const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [pageValue, setPageValue] = useState(false);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const route = useLocation();
  const [openSearch, setOpenSearch] = useState(false);

  const logout = (isAdmin) => {
    setPageValue(false);
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const checkPage = () => {
    if (route.pathname === "/movies") {
      screenSize.width > 800 ? setPageValue(0) : setPageValue(1);
    } else if (route.pathname === "/admin") {
      screenSize.width > 800 ? setPageValue(1) : setPageValue(2);
    } else if (route.pathname === "/auth") {
      screenSize.width > 800 ? setPageValue(2) : setPageValue(3);
    } else if (route.pathname === "/user") {
      screenSize.width > 800 ? setPageValue(1) : setPageValue(2);
    } else if (route.pathname === "/add") {
      screenSize.width > 800 ? setPageValue(1) : setPageValue(2);
    } else if (route.pathname === "/user-admin") {
      screenSize.width > 800 ? setPageValue(1) : setPageValue(2);
    } else if (route.pathname === "/" || route.pathname.includes("/booking")) {
      setPageValue(false);
    }
  };

  const goToMovie = (e, val) => {
    setOpenSearch(false);
    const movie = movies.find((m) => m.title === val);
    navigate(`/booking/${movie._id}`);
  };

  const authLogout = (condition) => {
    logout(condition);
    navigate("/");
  };

  useEffect(() => {
    checkPage();

    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, [route.pathname, screenSize]);

  window.onpopstate = () => checkPage();

  return (
    <AppBar
      color="secondary"
      position="sticky"
      sx={{
        paddingBottom: "5px",
      }}
    >
      <Toolbar sx={{ "@media (max-width: 800px)": { padding: 0 } }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={screenSize.width < 800 && "column"}
          alignItems={"center"}
          width={"100%"}
        >
          <Box
            paddingTop={screenSize.width < 800 && "10px"}
            paddingBottom={screenSize.width < 800 && "10px"}
            width={screenSize.width < 800 ? "100%" : "10%"}
            display={screenSize.width < 800 && "flex"}
            justifyContent={screenSize.width < 800 && "center"}
            sx={{ bgcolor: screenSize.width < 800 && "error.main" }}
          >
            <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
              <img
                className="logo"
                onClick={() => setPageValue(false)}
                src={logo}
              />
            </Link>
          </Box>
          {screenSize.width > 800 && (
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
          )}
          <Box display={"flex"}>
            <Tabs
              textColor="inherit"
              indicatorColor="primary"
              value={pageValue}
              onChange={(e, val) => setPageValue(val)}
            >
              {screenSize.width < 800 && (
                <Tab
                  icon={<SearchIcon fontSize="small" />}
                  label="Search"
                  onClick={() => setOpenSearch(true)}
                />
              )}
              <Tab
                icon={<TheatersIcon />}
                LinkComponent={Link}
                to="/movies"
                label="Movies"
              />

              {!isAdminLoggedIn && !isUserLoggedIn && (
                <Tab
                  icon={<SupervisedUserCircleIcon />}
                  LinkComponent={Link}
                  to="/admin"
                  label="Admin"
                />
              )}
              {!isAdminLoggedIn && !isUserLoggedIn && (
                <Tab
                  icon={<AccountCircleIcon />}
                  LinkComponent={Link}
                  to="/auth"
                  label="User"
                />
              )}
              {isUserLoggedIn && (
                <Tab
                  icon={<ManageAccountsIcon />}
                  LinkComponent={Link}
                  to="/user"
                  label="Profile"
                />
              )}
              {isUserLoggedIn && (
                <Tab
                  icon={<LogoutIcon />}
                  onClick={() => authLogout(false)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              )}
              {/* {isAdminLoggedIn && (
                <Tab
                  icon={<LoupeIcon />}
                  LinkComponent={Link}
                  to="/add"
                  onClick={() => setPageValue(1)}
                  label="Add"
                />
              )} */}
              {isAdminLoggedIn && (
                <Tab
                  icon={<AdminPanelSettingsIcon />}
                  LinkComponent={Link}
                  to="/user-admin"
                  label="Profile"
                />
              )}
              {isAdminLoggedIn && (
                <Tab
                  icon={<LogoutIcon />}
                  onClick={() => authLogout(true)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              )}
            </Tabs>
          </Box>
        </Box>
      </Toolbar>
      <Dialog fullScreen open={openSearch}>
        <Box sx={{ ml: "auto", padding: 1 }}>
          <IconButton onClick={() => setOpenSearch(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box width={"95%"} margin="0 auto">
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
      </Dialog>
    </AppBar>
  );
};

export default Header;
