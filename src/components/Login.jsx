import React from 'react'
import "../styles/login.css"
import { Link } from 'react-router-dom'

const Login = () => {
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