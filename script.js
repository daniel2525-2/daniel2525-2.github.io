// script.js
document.addEventListener("DOMContentLoaded", () => {
    const startDayBtn = document.getElementById("start-day-btn");
    const startAmountInput = document.getElementById("start-amount");
    const currentBalance = document.getElementById("current-balance");
    const safeBox = document.getElementById("safe-box");
    const emoji = document.getElementById("emoji");
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalExpenses = document.getElementById("total-expenses");
    const closeDayBtn = document.getElementById("close-day-btn");
    const calendarSection = document.getElementById("calendar-section");
    const calendarPopup = document.getElementById("calendar-popup");
    const calendarIcon = document.getElementById("calendar-icon");
    const addSaleBtn = document.getElementById("add-sale-btn");

    let balance = 0;
    let total = 0;
    let startOfDayAmount = 0;

    // Cambiar el estado de ánimo y color del círculo
    const updateState = () => {
        if (balance < 500) {
            emoji.textContent = "😢";
            safeBox.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        } else if (balance <= 1000) {
            emoji.textContent = "😐";
            safeBox.style.backgroundColor = "rgba(255, 255, 0, 0.2)";
        } else {
            emoji.textContent = "😄";
            safeBox.style.backgroundColor = "rgba(0, 0, 255, 0.2)";
        }
        safeBox.classList.add("animate");
        setTimeout(() => safeBox.classList.remove("animate"), 300);
    };

    // Iniciar el día
    startDayBtn.addEventListener("click", () => {
        const startAmount = parseFloat(startAmountInput.value);

        if (startAmount > 0) {
            balance = startAmount;
            startOfDayAmount = startAmount; // Guardamos la cantidad con la que se empieza el día
            currentBalance.textContent = balance.toFixed(2);
            updateState();
            startAmountInput.value = "";
            startDayBtn.style.display = "none";
            startAmountInput.style.display = "none";
            expenseForm.style.display = "flex";
            closeDayBtn.style.display = "block";
        } else {
            alert("Por favor, ingresa una cantidad válida.");
        }
    });

    // Agregar gasto
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);

        if (name && amount > 0 && amount <= balance) {
            const li = document.createElement("li");
            li.innerHTML = `${name} - $${amount.toFixed(2)} 
                <button class="delete-btn">Eliminar</button>`;

            li.querySelector(".delete-btn").addEventListener("click", () => {
                total -= amount;
                balance += amount;
                totalExpenses.textContent = total.toFixed(2);
                currentBalance.textContent = balance.toFixed(2);
                li.remove();
                updateState();
            });

            expenseList.appendChild(li);
            total += amount;
            balance -= amount;
            totalExpenses.textContent = total.toFixed(2);
            currentBalance.textContent = balance.toFixed(2);
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
            updateState();
        } else {
            alert("Por favor, ingresa un gasto válido.");
        }
    });

    // Agregar venta
    addSaleBtn.addEventListener("click", () => {
        const amount = parseFloat(expenseAmountInput.value);

        if (amount > 0) {
            balance += amount;
            currentBalance.textContent = balance.toFixed(2);
            expenseAmountInput.value = "";
            updateState();
        } else {
            alert("Por favor, ingresa una cantidad válida.");
        }
    });

    // Cerrar el día
    closeDayBtn.addEventListener("click", () => {
        const name = prompt("¿Quién está cerrando el día?");
        if (name) {
            const endOfDayAmount = balance;
            const endOfDayDate = new Date().toLocaleDateString();

            // Mostrar el calendario con la información del día
            document.getElementById("calendar-date").textContent = endOfDayDate;
            document.getElementById("start-of-day-amount").textContent = startOfDayAmount.toFixed(2);
            document.getElementById("end-of-day-amount").textContent = endOfDayAmount.toFixed(2);
            calendarSection.style.display = "block";
            closeDayBtn.style.display = "none";

            // Regresar al estado inicial
            balance = 0;
            total = 0;
            currentBalance.textContent = balance.toFixed(2);
            totalExpenses.textContent = total.toFixed(2);
            expenseForm.style.display = "none";
            startDayBtn.style.display = "block";
            startAmountInput.style.display = "block";
        }
    });

    // Mostrar y ocultar el calendario al hacer clic en el icono de calendario
    calendarIcon.addEventListener("click", () => {
        calendarPopup.style.display = calendarPopup.style.display === "block" ? "none" : "block";
    });
});