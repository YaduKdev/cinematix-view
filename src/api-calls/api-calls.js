import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("/movie/").catch((err) => console.log(err));

  if (res.status !== 200) return console.log("No Data");

  const data = await res.data;
  return data;
};

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if ((res.status !== 200) & (res.status !== 201)) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;

  return resData;
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;

  return resData;
};

export const getMovieById = async (id) => {
  const res = await axios.get(`/movie/${id}`).catch((err) => console.log(err));

  if (!res || res.status !== 200) return console.log("No Data");

  const data = await res.data;

  return data;
};

export const createBooking = async (bookingData) => {
  const res = await axios
    .post("/booking/", { ...bookingData })
    .catch((err) => console.log(err));

  if (res.status !== 201) return console.log("Could Not Create Booking");

  const data = await res.data;

  return data;
};

export const getBookingData = async (bookingID) => {
  const res = await axios
    .get(`/booking/${bookingID}/`)
    .catch((err) => console.log(err));

  if (res.status !== 200) return console.log("Could Not Fetch Booking");

  const data = await res.data;

  return data;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userID");

  const res = await axios
    .get(`/user/bookings/${id}/`)
    .catch((err) => console.log(err));

  if (res.status !== 200) return console.log("Unexpected Error");

  const data = await res.data;

  return data;
};

export const getAdminMovies = async () => {
  const id = localStorage.getItem("adminID");

  const res = await axios
    .get(`/admin/movies/${id}/`)
    .catch((err) => console.log(err));

  if (res.status !== 200) return console.log("Unexpected Error");

  const data = await res.data;

  return data;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userID");

  const res = await axios.get(`/user/${id}/`).catch((err) => console.log(err));

  if (res.status !== 200) return console.log("Unexpected Error");

  const data = await res.data;

  return data;
};

export const getAdminDetails = async () => {
  const id = localStorage.getItem("adminID");

  const res = await axios.get(`/admin/${id}/`).catch((err) => console.log(err));

  if (res.status !== 200) return console.log("Unexpected Error");

  const data = await res.data;

  return data;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`/movie/${id}/`).catch((err) => console.log(err));

  if (res.status !== 200) return console.log("Unexpected Error");

  const data = await res.data;

  return data;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) return console.log("Could Not Delete Movie");

  const data = await res.data;

  return data;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      { ...data, admin: localStorage.getItem("adminID") },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) return console.log("Unexpected Error Occurred");

  const resData = await res.data;

  return resData;
};
