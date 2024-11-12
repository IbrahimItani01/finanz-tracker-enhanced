import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [budget, setBudget] = useState(0);
  const [disabled,setDisabled]=useState(true);
  const handleUsernameChange = (e) => {
    setuserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };
  const handleSubmit =() => {
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
        } else {
          alert("Failed to login.. Check password");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-logo">
          <div>
            <img src="/public/assets/logo.png" alt="logo" />
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
              onChange={handleUsernameChange}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handlePasswordChange}
            />

            <label htmlFor="budget">Initial Budget (in $):</label>
            <input
              type="number"
              name="budget"
              id="budget"
              onChange={handleBudgetChange}
            />
            {
              userName === "" && isNaN(budget) && (
                <p>Note! You must enter a username and budget</p>
              )}
              {userName === "" && !isNaN(budget) && (
                <p>Note! You must enter a username</p>
              )}
              {isNaN(budget) && userName !== " " && (
                <p>Note! You must enter a budget</p>
              )
              }
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            id="submit-button"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
