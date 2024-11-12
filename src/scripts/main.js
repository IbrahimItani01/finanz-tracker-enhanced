const submitButton = document.getElementById("submit-button");
const userNameContainer = document.getElementById("username-container");
const burgerMenu = document.getElementById("mobile-menu");
const burgerContent = document.getElementById("mobile-content");
const passwordValue = document.getElementById("password");
burgerMenu?.addEventListener("click", () => {
  burgerContent.classList.toggle("hidden");
});
submitButton?.addEventListener("click", () => {
  const userNameInput = document.getElementById("username");
  const budgetInput = document.getElementById("budget");
  let budgetNumber = parseInt(budgetInput.value);
  if (userNameInput.value === "" && isNaN(budgetNumber)) {
    userNameContainer.innerHTML += `
        <p>Note! You must enter a username and budget</p>
        `;
    setTimeout(() => {
      window.location.reload();
    }, 700);
  } else if (userNameInput.value === "" && !isNaN(budgetNumber)) {
    userNameContainer.innerHTML += `
        <p>Note! You must enter a username</p>
        `;
    setTimeout(() => {
      window.location.reload();
    }, 700);
  } else if (isNaN(budgetNumber) && userNameInput.value !== " ") {
    userNameContainer.innerHTML += `
        <p>Note! You must enter a budget</p>
        `;
    setTimeout(() => {
      window.location.reload();
    }, 700);
  } else {
    axios
      .post(
        "http://localhost/finanz-tracker-enhanced/apis/createUser.php",
        {
          name: userNameInput.value,
          budget: budgetNumber,
          password: passwordValue.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        if(response.data.status=="success"){
          localStorage.setItem("currentUser", response.data.userId);
          window.location.href = "http://127.0.0.1:5500/pages/dashboard.html";
        }
        else{
          alert("Failed to login.. Check password")
        }
      })
      .catch((err) => console.log(err));
  }
});


