import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [budget, setBudget] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    setBudget(value === "" ? "" : Number(value)); // Store as a number or empty string
  };

  const handleSubmit = () => {
    if (userName === "" || password === "" || budget <= 0 || isNaN(budget)) {
      setError("Please enter a valid username, password, and budget.");
      return;
    }

    axios
      .post(
        "http://localhost/finanz-tracker-enhanced/apis/createUser.php",
        {
          name: userName,
          budget: budget,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        if (response.data.status === "success") {
          localStorage.setItem("currentUser", response.data.userId);
          setDisabled(false);
          navigate("/home");
        } else {
          setError("Failed to login. Check username and password.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-logo">
          <div>
            <img src="/assets/logo.png" alt="logo" />
          </div>
          <h1>Welcome to Finanz</h1>
        </div>
        <div className="login-form">
          <div id="username-container">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={userName}
              onChange={handleUsernameChange}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <label htmlFor="budget">Initial Budget (in $):</label>
            <input
              type="number"
              name="budget"
              id="budget"
              value={budget}
              onChange={handleBudgetChange}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            id="submit-button"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Submit
          </button>
          {!disabled && <Link to="/home">To Dashboard</Link>}
        </div>
      </div>
    </section>
  );
};

export default Login;
