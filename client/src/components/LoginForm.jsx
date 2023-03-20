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
    <form onSubmit={onSubmit}>
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
          value={password}
          name="password"
          onChange={handlePwdChange}
        />
      </div>
      <div>
        <button>Log in</button>
        <div>Need an account? <Link to="/signup">Sign up</Link></div>
      </div>
    </form>
  );
}
