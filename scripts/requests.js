const axios = require('axios')
const base = 'http://localhost:3000'
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
//accounts
const login = (credentials) => axios.post(`${base}/login`, credentials)
const signup = (credentials) => axios.post(`${base}/signup`, credentials)
const getid = () => axios.get(`${base}/login`, attachHeader())

//invoices
const getAllVendorInvoices = () => axios.get(`${url}/vendor`, attachHeader())
const getAllClientInvoices = () => axios.get(`${url}/client`, attachHeader())
const getOneVendorInvoice = (invoiceId) => axios.get(`${url}/${invoiceId}/vendor/`, attachHeader())
const getOneClientInvoice = (invoiceId) => axios.get(`${url}/${invoiceId}/client`, attachHeader())
const createInvoice = (invoice) => axios.post(`${url}/vendor`, invoice, attachHeader())
const updateInvoice = (invoiceId, invoice) => axios.put(`${url}/${invoiceId}/vendor/`, invoice, attachHeader())
const removeInvoice = (invoiceId) => axios.delete(`${url}/${invoiceId}/vendor`, attachHeader())

const createLineItems = (invoiceId, lineItems) => axios.post(`${url}/${invoiceId}/vendor/line_items`, lineItems, attachHeader())

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
  createInvoice,
  getAllVendorInvoices,
  getAllClientInvoices,
  getOneVendorInvoice,
  getOneClientInvoice,
  updateInvoice,
  removeInvoice,
  createLineItems
}
