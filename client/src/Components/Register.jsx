import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState("");

  const registerUser = (e) => {
    if (e) e.preventDefault();
    //check passwords are correct
    if (password !== password2) {
      setErrors("Passwords do not match");
      return;
    }

    const payLoad = { name, email, password, password2 };
    axios.post("/api/auth/register", payLoad).then((response) => {
      if (response.status === 200) {
        window.location.href = "./login";
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) registerUser();
  };

  return (
    <div className="registerWrapper">
      <form
        onSubmit={registerUser}
        className="className"
        onKeyPress={handleKeyPress}
      >
        <h1>
          <u>Trip Check</u>
        </h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          id="password2"
          name="password2"
          required
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
