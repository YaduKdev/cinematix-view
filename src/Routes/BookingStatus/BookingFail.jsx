import React, { useEffect } from "react";

const BookingFail = () => {
  useEffect(() => {
    localStorage.removeItem("movie");
    localStorage.removeItem("cinema");
    localStorage.removeItem("city");
    localStorage.removeItem("seatNumbers");
    localStorage.removeItem("bookingDate");
    localStorage.removeItem("showTime");
    localStorage.removeItem("moviePoster");
    localStorage.removeItem("movieTitle");
  }, []);

  return <div>Booking has Failed</div>;
};

export default BookingFail;
