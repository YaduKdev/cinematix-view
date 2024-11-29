import React, { forwardRef } from "react";
import Logo from "../../assets/logo.png";
import Barcode from "../../assets/barcode.avif";
import { Box, Typography } from "@mui/material";

const MovieTicket = forwardRef(({ ticketData }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "2px dashed #333",
        borderRadius: "10px",
        overflow: "hidden",
        color: "#fff",
        backgroundColor: "#e63946",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#f1faee",
          textAlign: "center",
          padding: "10px 0",
        }}
      >
        <img
          src={Logo}
          alt="Popcorn"
          style={{ width: "120px", height: "120px" }}
        />
        <p style={{ fontSize: "14px", color: "#333", marginTop: "10px" }}>
          Enjoy the Show!
        </p>
      </Box>

      {/* Right Section with Ticket Details */}
      <Box sx={{ width: "100%", padding: "20px" }}>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{ marginBottom: "10px" }}
        >
          {ticketData.movieTheater.movieName}
        </Typography>
        <p style={{ margin: "5px 0" }}>
          <strong>Date:</strong> &nbsp;{ticketData.movieTheater.date}
        </p>
        <p style={{ margin: "5px 0" }}>
          <strong>Time:</strong> &nbsp;{ticketData.movieTheater.time}
        </p>
        <p style={{ margin: "5px 0" }}>
          <strong>Cinema:</strong> &nbsp;{ticketData.movieTheater.name}
        </p>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <p style={{ margin: "5px 0" }}>
              <strong>
                {ticketData.movieTheater.seatNumbers.length > 1
                  ? "Seats"
                  : "Seat:"}
              </strong>{" "}
              &nbsp;
              {ticketData.movieTheater.seatNumbers.map((seat) => (
                <span>{seat} &nbsp;</span>
              ))}
            </p>
          </Box>
        </Box>
      </Box>

      {/* Barcode */}
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#333",
          padding: "10px",
          margin: "10px 0",
        }}
      >
        <Box sx={{ backgroundColor: "#fff", padding: "5px" }}>
          <img src={Barcode} alt="Barcode" style={{ height: "50px" }} />
        </Box>
      </Box>
    </Box>
  );
});

export default MovieTicket;
