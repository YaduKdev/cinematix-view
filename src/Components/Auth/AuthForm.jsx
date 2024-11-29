import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useScreenSize from "../../Hooks/ScreenSize";
import { blue } from "@mui/material/colors";
import GoogleIcon from "@mui/icons-material/Google";

const AuthForm = ({ onSubmit, gAuth, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const screenSize = useScreenSize();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleFormChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignUp });
  };

  return (
    <Dialog
      fullScreen={screenSize.width < 800 && true}
      sx={{
        height: screenSize.width > 800 ? "80%" : "auto",
        mt: "auto",
        mb: "auto",
      }}
      open={true}
    >
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseRoundedIcon size={"small"} />
        </IconButton>
      </Box>
      <Typography
        variant="h4"
        sx={{ mt: screenSize.width > 800 ? 2 : 1 }}
        textAlign={"center"}
      >
        {isSignUp ? "SIGN UP" : "LOGIN"}
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Box
          padding={screenSize.width > 800 ? 6 : 2}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          width={screenSize.width > 800 ? 400 : 280}
          margin="auto"
          alignItems={"center"}
        >
          {!isAdmin && isSignUp ? (
            <TextField
              type={"text"}
              value={inputs.name}
              onChange={handleFormChange}
              name="name"
              margin="normal"
              id="outlined-basic"
              label="Name"
              sx={{ width: screenSize.width > 800 ? 320 : 250 }}
              variant="outlined"
              required
            />
          ) : null}
          <TextField
            type={"email"}
            value={inputs.email}
            onChange={handleFormChange}
            name="email"
            margin="normal"
            id="outlined-basic"
            label="Email"
            sx={{ width: screenSize.width > 800 ? 320 : 250 }}
            variant="outlined"
            required
          />
          <TextField
            type={showPassword ? "text" : "password"}
            value={inputs.password}
            onChange={handleFormChange}
            name="password"
            margin="normal"
            sx={{ width: screenSize.width > 800 ? 320 : 250 }}
            id="outlined-basic-pass"
            label="Password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff color="primary" />
                    ) : (
                      <Visibility color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />
          <Button
            type="submit"
            sx={{ mt: 4 }}
            size="large"
            variant="outlined"
            fullWidth
          >
            {isSignUp ? "SIGN UP" : "LOGIN"}
          </Button>
          <Button
            sx={{ mt: 4, bgcolor: blue[500] }}
            size="large"
            variant="contained"
            fullWidth
            color="secondary"
            onClick={() => gAuth(isSignUp)}
          >
            <GoogleIcon sx={{ fontSize: "18px", marginRight: "4px" }} />
            {isSignUp ? "SIGN UP WITH GOOLE" : "LOGIN WITH GOOGLE"}
          </Button>
          {!isAdmin && (
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              sx={{ mt: 2 }}
              size="small"
            >
              {isSignUp ? "Back To Login" : "Create New Account"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
