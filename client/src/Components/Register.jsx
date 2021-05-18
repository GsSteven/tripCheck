import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState("");

  const registerUser = () => {
    //check passwords are correct
    if (password !== password2) {
      setErrors("Passwords do not match");
      return;
    }

    const payLoad = { name, email, password, password2 };
    axios.post("/api/auth/register", payLoad).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="registerWrapper">
      <form onSubmit={registerUser} className="className">
        <h1>Trip Check</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          id="password2"
          name="password2"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type="submit">Register</button>
        {errors && <p className="errors">{errors}</p>}
        <a href="./Login" className="loginLink">
          Login here
        </a>
      </form>
    </div>
  );
}
