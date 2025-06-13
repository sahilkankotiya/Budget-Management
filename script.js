window.onload = () => {
    renderData();
};

// Add income
document.querySelector(".incomeform").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("incomeTitle").value.trim();
    const amount = parseFloat(document.getElementById("incomeAmount").value);

    if (!title || isNaN(amount) || amount <= 0) {
        return alert("Kindly Enter Valid Income Details");
    }

    const income = { id: Date.now(), title, amount };
    const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    incomes.push(income);
    localStorage.setItem("incomes", JSON.stringify(incomes));
    this.reset();
    renderData();
});

// Add expense
document.getElementById("expenseForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("expenseTitle").value.trim();
    const amount = parseFloat(document.getElementById("expenseAmount").value);

    if (!title || isNaN(amount) || amount <= 0) {
        return alert("Please Enter Valid Expense Details");
    }

    const expense = { id: Date.now(), title, amount };
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    this.reset();
    renderData();
});

// Delete income or expense
function deleteItem(id, type) {
    let data = JSON.parse(localStorage.getItem(type)) || [];
    data = data.filter(item => item.id !== id);
    localStorage.setItem(type, JSON.stringify(data));
    renderData();
}

// Render data to UI
function renderData() {
    const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const incomeList = document.getElementById("incomelist");
    const expenseList = document.getElementById("expenseList");

    incomeList.innerHTML = "";
    expenseList.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    incomes.forEach(item => {
        totalIncome += item.amount;
        const li = document.createElement("li");
        li.innerHTML = `${item.title}: ₹${item.amount}
            <button onclick="deleteItem(${item.id}, 'incomes')">❌</button>`;
        incomeList.appendChild(li);
    });

    expenses.forEach(item => {
        totalExpense += item.amount;
        const li = document.createElement("li");
        li.innerHTML = `${item.title}: ₹${item.amount}
            <button onclick="deleteItem(${item.id}, 'expenses')">❌</button>`;
        expenseList.appendChild(li);
    });

    document.getElementById("totalExpense").innerText = `₹${totalExpense}`;
    document.getElementById("balance").innerText = `₹${totalIncome - totalExpense}`;
    document.getElementById("totalIncome").innerText = `₹${totalIncome}`;
}