import React, { useState } from "react";
import Notification from "./Notification";
import LoginForm from "./LoginForm";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { signedUser } from "../redux/features/userSlice";

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMsj, setErrorMsj] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        email,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);

      dispatch(signedUser(user));

      setEmail("");
      setPassword("");
    } catch (e) {
      console.log(e);
      setErrorMsj("Wrong credentials");
      setTimeout(() => {
        setErrorMsj(null);
      }, 1000);
    }
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const pwdChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <Notification message={errorMsj} />
      <LoginForm
        onSubmit={handleLogin}
        email={email}
        password={password}
        handleEmailChange={emailChange}
        handlePwdChange={pwdChange}
      />
    </div>
  );
}

export default Login;
