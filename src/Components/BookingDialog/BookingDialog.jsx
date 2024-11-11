import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box, Divider } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import dayjs from "dayjs";
import { loadStripe } from "@stripe/stripe-js";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ChairIcon from "@mui/icons-material/Chair";
import WeekendIcon from "@mui/icons-material/Weekend";

import "./BookingDialog.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const steps = [
  "Select City",
  "Select Cinema",
  "Select Date",
  "Pick Seats",
  "Payment",
];

const timings = [
  "10:45 PM",
  "01:15 PM",
  "03:45 PM",
  "06:15 PM",
  "09:00 PM",
  "11:30 PM",
];

const seatAvailability = [
  {
    condition: "Available",
    color: "#BD1616",
  },
  {
    condition: "Selected",
    color: "#FFA726",
  },
  {
    condition: "Booked",
    color: "#9F9F9F",
  },
];

const tomorrow = dayjs().add(7, "day");

const BookingDialog = ({ open, handleClose, movie }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [city, setCity] = useState();
  const [cinema, setCinema] = useState();
  const [date, setDate] = useState();
  const [showTime, setShowTime] = useState();
  const [openDate, setOpenDate] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const setCurrentCity = (event) => {
    const { value } = event.target;

    let currentCity = value;

    setCity(currentCity);
    console.log("CURRENT CITY", currentCity);
  };

  const setCurrentCinema = (event) => {
    const { value } = event.target;

    let currentCinema = value;

    setCinema(currentCinema);
    console.log("CURRENT CINEMA", currentCinema);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const seatBookingHandler = (event) => {
    const { value, checked } = event.target;
    let seatsArray = [...bookedSeats];

    if (checked) {
      seatsArray.push(value);
      setBookedSeats(seatsArray);
      setTotalSeats(seatsArray.length);

      if (value.includes("P")) {
        setTotalAmount(totalAmount + 600);
      } else if (value.includes("G")) {
        setTotalAmount(totalAmount + 450);
      } else if (value.includes("R")) {
        setTotalAmount(totalAmount + 250);
      }
    }

    if (!checked) {
      seatsArray.splice(seatsArray.indexOf(value), 1);
      setBookedSeats(seatsArray);
      setTotalSeats(seatsArray.length);

      if (value.includes("P")) {
        setTotalAmount(totalAmount - 600);
      } else if (value.includes("G")) {
        setTotalAmount(totalAmount - 450);
      } else if (value.includes("R")) {
        setTotalAmount(totalAmount - 250);
      }
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51JLbgaSDLb6EOYBqYzzmiienh5vzYqc6VCqo9Ys96jYZKiiqZpWpTw4MQAmcjm2FLHWY3Z8aNMmEq01GdwuHOBSg007HL0ibCC"
    );

    const body = {
      seats: {
        bookedSeats: bookedSeats,
        totalSeats: totalSeats,
        totalAmount: totalAmount,
      },
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:5000/booking/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }

    // handleNext();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 1) {
      setCity();
      setCinema();
      setDate();
      setShowTime();
      setBookedSeats([]);
    }
    if (activeStep === 2) {
      setCinema();
      setDate();
      setShowTime();
      setBookedSeats([]);
    }

    if (activeStep === 3) {
      setDate();
      setShowTime();
      setBookedSeats([]);
    }

    if (activeStep === 4) {
      setBookedSeats([]);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{ bgcolor: "secondary.main" }}
      className="booking-dialog-container"
    >
      <BootstrapDialog
        // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="1000px"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Book Tickets
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 0 && (
                  <Box marginTop={4} marginBottom={4} marginLeft={5}>
                    <FormControl>
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        focused="true"
                      >
                        <Typography
                          fontWeight="bold"
                          variant="h6"
                          color="primary"
                        >
                          Select Your City
                        </Typography>
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={setCurrentCity}
                      >
                        {movie.cities.map((city) => {
                          return (
                            <FormControlLabel
                              value={city}
                              control={<Radio />}
                              label={city}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box marginTop={4} marginBottom={4} marginLeft={5}>
                    <FormControl>
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        focused="true"
                      >
                        <Typography
                          fontWeight="bold"
                          variant="h6"
                          color="primary"
                        >
                          Select Your Cinema
                        </Typography>
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={setCurrentCinema}
                      >
                        {movie.nowPlaying.map((cinema) => {
                          if (cinema.location === city) {
                            console.log("CINE NAME", cinema.name[0]);
                            return (
                              <FormControlLabel
                                value={cinema.name[0]}
                                control={<Radio />}
                                label={cinema.name[0]}
                              />
                            );
                          }
                        })}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
                {activeStep === 2 && (
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    marginTop={4}
                    marginBottom={4}
                    gap={5}
                  >
                    <div>
                      <Typography
                        marginTop={2}
                        marginBottom={2}
                        fontWeight="bold"
                        variant="h6"
                        color="primary"
                      >
                        Select Date
                      </Typography>
                      <LocalizationProvider
                        marginTop={2}
                        marginBottom={2}
                        dateAdapter={AdapterDayjs}
                      >
                        <DatePicker
                          label="Select Date"
                          disablePast
                          maxDate={tomorrow}
                          onChange={(newValue) => setDate(newValue)}
                          open={openDate}
                          onClose={() => setOpenDate(false)}
                          slotProps={{
                            textField: {
                              onClick: () => setOpenDate(true),
                            },
                            openPickerIcon: {
                              onClick: () => setOpenDate(true),
                            },
                            field: {
                              readOnly: true,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    {date && (
                      <div>
                        <Typography
                          marginTop={2}
                          marginBottom={2}
                          fontWeight="bold"
                          variant="h6"
                          color="primary"
                        >
                          Show Timing
                        </Typography>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={(event) =>
                              setShowTime(event.target.value)
                            }
                          >
                            {timings.map((time) => {
                              return (
                                <FormControlLabel
                                  value={time}
                                  control={<Radio />}
                                  label={time}
                                />
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                      </div>
                    )}
                  </Box>
                )}
                {activeStep === 3 && (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    marginTop={1}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={5}
                    >
                      {seatAvailability.map((seat) => {
                        return (
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={1}
                          >
                            <Box
                              sx={{
                                backgroundColor: `${seat.color}`,
                                width: "15px",
                                height: "15px",
                              }}
                            ></Box>
                            <Typography
                              fontWeight="bold"
                              variant="body1"
                              color="primary"
                            >
                              {seat.condition}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      marginTop={0}
                      marginBottom={0}
                      sx={{ maxWidth: "600px" }}
                    >
                      <FormGroup
                        row
                        sx={{
                          justifyContent: "center",
                          width: "100%",
                        }}
                        onChange={seatBookingHandler}
                      >
                        <Divider sx={{ width: "100%", mt: "10px", mb: "10px" }}>
                          <Typography variant="body1" sx={{ color: "#F44336" }}>
                            REGULAR
                          </Typography>
                          <Typography variant="body1" sx={{ color: "#85BB65" }}>
                            Rs. 250
                          </Typography>
                        </Divider>
                        {Array.from({ length: 50 }, (_, index) => {
                          if (index + 1 <= 24) {
                            return (
                              <FormControlLabel
                                key={index}
                                labelPlacement="bottom"
                                label={`R-${index + 1}`}
                                value={`R-${index + 1}`}
                                control={
                                  <Checkbox
                                    icon={<EventSeatIcon color="error" />}
                                    checkedIcon={
                                      <EventSeatIcon color="warning" />
                                    }
                                  />
                                }
                              />
                            );
                          }

                          if (index + 1 === 25) {
                            return (
                              <Divider
                                sx={{ width: "100%", mt: "10px", mb: "10px" }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ color: "#FFD700" }}
                                >
                                  GOLD
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{ color: "#85BB65" }}
                                >
                                  Rs. 450
                                </Typography>
                              </Divider>
                            );
                          }

                          if (index + 1 > 24 && index + 1 <= 41) {
                            return (
                              <FormControlLabel
                                key={index}
                                labelPlacement="bottom"
                                label={`G-${index - 25 + 1}`}
                                value={`G-${index - 25 + 1}`}
                                control={
                                  <Checkbox
                                    icon={<WeekendIcon color="error" />}
                                    checkedIcon={
                                      <WeekendIcon color="warning" />
                                    }
                                  />
                                }
                              />
                            );
                          }

                          if (index + 1 === 42) {
                            return (
                              <Divider
                                sx={{ width: "100%", mt: "10px", mb: "10px" }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ color: "#E5E4E2" }}
                                >
                                  PLATINUM
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{ color: "#85BB65" }}
                                >
                                  Rs. 600
                                </Typography>
                              </Divider>
                            );
                          }

                          if (index + 1 > 40) {
                            return (
                              <FormControlLabel
                                key={index}
                                labelPlacement="bottom"
                                label={`P-${index - 42 + 1}`}
                                value={`P-${index - 42 + 1}`}
                                control={
                                  <Checkbox
                                    icon={<ChairIcon color="error" />}
                                    checkedIcon={<ChairIcon color="warning" />}
                                  />
                                }
                              />
                            );
                          }
                        })}
                      </FormGroup>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      width={"100%"}
                      marginTop={2}
                      // marginBottom={1}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        No. of Seats: {totalSeats}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        Amount Payable:{" "}
                        <span style={{ color: "#85BB65" }}>
                          Rs.{totalAmount}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                )}
                {activeStep === 4 && (
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Step {activeStep}
                  </Typography>
                )}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {activeStep === steps.length - 1 ? (
                    <Button onClick={handleNext}>Finish</Button>
                  ) : activeStep === 0 && city ? (
                    <Button onClick={handleNext}>Next</Button>
                  ) : activeStep === 1 && cinema ? (
                    <Button onClick={handleNext}>Next</Button>
                  ) : activeStep === 2 && date && showTime ? (
                    <Button onClick={handleNext}>Next</Button>
                  ) : activeStep === 3 && bookedSeats.length !== 0 ? (
                    <Button
                      onClick={makePayment}
                      variant="contained"
                      color="warning"
                    >
                      Continue To Payment
                    </Button>
                  ) : null}
                </Box>
              </React.Fragment>
            )}
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </Box>
  );
};

export default BookingDialog;
