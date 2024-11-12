import React from 'react'
import "../styles/base.css"

const Navbar = () => {
  return (
    <div className="side-bar">
            <div className="side-logo">
                <img src={"./assets/logo.png"} alt="logo"/>
            </div>
            <div className="out-budget hidden" id="warning">
                <h3>Out of Budget!!</h3>
            </div>
            <nav>
                <a href="/pages/dashboard.html" className="current-page">Overview</a>
                <a href="/pages/income.html">Income</a>
                <a href="/pages/expense.html">Expenses</a>
            </nav>
            <button className="reset" id="reset-button">Reset</button>
            <em> &copy Finanz | Ibrahim Itani</em>
    </div>
  )
}

export default Navbar