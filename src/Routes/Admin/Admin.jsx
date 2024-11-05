import React from "react";
import AuthForm from "../../Components/Auth/AuthForm";
import { sendAdminAuthRequest } from "../../api-calls/api-calls";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";

const Admin = () => {
  const dispatch = useDispatch();

  const onResRecieved = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminID", data.id);
    localStorage.setItem("token", data.token);
  };

  const getData = (data) => {
    console.log("Admin", data);

    sendAdminAuthRequest(data.inputs)
      .then(onResRecieved)
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
