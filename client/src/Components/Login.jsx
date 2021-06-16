import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { loginUser } from "./../componentUtil/logUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const submitUser = async (e) => {
    if (e) e.preventDefault();
    const isLoggedIn = await loginUser({ email, password });
    //set errors or push to dashboard
    if (isLoggedIn.errors) {
      setErrors(isLoggedIn.errors);
    } else {
      window.location.href = "./dashboard";
    }
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      submitUser();
    }
  };

  useEffect(() => {
    //if token exists push to dashboard
    if (localStorage.tripCheckToken) {
      window.location.href = "./dashboard";
    }
  }, []);

  return (
    <div className="loginWrapper">
      <motion.form
        onSubmit={submitUser}
        className="className"
        onKeyPress={handleKeyPress}
        initial={{ y: -400, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
      >
        <h1>
          <u>Trip Check</u>
        </h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {errors && <p className="errors">{errors}</p>}
        <a href="./Register" className="registerLink">
          Register here
        </a>
      </motion.form>
    </div>
  );
}
