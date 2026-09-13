let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {

    const name = document.getElementById("expenseName").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (name === "" || amount === "" || category === "" || date === "") {
        alert("Please fill all fields");
        return;
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: Number(amount),
        category: category,
        date: date
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expenseName").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";

    displayExpenses();
}

function displayExpenses() {

    const list = document.getElementById("expenseList");
    const filter = document.getElementById("filter").value;

    list.innerHTML = "";

    let filteredExpenses = expenses;

    if (filter !== "All") {
        filteredExpenses = expenses.filter(
            expense => expense.category === filter
        );
    }

    filteredExpenses.forEach(expense => {

        const div = document.createElement("div");

        div.className = "expense";

        div.innerHTML = `
            <h3>${expense.name}</h3>
            <p>💰 Amount: ₹${expense.amount}</p>
            <p>📂 Category: ${expense.category}</p>
            <p>📅 Date: ${expense.date}</p>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">
                Delete
            </button>
        `;

        list.appendChild(div);
    });

    calculateTotal(filteredExpenses);
}

function calculateTotal(data) {

    let total = 0;

    data.forEach(expense => {
        total += expense.amount;
    });

    document.getElementById("total").innerText = "₹" + total;
}

function deleteExpense(id) {

    expenses = expenses.filter(expense => expense.id !== id);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}

displayExpenses();