import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [budget, setBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

  useEffect(() => {
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
        setUsername(response.data.name);
        setBudget(response.data.budget);
      })
      .catch((err) => console.log(err));

  resetButton?.addEventListener("click",()=>{
    axios
      .post(
        "http://localhost/finanz-tracker-enhanced/apis/totalValues.php",
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
        setTotalExpenses(response.data.total_expenses);
        setTotalIncomes(response.data.total_income);
        setRemainingBudget(response.data.budget - response.data.total_expenses);
      })
      .catch((err) => console.log(err));
  }, []);

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