// Elements
const entryDiv = document.getElementById("entry-div");
const editHint = document.getElementById("edit-hint");
const sortCriteriaDropdown = document.getElementById("sortCriteria");
const entryForm = document.getElementById("entry-form");
const entryAmount = document.getElementById("entry-amount");
const entryNote = document.getElementById("entry-note");
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
    console.log(response.data)
  })
  .catch((err) => console.log(err));
let editMode = false;
let editKey = null;
let incomeData = [];  // Store fetched data

// Fetch and render data
const fetchIncomeData = () => {
  axios.post(
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
  .then(response => {
    incomeData = response.data.array; 
    console.log(incomeData) // Store the fetched income data
    applySort();  // Sort and render data after fetching
  })
  .catch(error => console.error("Error fetching income data:", error));
};

// Render income data
const renderEntryData = () => {
  entryDiv.innerHTML = "";  // Clear existing entries

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

  attachEventListeners();  // Attach event listeners for edit and delete buttons
};

// Attach event listeners to buttons
const attachEventListeners = () => {
  const deleteButtons = document.querySelectorAll(".delete");
  const editButtons = document.querySelectorAll(".edit");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const incomeCard = this.closest(".entry-card");
      const keyToDelete = incomeCard.getAttribute("key");

      axios.post(
        "http://localhost/finanz-tracker-enhanced/apis/deleteIncome.php",
        { id: keyToDelete },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        // Remove the deleted item from incomeData and re-render
        incomeData = incomeData.filter(item => item.id !== keyToDelete);
        renderEntryData();
      })
      .catch(error => console.error("Error deleting income data:", error));
    });
  });

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const incomeCard = this.closest(".entry-card");
      const keyToEdit = incomeCard.getAttribute("key");

      axios.post(
        "http://localhost/finanz-tracker-enhanced/apis/selectIncome.php",
        { id: keyToEdit },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        editKey = res.data.id;
        entryAmount.value = res.data.amount;
        entryNote.value = res.data.note;
        editMode = true;
        editHint.classList.remove("hidden");  // Show edit hint
      })
      .catch(error => console.error("Error fetching income data for edit:", error));
    });
  });
};

// Add new or update existing income
const addOrUpdateIncome = (amount, note) => {
  if (!editMode) {
    // Adding new income
    axios.post(
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
    .then(res => {
      fetchIncomeData();  // Re-fetch and render after adding
    })
    .catch(error => console.error("Error adding income data:", error));
  } else {
    // Updating existing income
    axios.post(
      "http://localhost/finanz-tracker-enhanced/apis/editIncome.php",
      { id: editKey, amount, note },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(() => {
      editMode = false;
      editKey = null;
      editHint.classList.add("hidden");  // Hide edit hint
      fetchIncomeData();  // Re-fetch and render after updating
    })
    .catch(error => console.error("Error updating income data:", error));
  }
};

// Handle form submission
entryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = entryAmount.value;
  const note = entryNote.value;
  addOrUpdateIncome(amount, note);
  entryForm.reset();  // Clear form inputs after submission
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

  renderEntryData();  // Re-render after sorting
};

// Attach event listener to sort criteria dropdown
sortCriteriaDropdown.addEventListener("change", applySort);

// Initial fetch and render
fetchIncomeData();
