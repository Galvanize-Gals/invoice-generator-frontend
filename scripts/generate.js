const { item } = require('./templates')
const { create, createLineItems } = require('./requests')

function init() {

  const tbody = document.querySelector('tbody')
  const addButton = document.querySelector('.add-item')
  const form = document.querySelector('.generateForm')

  addButton.addEventListener('click', () =>  tbody.innerHTML += item())

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const newInvoice = {
      'invoice_number': event.target.invoiceNumber.value,
      'due_date': event.target.dueDate.value,
      'notes': event.target.notes.value
    }

    const newLineItems = []

    const descriptions = Array.from(document.querySelectorAll('.desc'))
      .map(description => description.value)

    const quantities = Array.from(document.querySelectorAll('.qty'))
      .map(quantity => quantity.value)

    const rates = Array.from(document.querySelectorAll('.rate'))
      .map(rate => rate.value)

    console.log(descriptions);
    console.log(quantities);
    console.log(rates);


    create(newInvoice)
      .then((response) => {

        const invoiceId = response.data.data.id

        for (i = 0; i < descriptions.length; i++) {
          const lineItem = {
            description: descriptions[i],
            quantity: quantities[i],
            rate: rates[i],
            invoice_id: invoiceId
          }
          newLineItems.push(lineItem)
        }

        createLineItems(invoiceId, newLineItems)

      })
  })
}

module.exports = { init }
