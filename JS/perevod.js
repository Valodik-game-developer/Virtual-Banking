let balance = 1000;

function sendMoney() {

    const amount = Number(
        document.getElementById("amount").value
    );

    if (amount <= 0) {
        document.getElementById("message").textContent =
            "Введите правильную сумму!";
        return;
    }

    if (amount > balance) {
        document.getElementById("message").textContent =
            "Недостаточно денег!";
        return;
    }

    balance -= amount;

    document.getElementById("balance").textContent = balance;

    document.getElementById("message").textContent =
        "Перевод выполнен!";
}