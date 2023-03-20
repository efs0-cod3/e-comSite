import React, { useState } from "react";
import { Link } from "react-router-dom";
import signupService from "../services/signup";
import { useDispatch } from "react-redux";
import { signedUser } from "../redux/features/userSlice";

const Signup = ({}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [confPwd, setConfPwd] = useState("");
  const [user, setUser] = useState(null);
  const [errorMsj, setErrorMsj] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await signupService.signup({
        name,
        email,
        username,
        pwd,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      dispatch(signedUser(user));
    } catch (error) {
      console.log(error.response.data);
      setErrorMsj("all fields must be completed");
      setTimeout(() => {
        setErrorMsj(null);
      }, 1000);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConfPwdChange = (e) => {
    setConfPwd(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="signupForm">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="John Cooper"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>

      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="xppl"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="John@cooper.com"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={pwd}
          name="password"
          onChange={handlePwdChange}
        />
      </div>

      <div>
        <label htmlFor="passwordConfirmation">Confirm password:</label>
        <input
          type="password"
          placeholder="password"
          value={confPwd}
          name="passwordConfirmation"
          onChange={handleConfPwdChange}
        />
      </div>

      <div>
        <button>Sign up</button>
        <div>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </form>
  );
};

export default Signup;
