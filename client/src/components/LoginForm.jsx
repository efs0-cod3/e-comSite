import React from "react";

export default function LoginForm({
  onSubmit,
  email,
  password,
  handlePwdChange,
  handleEmailChange,
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
      <button>login</button>
    </form>
  );
}
