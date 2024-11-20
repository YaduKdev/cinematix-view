import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

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
    <Dialog open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" sx={{ mt: 2 }} textAlign={"center"}>
        {isSignUp ? "SIGN UP" : "LOGIN"}
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          width={400}
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
              sx={{ width: 320 }}
              variant="outlined"
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
            sx={{ width: 320 }}
            variant="outlined"
          />
          <TextField
            type={"password"}
            value={inputs.password}
            onChange={handleFormChange}
            name="password"
            margin="normal"
            sx={{ width: 320 }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
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
