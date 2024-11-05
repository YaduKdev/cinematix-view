import React from "react";
import AuthForm from "../../Components/Auth/AuthForm";
import { sendUserAuthRequest } from "../../api-calls/api-calls";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";

const Auth = () => {
  const dispatch = useDispatch();

  const onResRecieved = (data) => {
    console.log("onResRecieved=>", data);
    dispatch(userActions.login());
    localStorage.setItem("userID", data.id);
  };

  const getData = (data) => {
    console.log("Auth", data);

    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResRecieved)
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
