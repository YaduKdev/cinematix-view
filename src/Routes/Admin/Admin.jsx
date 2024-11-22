import React from "react";
import AuthForm from "../../Components/Auth/AuthForm";
import { sendAdminAuthRequest } from "../../api-calls/api-calls";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onResRecieved = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminID", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  const getData = (data) => {
    console.log("Admin", data);

    sendAdminAuthRequest(data.inputs)
      .then(onResRecieved)
      .catch((err) => console.log(err));
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
      <AuthForm onSubmit={getData} isAdmin={true} />
    </Box>
  );
};

export default Admin;
