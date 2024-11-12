import React from 'react'
import "../styles/base.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className="side-bar">
            <div className="side-logo">
                <img src={"./assets/logo.png"} alt="logo"/>
            </div>
            <div className="out-budget hidden" id="warning">
                <h3>Out of Budget!!</h3>
            </div>
            <nav>
                <Link to="/home" className="current-page">Overview</Link>
                <Link to="/income">Income</Link>
                <Link to="/expense">Expenses</Link>
            </nav>
            <button className="reset" id="reset-button">Reset</button>
            <em> &copy Finanz | Ibrahim Itani</em>
    </div>
     <div className="top-section">
     <h1>Hi,  <span id="username-display"></span>!</h1>
     <div className="mobile-bar">
         <div className="burger-logo" id="mobile-menu">
             <img src="/assets/burger-icon.svg" alt=""/>
         </div>
         <div className=" mobile hidden" id="mobile-content">
             <div className="out-budget hidden" id="warning">
                 <h3>Out of Budget!!</h3>
             </div>
             <nav>
                <Link to="/home" className="current-page">Overview</Link>
                <Link to="/income">Income</Link>
                <Link to="/expense">Expenses</Link>
             </nav>
             <button className="reset" id="reset-button">Reset</button>
         </div>
     </div>
 </div>
 </>
  )
}

export default Navbar