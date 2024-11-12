import React, { useState } from "react";
import "../styles/base.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [burgerHidden, setBurgerHidden] = useState(true);
  const navigate = useNavigate();

  const toggleBurgerMenu = () => {
    setBurgerHidden(!burgerHidden);
  };

  const handleReset = () => {
    axios
      .post(
        "http://localhost/finanz-tracker-enhanced/apis/deleteUser.php",
        {
          id: localStorage.getItem("currentUser"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="side-bar">
        <div className="side-logo">
          <img src={"./assets/logo.png"} alt="logo" />
        </div>
        <div className="out-budget hidden" id="warning">
          <h3>Out of Budget!!</h3>
        </div>
        <nav>
          <Link to="/home" className="current-page">
            Overview
          </Link>
          <Link to="/income">Income</Link>
          <Link to="/expense">Expenses</Link>
        </nav>
        <button className="reset" id="reset-button" onClick={handleReset}>
          Reset
        </button>
        <em> &copy; Finanz | Ibrahim Itani</em>
      </div>
      <div className="top-section">
        <h1>
          Hi, <span id="username-display"></span>!
        </h1>
        <div className="mobile-bar">
          <div className="burger-logo" id="mobile-menu" onClick={toggleBurgerMenu}>
            <img src="/assets/burger-icon.svg" alt="" />
          </div>
          {!burgerHidden && (
            <div className="mobile" id="mobile-content">
              <div className="out-budget hidden" id="warning">
                <h3>Out of Budget!!</h3>
              </div>
              <nav>
                <Link to="/home" className="current-page">
                  Overview
                </Link>
                <Link to="/income">Income</Link>
                <Link to="/expense">Expenses</Link>
              </nav>
              <button className="reset" id="reset-button" onClick={handleReset}>
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
