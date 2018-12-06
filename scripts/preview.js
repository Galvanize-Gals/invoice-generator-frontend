const { getOneClientInvoice } = require('./requests')
const { preview } = require('./templates')
const { addLogoutListener } = require('./utils')


const init = () => {
  
  const container = document.querySelector('.preview.container')
  const invoice = window.location.search.slice(1)
    .split('&').map(e => e.split('='))
    .reduce((i, e) => ({ ...i, [e[0]]: e[1] }), {})

  getOneClientInvoice(invoice.id)
  .then(response =>  container.innerHTML = preview(response.data.data, response.data.lineItems))
  .catch(error => error)
}

module.exports = { init }
