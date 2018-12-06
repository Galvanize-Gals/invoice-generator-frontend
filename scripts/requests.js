const axios = require('axios')
const base = 'https://invoice-creator-gg.herokuapp.com'
// const base = 'http://localhost:3000'
const userId = localStorage.getItem('id')
const url = `${base}/users/${userId}/invoices`

const attachHeader = () => {
  let bearer = ''
  const token = localStorage.getItem('token')
  if (token) bearer = `Bearer ${token}`

  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearer
    }
  }
}

// const request = {
//   base: function(){
//     if(window.location.hostname.includes('127.0.0.1')){
//       return 'http://localhost:3000/'
//     }
//     else {
//       return 'heroku'
//     }
//   }
//   // get: (url) =>
//   post: (url) => axios.get(`${this.base()}${url}`, attachHeader() )
// }

// request.post('/user?email=')

//accounts
const login = (credentials) => axios.post(`${base}/login`, credentials)
const signup = (credentials) => axios.post(`${base}/users`, credentials)
const getid = () => axios.get(`${base}/login`, attachHeader())
const getUserByEmail = (email) => axios.get(`${base}/users?email=${email}` )
const getOneUser = (userId) => axios.get(`${base}/users/${userId}`)

//invoices
const getAllVendorInvoices = () => axios.get(`${url}/vendor`, attachHeader())
const getAllClientInvoices = () => axios.get(`${url}/client`, attachHeader())
const getOneVendorInvoice = (invoiceId) => axios.get(`${url}/${invoiceId}/vendor/`, attachHeader())
const getOneClientInvoice = (invoiceId) => axios.get(`${url}/${invoiceId}/client`, attachHeader())
const createInvoice = (invoice) => axios.post(`${url}/vendor`, invoice, attachHeader())
const updateInvoice = (invoiceId, invoice) => axios.put(`${url}/${invoiceId}/vendor/`, invoice, attachHeader())
const removeInvoice = (invoiceId) => axios.delete(`${url}/${invoiceId}/vendor`, attachHeader())

const createLineItems = (invoiceId, lineItems) => axios.post(`${url}/${invoiceId}/vendor/line_items`, {items: lineItems}, attachHeader())
const togglePaid = (invoiceId) => axios.put(`${url}/${invoiceId}/vendor`, {}, attachHeader())

// getAllVendorInvoices localhost:3000/users/:userId/invoices/vendor/
// getAllClientInvoices localhost:3000/users/:userId/invoices/client/
// getOneVendorInvoice(w. lineitems) localhost:3000/users/:userId/invoices/:invoiceId/vendor
// getOneClientInvoice(w. lineitems) localhost:3000/users/:userId/invoices/:invoiceId/client
// createInvoice localhost:3000/users/:userId/invoices/vendor/
// updateInvoice localhost:3000/users/:userId/invoices/:invoiceId/vendor
// removeInvoicelocalhost:3000/users/:userId/invoices/:invoiceId/vendor
// createLineItem localhost:3000/users/:userId/invoices/:invoiceId/vendor/line_items

module.exports = {
  login,
  signup,
  getid,
  getUserByEmail,
  getOneUser,
  getAllVendorInvoices,
  getAllClientInvoices,
  getOneVendorInvoice,
  getOneClientInvoice,
  createInvoice,
  updateInvoice,
  removeInvoice,
  createLineItems,
  togglePaid
}
