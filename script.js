const form = document.getElementById('add-form')
const description = document.getElementById('description')
const amount = document.getElementById('amount')
const type = document.getElementById('type')
const transactionList = document.getElementById('transactions-ul')
const balanceEl = document.getElementById('balance')
const spendingsEl = document.getElementById('spendings')
const earningsEl = document.getElementById('earnings')
let transactions = [];

updateTransactions()

form.addEventListener("submit", function (e) {
    e.preventDefault()
    const today = new Date().toLocaleDateString()
    const transaction = {
        id: Date.now(),
        description: description.value,
        amount: amount.value,
        type: type.value,
        date: today
    }
    transactions.push(transaction)
    addTransactionToList(transaction)
    updateTransactions()
    form.reset();
})

transactionList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-button')) {
        const li = e.target.closest('.list-item')
        const id = Number(li.dataset.id)
        li.remove()

        transactions = transactions.filter((transaction) => transaction.id != id)
        updateTransactions()
    }
})

function updateTransactions() {
    var spendings = 0
    var earnings = 0

    for (const transaction of transactions) {
        if (transaction.type == 'spending') {
            spendings += Number(transaction.amount)

        }
        else {
            earnings += Number(transaction.amount)
        }
    }

    var balance = Number(earnings) - Number(spendings);
    balanceEl.innerHTML = `$${balance}`
    spendingsEl.innerText = `$${spendings}`
    earningsEl.innerText = `$${earnings}`

}

function addTransactionToList(transaction) {
    const li = document.createElement('li')
    li.dataset.id = transaction.id
    li.className = 'list-item'
    li.innerHTML = `<div class="list-icon">
                    </div>
                    <div class="list-description">
                       <div class ="list-label">${transaction.description}</div> 
                       <div class = "list-date">${transaction.date}</div>
                    </div>
                    <div class="list-amount">
                        ${transaction.amount}
                    </div>
                    <button class="delete-button">X</button>`
    transactionList.appendChild(li)
}