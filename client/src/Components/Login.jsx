import React, { useState } from "react";
import { loginUser } from "./../componentUtil/logUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitUser = (e) => {
    if (e) e.preventDefault();
    loginUser({ email, password });
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) submitUser();
  };

  return (
    <div className="loginWrapper">
      <form
        onSubmit={submitUser}
        className="className"
        onKeyPress={handleKeyPress}
      >
        <h1>
          <u>Trip Check</u>
        </h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <a href="./Register" className="registerLink">
          Register here
        </a>
      </form>
    </div>
  );
}
