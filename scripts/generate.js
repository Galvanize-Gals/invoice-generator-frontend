const { getUserByEmail, createInvoice, createLineItems } = require('./requests')
const { addLogoutListener } = require('./utils')


function init() {

  function calcTotals() {
    const subtotal1 = document.querySelector('.subtotal1')
    const subtotal2 = document.querySelector('.subtotal2')
    const subtotal3 = document.querySelector('.subtotal3')
    const subtotal4 = document.querySelector('.subtotal4')
    const subtotal5 = document.querySelector('.subtotal5')

    const qty1 = document.querySelector('.qty1').value
    const qty2 = document.querySelector('.qty2').value
    const qty3 = document.querySelector('.qty3').value
    const qty4 = document.querySelector('.qty4').value
    const qty5 = document.querySelector('.qty5').value

    const rate1 = document.querySelector('.rate1').value
    const rate2 = document.querySelector('.rate2').value
    const rate3 = document.querySelector('.rate3').value
    const rate4 = document.querySelector('.rate4').value
    const rate5 = document.querySelector('.rate5').value

    const total = document.querySelector('.total')

    subtotal1.textContent = qty1 * rate1
    subtotal2.textContent = qty2 * rate2
    subtotal3.textContent = qty3 * rate3
    subtotal4.textContent = qty4 * rate4
    subtotal5.textContent = qty5 * rate5

    const grandTotal = (parseInt(subtotal1.textContent) + parseInt(subtotal2.textContent) + parseInt(subtotal3.textContent) + parseInt(subtotal4.textContent) + parseInt(subtotal5.textContent))

    total.textContent = '$' + grandTotal
  }

  const qtys = document.querySelectorAll('.qty')

  for (qty of qtys) {
    qty.addEventListener('input', (event) => {
      calcTotals()
    })
  }

  const rates = document.querySelectorAll('.rate')

  for (rate of rates) {
    rate.addEventListener('input', (event) => {
      calcTotals()
    })
  }


  const form = document.querySelector('.generateForm')
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const userEmail = event.target.email.value

    getUserByEmail(userEmail)
      .then(response => {
        const clientId = response.data.data.id

        const newInvoice = {
          'invoice_number': event.target.invoiceNumber.value,
          'due_date': event.target.dueDate.value,
          'notes': event.target.notes.value,
          'clientId': parseInt(clientId)
        }

        return createInvoice(newInvoice)
      })
      .then(response => {
        const invoiceId = response.data.data.id

        const descriptions = Array.from(document.querySelectorAll('.desc'))
          .map(description => description.value)

        const quantities = Array.from(document.querySelectorAll('.qty'))
          .map(quantity => quantity.value)

        const rates = Array.from(document.querySelectorAll('.rate'))
          .map(rate => rate.value)

        const newLineItems = []

        for (i = 0; i < descriptions.length; i++) {
          console.log(descriptions[i]);
          
          if (descriptions[i] && quantities[i] && rates[i]) {

            const lineItem = {
              description: descriptions[i],
              quantity: parseFloat(quantities[i]),
              rate: parseFloat(rates[i]),
              invoice_id: parseInt(invoiceId)
            }
            newLineItems.push(lineItem)

          }
        }
        console.log(newLineItems)
        return createLineItems(invoiceId, newLineItems)
      })
      .then(() => {
        window.location = '/manage.html'
      })
  })

}

module.exports = { init }