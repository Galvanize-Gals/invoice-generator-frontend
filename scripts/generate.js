const { getUserByEmail, createInvoice, createLineItems } = require('./requests')

function init() {
  const form = document.querySelector('.generateForm')
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const userEmail = event.target.email.value
    
    getUserByEmail(userEmail)
    .then( response => {
      const clientId = response.data.data.id
      
      const newInvoice = {
        'invoice_number': event.target.invoiceNumber.value,
        'due_date': event.target.dueDate.value,
        'notes': event.target.notes.value,
        'clientId': parseInt(clientId)
      }
      
      return createInvoice(newInvoice)
    })
    .then( response => {
      const invoiceId = response.data.data.id

      const descriptions = Array.from(document.querySelectorAll('.desc'))
      .map(description => description.value)
      
      const quantities = Array.from(document.querySelectorAll('.qty'))
      .map(quantity => quantity.value)
      
      const rates = Array.from(document.querySelectorAll('.rate'))
      .map(rate => rate.value)
      
      const newLineItems = []

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