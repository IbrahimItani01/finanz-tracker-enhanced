import React, { useState, useEffect } from "react";
import "../styles/income-expense.css";
import axios from "axios";

const Data = ({ dataType }) => {
  const [entryAmount, setEntryAmount] = useState(0);
  const [entryNote, setEntryNote] = useState("");
  const [entryData, setEntryData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editKey, setEditKey] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("amount");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchUserName();
    fetchData();
  }, []);

  useEffect(() => {
    sortData();
  }, [sortCriteria]); // Only re-sort when sortCriteria changes

  const fetchUserName = () => {
    axios
      .post("http://localhost/finanz-tracker-enhanced/apis/displayUser.php", {
        id: localStorage.getItem("currentUser"),
      })
      .then((response) => setUserName(response.data.name))
      .catch((err) => console.log(err));
  };

  const fetchData = () => {
    const url =
      dataType === "expense"
        ? "http://localhost/finanz-tracker-enhanced/apis/displayExpenses.php"
        : "http://localhost/finanz-tracker-enhanced/apis/displayIncomes.php";

    axios
      .post(
        url,
        { userId: localStorage.getItem("currentUser") },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setEntryData(response.data.array);
        sortData(response.data.array); // Sort immediately after fetching
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editMode) {
      addEntry();
    } else {
      updateEntry();
    }
  };

  const addEntry = () => {
    const url =
      dataType === "expense"
        ? "http://localhost/finanz-tracker-enhanced/apis/createExpense.php"
        : "http://localhost/finanz-tracker-enhanced/apis/createIncome.php";

    axios
      .post(
        url,
        {
          amount: entryAmount,
          note: entryNote,
          userId: localStorage.getItem("currentUser"),
          date: new Date().toISOString(),
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        fetchData();
        resetForm();
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  const updateEntry = () => {
    const url =
      dataType === "expense"
        ? "http://localhost/finanz-tracker-enhanced/apis/editExpense.php"
        : "http://localhost/finanz-tracker-enhanced/apis/editIncome.php";

    axios
      .post(
        url,
        { id: editKey, amount: entryAmount, note: entryNote },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        setEditMode(false);
        setEditKey(null);
        fetchData();
        resetForm();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const deleteEntry = (id) => {
    const url =
      dataType === "expense"
        ? "http://localhost/finanz-tracker-enhanced/apis/deleteExpense.php"
        : "http://localhost/finanz-tracker-enhanced/apis/deleteIncome.php";

    axios
      .post(url, { id }, { headers: { "Content-Type": "application/json" } })
      .then(() => setEntryData(entryData.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting data:", error));
  };

  const editEntry = (id) => {
    const url =
      dataType === "expense"
        ? "http://localhost/finanz-tracker-enhanced/apis/selectExpense.php"
        : "http://localhost/finanz-tracker-enhanced/apis/selectIncome.php";

    axios
      .post(url, { id }, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        setEditKey(res.data.id);
        setEntryAmount(res.data.amount);
        setEntryNote(res.data.note);
        setEditMode(true);
      })
      .catch((error) => console.error("Error fetching data for edit:", error));
  };

  const resetForm = () => {
    setEntryAmount(0);
    setEntryNote("");
  };

  const sortData = (data = entryData) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortCriteria === "amount") return parseFloat(a.amount) - parseFloat(b.amount);
      if (sortCriteria === "note") return a.note.localeCompare(b.note);
      if (sortCriteria === "date") return new Date(b.date) - new Date(a.date);
    });
    setEntryData(sortedData);
  };

  return (
    <div className="entry-section">
      <h1>{dataType === "expense" ? "Expenses" : "Incomes"}</h1>
      <p id="username-display">{userName}</p>
      <form id="entry-form" onSubmit={handleSubmit}>
        <input
          id="entry-amount"
          type="number"
          value={entryAmount}
          onChange={(e) => setEntryAmount(e.target.value)}
        />
        <input
          id="entry-note"
          type="text"
          value={entryNote}
          onChange={(e) => setEntryNote(e.target.value)}
        />
        <button type="submit">{editMode ? "Update" : "Add"} Entry</button>
      </form>
      <div id="entry-div" className="entry-display">
        <select
          id="sortCriteria"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="amount">Amount</option>
          <option value="note">Note</option>
          <option value="date">Date</option>
        </select>
        {entryData.map((entry) => (
          <div className="entry-card" key={entry.id}>
            <div className="information">
              <h2 className="amount">${entry.amount}</h2>
              <p className="note">{entry.note}</p>
            </div>
            <div className="actions-container">
              <div className="actions edit" onClick={() => editEntry(entry.id)}>
                <img src="/assets/edit-icon.svg" alt="edit-icon" />
              </div>
              <div className="actions delete" onClick={() => deleteEntry(entry.id)}>
                <img src="/assets/delete-icon.svg" alt="delete-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
