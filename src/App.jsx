import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Routes/Home/Home";
import Movies from "./Routes/Movies/Movies";
import Admin from "./Routes/Admin/Admin";
import Auth from "./Routes/Auth/Auth";
import { createTheme, ThemeProvider } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Booking from "./Routes/Booking/Booking";
import BookingSuccess from "./Routes/BookingStatus/BookingSuccess";
import BookingFail from "./Routes/BookingStatus/BookingFail";
import UserProfile from "./Routes/UserProfile/UserProfile";
import AddMovie from "./Routes/AddMovie/AddMovie";
import AdminProfile from "./Routes/AdminProfile/AdminProfile";

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: grey[50],
        },
        secondary: {
          main: grey[900],
        },
      },
    },
    light: {
      palette: {
        primary: {
          main: grey[900],
        },
        secondary: {
          main: grey[50],
        },
      },
    },
  },
});

function App() {
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminID")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/booking/:id" element={<Booking />} />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Route path="/admin" element={<Admin />} />
                <Route path="/auth" element={<Auth />} />
              </>
            )}
            {isUserLoggedIn && !isAdminLoggedIn && (
              <Route path="/user" element={<UserProfile />} />
            )}
            {isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Route path="/user-admin" element={<AdminProfile />} />
                <Route path="/add" element={<AddMovie />} />
              </>
            )}
            <Route
              path="/booking/transaction-success"
              element={<BookingSuccess />}
            />
            <Route path="/booking/transaction-fail" element={<BookingFail />} />
          </Routes>
        </section>
      </ThemeProvider>
    </>
  );
}

export default App;
