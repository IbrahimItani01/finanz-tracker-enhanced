import React from 'react'
import "../styles/login.css"
import { Link } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const submitButton = document.getElementById("submit-button");
const userNameContainer = document.getElementById("username-container");
const burgerMenu = document.getElementById("mobile-menu");
const burgerContent = document.getElementById("mobile-content");
const passwordValue = document.getElementById("password");
burgerMenu?.addEventListener("click", () => {
  burgerContent.classList.toggle("hidden");
});
submitButton?.addEventListener("click", () => {
  const userNameInput = document.getElementById("username");
  const budgetInput = document.getElementById("budget");
  let budgetNumber = parseInt(budgetInput.value);
  if (userNameInput.value === "" && isNaN(budgetNumber)) {
    userNameContainer.innerHTML += `
        <p>Note! You must enter a username and budget</p>
        `;
    setTimeout(() => {
      window.location.reload();
    }, 700);
  } else if (userNameInput.value === "" && !isNaN(budgetNumber)) {
    userNameContainer.innerHTML += `
        <p>Note! You must enter a username</p>
        `;
    setTimeout(() => {
      window.location.reload();
    }, 700);
  } else if (isNaN(budgetNumber) && userNameInput.value !== " ") {
    userNameContainer.innerHTML += `
        <p>Note! You must enter a budget</p>
        `;
    setTimeout(() => {
      window.location.reload();
    }, 700);
  } else {
    axios
      .post(
        "http://localhost/finanz-tracker-enhanced/apis/createUser.php",
        {
          name: userNameInput.value,
          budget: budgetNumber,
          password: passwordValue.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        if (response.data.status == "success") {
          localStorage.setItem("currentUser", response.data.userId);
          window.location.href = "http://127.0.0.1:5500/pages/dashboard.html";
        } else {
          alert("Failed to login.. Check password");
        }
      })
      .catch((err) => console.log(err));
  }
});

  return (
    <section class="login-section">
    <div class="login-container">
        <div class="login-logo">
            <div>
                <img src="/public/assets/logo.png" alt="logo"/>
               
            </div>
            <h1>Welcome to Finanz</h1>
        </div>
        <div class="login-form">
            <div id="username-container">
                <label for="username">Username:</label>
              <input type="text" name="username" id="username" />

              <label for="password">Password:</label>
              <input type="password" name="password" id="password" />
              
              <label for="budget">Initial Budget (in $):</label>
              <input type="number" name="budget" id="budget" />
            </div>
          <button id="submit-button">     
            <Link to="/home">
                To Dashboard
            </Link>        
            </button>
        </div>

    </div>
</section>
  )
}

export default Login