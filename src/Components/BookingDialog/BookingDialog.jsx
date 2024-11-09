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
import { Box } from "@mui/material";

import "./BookingDialog.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const steps = ["Select City", "Select Cinema", "Book Seats", "Payment"];

const BookingDialog = ({ open, handleClose, movie }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [city, setCity] = useState();
  const [cinema, setCinema] = useState();

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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 1) {
      setCinema();
      setCity();
    }
    if (activeStep === 2) {
      setCinema();
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
                  <Box marginTop={4} marginBottom={4} marginLeft={5}>
                    <Typography
                      marginTop={2}
                      marginBottom={2}
                      fontWeight="bold"
                      variant="h6"
                      color="primary"
                    >
                      Select Date and Time
                    </Typography>
                    <Typography
                      marginTop={2}
                      marginBottom={2}
                      fontWeight="bold"
                      variant="h6"
                      color="primary"
                    >
                      Pick Seats
                    </Typography>
                  </Box>
                )}
                {activeStep === 3 && (
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
