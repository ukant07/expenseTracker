var expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  // input values
  var amount = document.getElementById("expenseAmount").value;
  var description = document.getElementById("expenseDescription").value;
  var category = document.getElementById("expenseCategory").value;

  // object to store expense details
  var expense = {
    amount: amount,
    description: description,
    category: category,
  };

  // expense object pushed into expenses array
  expenses.push(expense);

  // updated expenses array pushed back in local storage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();

  // to clear the expense fields
  document.getElementById("expenseFields").reset();
}

function displayExpenses() {
  var expenseList = document.getElementById("expenseList");

  // clear the existing list items
  expenseList.innerHTML = "";

  // each expense fetched & added to the list
  expenses.forEach(function (expense, index) {
    var listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent =
      "Amount: " +
      expense.amount +
      ", Description: " +
      expense.description +
      ", Category: " +
      expense.category;

    // creating the delete button
    var deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm float-end";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteExpense(index);
    };
    listItem.appendChild(deleteButton);

    // creating the edit button
    var editButton = document.createElement("button");
    editButton.className = "btn btn-warning btn-sm me-2 float-end";
    editButton.textContent = "Edit";
    editButton.onclick = function () {
      editExpense(index);
    };
    listItem.appendChild(editButton);

    expenseList.appendChild(listItem);
  });
}

function deleteExpense(index) {
  // Remove 1 element of the array from given index
  expenses.splice(index, 1);

  // Update local storage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Display the updated list
  displayExpenses();
}

function editExpense(index) {
  var selectedExpense = expenses[index];
  document.getElementById("expenseAmount").value = selectedExpense.amount;
  document.getElementById("expenseDescription").value =
    selectedExpense.description;
  document.getElementById("expenseCategory").value = selectedExpense.category;

  // Delete the selected expense from the array
  deleteExpense(index);
}

// Initial display of expenses when the page loads
displayExpenses();
