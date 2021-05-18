import React, { useState } from "react";
import { loginUser } from "./../componentUtil/logUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitUser = (e) => {
    loginUser({ email, password });
  };

  return (
    <div className="loginWrapper">
      <form onSubmit={submitUser} className="className">
        <h1>Trip Check</h1>
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
