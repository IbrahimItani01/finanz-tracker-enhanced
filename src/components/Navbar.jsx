import React from 'react'
import "../styles/dashboard.css"
const Navbar = () => {
  return (
    <div class="side-bar">
            <div class="side-logo">
                <img src="/assets/logo.png" alt="logo"/>
            </div>
            <div class="out-budget hidden" id="warning">
                <h3>Out of Budget!!</h3>
            </div>
            <nav>
                <a href="/pages/dashboard.html" class="current-page">Overview</a>
                <a href="/pages/income.html">Income</a>
                <a href="/pages/expense.html">Expenses</a>
            </nav>
            <button class="reset" id="reset-button">Reset</button>
            <em> &copy Finanz | Ibrahim Itani</em>
    </div>
  )
}

export default Navbar