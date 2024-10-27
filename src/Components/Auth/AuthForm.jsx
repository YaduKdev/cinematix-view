import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <Dialog open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" sx={{ mt: 2 }} textAlign={"center"}>
        {isSignUp ? "SIGN UP" : "LOGIN"}
      </Typography>
      <form>
        <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          width={400}
          margin="auto"
          alignItems={"center"}
        >
          {isSignUp ? (
            <TextField
              type={"text"}
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
            name="email"
            margin="normal"
            id="outlined-basic"
            label="Email"
            sx={{ width: 320 }}
            variant="outlined"
          />
          <TextField
            type={"password"}
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
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{ mt: 2 }}
            size="small"
          >
            {isSignUp ? "Back To Login" : "Create New Account"}
          </Button>
          {/* <FormLabel sx={{ mt: 1, mb: 1 }}>Password</FormLabel>
          <TextField
            margin="normal"
            variant="standard"
            type={"password"}
            name="password"
          /> */}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
