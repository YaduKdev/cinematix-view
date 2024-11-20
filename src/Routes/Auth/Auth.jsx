import React from "react";
import AuthForm from "../../Components/Auth/AuthForm";
import { sendUserAuthRequest } from "../../api-calls/api-calls";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onResRecieved = (data) => {
    console.log("onResRecieved=>", data);
    dispatch(userActions.login());
    localStorage.setItem("userID", data.id);
    navigate("/");
  };

  const getData = (data) => {
    console.log("Auth", data);

    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResRecieved)
      .catch((err) => console.log(err));
  };

  return (
    <Box width={"100%"} height={"852px"} sx={{ bgcolor: "secondary.main" }}>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </Box>
  );
};

export default Auth;
