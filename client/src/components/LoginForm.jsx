import React from "react";
import { Link } from "react-router-dom";

export default function LoginForm({
  onSubmit,
  email,
  password,
  handlePwdChange,
  handleEmailChange,
  redu
}) {
  return (
    <form className="login_form" onSubmit={onSubmit}>
      <div className="form_input">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="John@cooper.com"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <div className="form_input">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={handlePwdChange}
        />
      </div>
      <div className="form_button_container">
        <button>Log in</button>
        <p>Need an account? <Link to="/signin">Sign up</Link></p>
      </div>
    </form>
  );
}
