import React, { useEffect } from "react";

const BookingFail = () => {
  useEffect(() => {
    localStorage.removeItem("movie");
    localStorage.removeItem("cinema");
    localStorage.removeItem("city");
    localStorage.removeItem("seatNumbers");
    localStorage.removeItem("bookingDate");
    localStorage.removeItem("showTime");
  }, []);

  return <div>Booking has Failed</div>;
};

export default BookingFail;
