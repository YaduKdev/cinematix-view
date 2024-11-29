import React, { useState } from "react";
import AuthForm from "../../Components/Auth/AuthForm";
import {
  sendUserAuthRequest,
  userGoogleLogin,
} from "../../api-calls/api-calls";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useGoogleLogin } from "@react-oauth/google";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [signUp, setSignUp] = useState();

  const responseAuthGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        userGoogleLogin(authResult["code"])
          .then((res) => {
            let data = { inputs: res.resData, signup: signUp };

            getData(data);
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log("GOOGLE ERROR", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseAuthGoogle,
    onError: responseAuthGoogle,
    flow: "auth-code",
  });

  const onResRecieved = (data, isSignUp) => {
    dispatch(userActions.login());
    localStorage.setItem("userID", data.id);
    localStorage.setItem("logging", "yes");

    let msg = isSignUp
      ? "Account Created Successfully"
      : "Logged In Successfully";

    enqueueSnackbar(msg, {
      variant: "success",
    });

    navigate("/");
  };

  const getData = (data) => {
    sendUserAuthRequest(data.inputs, data.signup)
      .then((responseData) => onResRecieved(responseData, data.signup))
      .catch((err) => {
        console.log(err);
        let msg = `${
          data.signup
            ? "Could Not Create Account! Please"
            : "Login Failed! Please Check Your Username And Password And"
        } Try Again Or Try Again After Sometime.`;

        enqueueSnackbar(msg, { variant: "error" });
      });
  };

  const handleGoogleAuth = (isSignUp) => {
    console.log("Signing Up", isSignUp);

    setSignUp(isSignUp);

    googleLogin();
  };

  return (
    <Box
      width={"100%"}
      height={"843px"}
      sx={{
        bgcolor: "secondary.main",
        overflow: "hidden",
        overflowY: "hidden",
      }}
    >
      <AuthForm onSubmit={getData} gAuth={handleGoogleAuth} isAdmin={false} />
    </Box>
  );
};

export default Auth;
