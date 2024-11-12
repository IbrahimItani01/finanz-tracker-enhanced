import React from 'react'
import "../styles/dashboard.css"
import axios from 'axios';
const Dashboard = () => {
    const remainingBudget = document.getElementById("remaining-budget-display");
const totalExpensesDisplay = document.getElementById("expenses-total-display");
const totalIncomeDisplay = document.getElementById("income-total-display");
const budgetWarning = document.getElementById("warning");
const resetButton = document.getElementById("reset-button");
const userNameDisplay = document.getElementById("username-display");
const budgetDisplay = document.getElementById("budget-display");

axios
  .post("http://localhost/finanz-tracker-enhanced/apis/displayUser.php",
    {
      id: localStorage.getItem("currentUser"),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then((response) => {
    userNameDisplay.innerText = response.data.name;
    budgetDisplay.innerText = response.data.budget;
  })
  .catch((err) => console.log(err));

axios
  .post("http://localhost/finanz-tracker-enhanced/apis/totalValues.php",
    {
      id: localStorage.getItem("currentUser"),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then((response) => {
    totalExpensesDisplay.innerText = response.data.total_expenses;
    totalIncomeDisplay.innerText = response.data.total_income;
    remainingBudget.innerText =
      parseInt(budgetDisplay.innerText) -
      parseInt(totalExpensesDisplay.innerText);
    if(parseInt(remainingBudget.innerText)<=0){
      budgetWarning.classList.toggle("hidden")
    }
  })
  .catch((err) => console.log(err));
  axios
  .post(
    "http://localhost/finanz-tracker-enhanced/apis/displayUser.php",
    {
      id: localStorage.getItem("currentUser"),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then((response) => {
    userNameDisplay.innerText = response.data.name;
    budgetDisplay.innerText = response.data.budget;

  })
  .catch((err) => console.log(err));

  resetButton?.addEventListener("click",()=>{
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
  .then((response) => {
    window.location.href = "http://127.0.0.1:5500";

  })
  .catch((err) => console.log(err));

  })
  return (
    <div class="data-section">
                <div class="features-card">
                    <h2>In Finanz you can:</h2>
                    <ul>
                        <li>Manage your finances (create,edit,delete,...)</li>
                        <li>View Expenses & Incomes</li>
                        <li>Filter your transactions</li>
                    </ul>
                </div>
                <div class="data-container">
                    <div class="double-side-container">
                        <div class="double-side-card">
                            <h2>Monthly Budget</h2>
                            <div class="overview-data">
                                <p>Total: $<span id="budget-display"></span></p>
                            </div>
                        </div>
                        <div class="double-side-card">
                            <h2>Remaining Budget</h2>
                            <div class="overview-data">
                                <p>Total: $<span id="remaining-budget-display"></span></p>
                            </div>
                        </div>
                    </div>
                    <div class="double-side-container">
                        <div class="double-side-card">
                            <h2>Expenses</h2>
                            <div class="overview-data">
                                <p>Total: $<span id="expenses-total-display"></span></p>
                            </div>
                        </div>
                        <div class="double-side-card">
                            <h2>Income</h2>
                            <div class="overview-data">
                                <p>Total: $<span id="income-total-display"></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default Dashboard