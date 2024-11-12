// Elements
const expenseDiv = document.getElementById("entry-div");
const expenseEditHint = document.getElementById("edit-hint");
const expenseSortCriteriaDropdown = document.getElementById("sortCriteria");
const expenseForm = document.getElementById("expense-form");
const expenseAmount = document.getElementById("expense-amount");
const expenseNote = document.getElementById("expense-note");
const userNameDisplay = document.getElementById("username-display");

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
  })
  .catch((err) => console.log(err));

let expenseEditMode = false;
let expenseEditKey = null;
let expenseData = [];  // Store fetched expense data

// Fetch and render data
const fetchExpenseData = () => {
  axios.post(
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
  .then(response => {
    expenseData = response.data.array;  // Store the fetched expense data
    applyExpenseSort();  // Sort and render data after fetching
  })
  .catch(error => console.error("Error fetching expense data:", error));
};

// Render expense data
const renderExpenseData = () => {
  expenseDiv.innerHTML = "";  // Clear existing entries

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

  attachExpenseEventListeners();  // Attach event listeners for edit and delete buttons
};

// Attach event listeners to buttons
const attachExpenseEventListeners = () => {
  const deleteButtons = document.querySelectorAll(".delete");
  const editButtons = document.querySelectorAll(".edit");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const expenseCard = this.closest(".entry-card");
      const keyToDelete = expenseCard.getAttribute("key");

      axios.post(
        "http://localhost/finanz-tracker-enhanced/apis/deleteExpense.php",
        { id: keyToDelete },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        // Remove the deleted item from expenseData and re-render
        expenseData = expenseData.filter(item => item.id !== keyToDelete);
        renderExpenseData();
      })
      .catch(error => console.error("Error deleting expense data:", error));
    });
  });

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const expenseCard = this.closest(".entry-card");
      const keyToEdit = expenseCard.getAttribute("key");

      axios.post(
        "http://localhost/finanz-tracker-enhanced/apis/selectExpense.php",
        { id: keyToEdit },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        expenseEditKey = res.data.id;
        expenseAmount.value = res.data.amount;
        expenseNote.value = res.data.note;
        expenseEditMode = true;
        expenseEditHint.classList.remove("hidden");  // Show edit hint
      })
      .catch(error => console.error("Error fetching expense data for edit:", error));
    });
  });
};

// Add new or update existing expense
const addOrUpdateExpense = (amount, note) => {
  if (!expenseEditMode) {
    // Adding new expense
    axios.post(
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
    .then(res => {
      fetchExpenseData();  // Re-fetch and render after adding
    })
    .catch(error => console.error("Error adding expense data:", error));
  } else {
    // Updating existing expense
    axios.post(
      "http://localhost/finanz-tracker-enhanced/apis/editExpense.php",
      { id: expenseEditKey, amount, note },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(() => {
      expenseEditMode = false;
      expenseEditKey = null;
      expenseEditHint.classList.add("hidden");  // Hide edit hint
      fetchExpenseData();  // Re-fetch and render after updating
    })
    .catch(error => console.error("Error updating expense data:", error));
  }
};

// Handle form submission
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = expenseAmount.value;
  const note = expenseNote.value;
  addOrUpdateExpense(amount, note);
  expenseForm.reset();  // Clear form inputs after submission
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

  renderExpenseData();  // Re-render after sorting
};

// Attach event listener to sort criteria dropdown
expenseSortCriteriaDropdown.addEventListener("change", applyExpenseSort);

// Initial fetch and render
fetchExpenseData();
