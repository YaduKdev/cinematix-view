import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Routes/Home/Home";
import Movies from "./Routes/Movies/Movies";
import Admin from "./Routes/Admin/Admin";
import Auth from "./Routes/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Booking from "./Routes/Booking/Booking";
import BookingSuccess from "./Routes/BookingStatus/BookingSuccess";
import BookingFail from "./Routes/BookingStatus/BookingFail";
import UserProfile from "./Routes/UserProfile/UserProfile";
import AddMovie from "./Routes/AddMovie/AddMovie";
import AdminProfile from "./Routes/AdminProfile/AdminProfile";
import NoMatch from "./Routes/NoMatch/NoMatch";
import MovieTicket from "./Components/MovieTicket/MovieTicket";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="113109406438-heq2jhfert5iqla7rav5r88ff97rrju7.apps.googleusercontent.com">
        <Auth />
      </GoogleOAuthProvider>
    );
  };

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminID")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/tix" element={<MovieTicket />} />
          {((!isAdminLoggedIn && !isUserLoggedIn) ||
            localStorage.getItem("logging")) && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<GoogleAuthWrapper />} />
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
          {localStorage.getItem("transaction") && (
            <>
              <Route
                path="/booking/transaction-success"
                element={<BookingSuccess />}
              />
              <Route
                path="/booking/transaction-fail"
                element={<BookingFail />}
              />
            </>
          )}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
