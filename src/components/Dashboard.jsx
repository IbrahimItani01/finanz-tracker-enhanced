import React from 'react'
import "../styles/dashboard.css"
const Dashboard = () => {
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