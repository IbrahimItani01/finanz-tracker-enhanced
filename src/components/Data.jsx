import React from "react";
import "../styles/income-expense.css";
import axios from "axios";

const Data = ({ dataType }) => {
  if (dataType === "expense") {
    // Elements
    const expenseDiv = document.getElementById("entry-div");
    const expenseEditHint = document.getElementById("edit-hint");
    const expenseSortCriteriaDropdown = document.getElementById("sortCriteria");
    const expenseForm = document.getElementById("expense-form");
    const expenseAmount = document.getElementById("expense-amount");
    const expenseNote = document.getElementById("expense-note");
    const userNameDisplay = document.getElementById("username-display");

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
      })
      .catch((err) => console.log(err));

    let expenseEditMode = false;
    let expenseEditKey = null;
    let expenseData = []; // Store fetched expense data

    // Fetch and render data
    const fetchExpenseData = () => {
      axios
        .post(
          "http://localhost/finanz-tracker-enhanced/apis/displayExpenses.php",
          {
            userId: localStorage.getItem("currentUser"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          expenseData = response.data.array; // Store the fetched expense data
          applyExpenseSort(); // Sort and render data after fetching
        })
        .catch((error) => console.error("Error fetching expense data:", error));
    };

    // Render expense data
    const renderExpenseData = () => {
      expenseDiv.innerHTML = ""; // Clear existing entries

      expenseData.forEach((expenseData) => {
        expenseDiv.innerHTML += `
      <div class="entry-card" key="${expenseData.id}">
        <div class="information">
          <h2 class="amount">$${expenseData.amount}</h2>
          <p class="note">${expenseData.note}</p>
        </div>
        <div class="actions-container">
          <div class="actions edit" key="edit-${expenseData.id}">
            <img src="/assets/edit-icon.svg" alt="edit-icon">
          </div>
          <div class="actions delete" key="delete-${expenseData.id}">
            <img src="/assets/delete-icon.svg" alt="delete-icon">
          </div>
        </div>
      </div>
    `;
      });

      attachExpenseEventListeners(); // Attach event listeners for edit and delete buttons
    };

    // Attach event listeners to buttons
    const attachExpenseEventListeners = () => {
      const deleteButtons = document.querySelectorAll(".delete");
      const editButtons = document.querySelectorAll(".edit");

      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const expenseCard = this.closest(".entry-card");
          const keyToDelete = expenseCard.getAttribute("key");

          axios
            .post(
              "http://localhost/finanz-tracker-enhanced/apis/deleteExpense.php",
              { id: keyToDelete },
              { headers: { "Content-Type": "application/json" } }
            )
            .then(() => {
              // Remove the deleted item from expenseData and re-render
              expenseData = expenseData.filter(
                (item) => item.id !== keyToDelete
              );
              renderExpenseData();
            })
            .catch((error) =>
              console.error("Error deleting expense data:", error)
            );
        });
      });

      editButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const expenseCard = this.closest(".entry-card");
          const keyToEdit = expenseCard.getAttribute("key");

          axios
            .post(
              "http://localhost/finanz-tracker-enhanced/apis/selectExpense.php",
              { id: keyToEdit },
              { headers: { "Content-Type": "application/json" } }
            )
            .then((res) => {
              expenseEditKey = res.data.id;
              expenseAmount.value = res.data.amount;
              expenseNote.value = res.data.note;
              expenseEditMode = true;
              expenseEditHint.classList.remove("hidden"); // Show edit hint
            })
            .catch((error) =>
              console.error("Error fetching expense data for edit:", error)
            );
        });
      });
    };

    // Add new or update existing expense
    const addOrUpdateExpense = (amount, note) => {
      if (!expenseEditMode) {
        // Adding new expense
        axios
          .post(
            "http://localhost/finanz-tracker-enhanced/apis/createExpense.php",
            {
              amount,
              note,
              userId: localStorage.getItem("currentUser"),
              date: new Date().toISOString(),
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            fetchExpenseData(); // Re-fetch and render after adding
          })
          .catch((error) => console.error("Error adding expense data:", error));
      } else {
        // Updating existing expense
        axios
          .post(
            "http://localhost/finanz-tracker-enhanced/apis/editExpense.php",
            { id: expenseEditKey, amount, note },
            { headers: { "Content-Type": "application/json" } }
          )
          .then(() => {
            expenseEditMode = false;
            expenseEditKey = null;
            expenseEditHint.classList.add("hidden"); // Hide edit hint
            fetchExpenseData(); // Re-fetch and render after updating
          })
          .catch((error) =>
            console.error("Error updating expense data:", error)
          );
      }
    };

    // Handle form submission
    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const amount = expenseAmount.value;
      const note = expenseNote.value;
      addOrUpdateExpense(amount, note);
      expenseForm.reset(); // Clear form inputs after submission
    });

    // Sorting function
    const applyExpenseSort = () => {
      const criteria = expenseSortCriteriaDropdown.value;

      expenseData.sort((a, b) => {
        if (criteria === "amount") {
          return parseFloat(a.amount) - parseFloat(b.amount);
        } else if (criteria === "note") {
          return a.note.localeCompare(b.note);
        } else if (criteria === "date") {
          return new Date(b.date) - new Date(a.date);
        }
      });

      renderExpenseData(); // Re-render after sorting
    };

    // Attach event listener to sort criteria dropdown
    expenseSortCriteriaDropdown.addEventListener("change", applyExpenseSort);

    // Initial fetch and render
    fetchExpenseData();
  } else {
    // Elements
    const entryDiv = document.getElementById("entry-div");
    const editHint = document.getElementById("edit-hint");
    const sortCriteriaDropdown = document.getElementById("sortCriteria");
    const entryForm = document.getElementById("entry-form");
    const entryAmount = document.getElementById("entry-amount");
    const entryNote = document.getElementById("entry-note");
    const userNameDisplay = document.getElementById("username-display");
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
        console.log(response.data);
      })
      .catch((err) => console.log(err));
    let editMode = false;
    let editKey = null;
    let incomeData = []; // Store fetched data

    // Fetch and render data
    const fetchIncomeData = () => {
      axios
        .post(
          "http://localhost/finanz-tracker-enhanced/apis/displayIncomes.php",
          {
            userId: localStorage.getItem("currentUser"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          incomeData = response.data.array;
          console.log(incomeData); // Store the fetched income data
          applySort(); // Sort and render data after fetching
        })
        .catch((error) => console.error("Error fetching income data:", error));
    };

    // Render income data
    const renderEntryData = () => {
      entryDiv.innerHTML = ""; // Clear existing entries

      incomeData.forEach((entryData) => {
        entryDiv.innerHTML += `
      <div class="entry-card" key="${entryData.id}">
        <div class="information">
          <h2 class="amount">$${entryData.amount}</h2>
          <p class="note">${entryData.note}</p>
        </div>
        <div class="actions-container">
          <div class="actions edit" key="edit-${entryData.id}">
            <img src="/assets/edit-icon.svg" alt="edit-icon">
          </div>
          <div class="actions delete" key="delete-${entryData.id}">
            <img src="/assets/delete-icon.svg" alt="delete-icon">
          </div>
        </div>
      </div>
    `;
      });

      attachEventListeners(); // Attach event listeners for edit and delete buttons
    };

    // Attach event listeners to buttons
    const attachEventListeners = () => {
      const deleteButtons = document.querySelectorAll(".delete");
      const editButtons = document.querySelectorAll(".edit");

      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const incomeCard = this.closest(".entry-card");
          const keyToDelete = incomeCard.getAttribute("key");

          axios
            .post(
              "http://localhost/finanz-tracker-enhanced/apis/deleteIncome.php",
              { id: keyToDelete },
              { headers: { "Content-Type": "application/json" } }
            )
            .then(() => {
              // Remove the deleted item from incomeData and re-render
              incomeData = incomeData.filter((item) => item.id !== keyToDelete);
              renderEntryData();
            })
            .catch((error) =>
              console.error("Error deleting income data:", error)
            );
        });
      });

      editButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const incomeCard = this.closest(".entry-card");
          const keyToEdit = incomeCard.getAttribute("key");

          axios
            .post(
              "http://localhost/finanz-tracker-enhanced/apis/selectIncome.php",
              { id: keyToEdit },
              { headers: { "Content-Type": "application/json" } }
            )
            .then((res) => {
              editKey = res.data.id;
              entryAmount.value = res.data.amount;
              entryNote.value = res.data.note;
              editMode = true;
              editHint.classList.remove("hidden"); // Show edit hint
            })
            .catch((error) =>
              console.error("Error fetching income data for edit:", error)
            );
        });
      });
    };

    // Add new or update existing income
    const addOrUpdateIncome = (amount, note) => {
      if (!editMode) {
        // Adding new income
        axios
          .post(
            "http://localhost/finanz-tracker-enhanced/apis/createIncome.php",
            {
              amount,
              note,
              userId: localStorage.getItem("currentUser"),
              date: new Date().toISOString(),
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            fetchIncomeData(); // Re-fetch and render after adding
          })
          .catch((error) => console.error("Error adding income data:", error));
      } else {
        // Updating existing income
        axios
          .post(
            "http://localhost/finanz-tracker-enhanced/apis/editIncome.php",
            { id: editKey, amount, note },
            { headers: { "Content-Type": "application/json" } }
          )
          .then(() => {
            editMode = false;
            editKey = null;
            editHint.classList.add("hidden"); // Hide edit hint
            fetchIncomeData(); // Re-fetch and render after updating
          })
          .catch((error) =>
            console.error("Error updating income data:", error)
          );
      }
    };

    // Handle form submission
    entryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const amount = entryAmount.value;
      const note = entryNote.value;
      addOrUpdateIncome(amount, note);
      entryForm.reset(); // Clear form inputs after submission
    });

    // Sorting function
    const applySort = () => {
      const criteria = sortCriteriaDropdown.value;

      incomeData.sort((a, b) => {
        if (criteria === "amount") {
          return parseFloat(a.amount) - parseFloat(b.amount);
        } else if (criteria === "note") {
          return a.note.localeCompare(b.note);
        } else if (criteria === "date") {
          return new Date(b.date) - new Date(a.date);
        }
      });

      renderEntryData(); // Re-render after sorting
    };

    // Attach event listener to sort criteria dropdown
    sortCriteriaDropdown.addEventListener("change", applySort);

    // Initial fetch and render
    fetchIncomeData();
  }
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
          {dataType === "expense" ? (
            <button type="submit">Add/Edit Expense </button>
          ) : (
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
  );
};

export default Data;
