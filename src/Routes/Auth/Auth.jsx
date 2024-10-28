import React from "react";
import AuthForm from "../../Components/Auth/AuthForm";
import { sendUserAuthRequest } from "../../api-calls/api-calls";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";

const Auth = () => {
  const dispatch = useDispatch();

  const getData = (data) => {
    console.log("Auth", data);

    sendUserAuthRequest(data.inputs, data.signup)
      .then((res) => console.log("This is response from backend", res))
      .then(() => dispatch(userActions.login()))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
