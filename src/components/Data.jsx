import React from 'react'
import "../styles/income-expense.css"
const Data = ({dataType}) => {
  return (
    <>
     <div class="entry-section">
          <form id="entry-form">
            <div class="edit-hint hidden" id="edit-hint">
              <em>Edit Data Here</em>
            </div>
            <label>
              Amount (in $):
              <input type="number" id="entry-amount" required />
            </label>
            <label>
              Note:
              <input type="text" id="entry-note" required />
            </label>
            {dataType==="expense"? (
                <button type="submit">Add/Edit Expense </button>
            ):(
                <button type="submit">Add/Edit Income </button>
            )}
          </form>
          <div>
            <div class="sort-container">
              <label for="sortCriteria">Sort by:</label>
              <select id="sortCriteria">
                <option value="amount">Amount (low to high)</option>
                <option value="note">Note (Alphabetically)</option>
                <option value="date">Date (Newest First)</option>
              </select>
            </div>
            <div class="entry-display" id="entry-div"></div>
          </div>
        </div>
    </>
  )
}

export default Data