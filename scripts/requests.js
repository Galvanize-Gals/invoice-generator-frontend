const axios = require('axios')
const base = 'http://localhost:3000'
const url = `${base}/user`

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
const getUserByEmail = (email) => axios.get(`${base}/user`, {email}, attachHeader() )

//invoices
const create = (userId, invoice) => axios.post(`${url}/${userId}/invoices/vendor`, invoice, attachHeader())
const readVendorInvoices = (userId) => axios.get(`${url}/${userId}/invoices/vendor`, attachHeader())
const readClientInvoices = (userId) => axios.get(`${url}/${userId}/invoices/client`, attachHeader())
const readOne = (userId, invoiceId) => axios.get(`${url}/${userId}/invoices/${invoiceId}`, attachHeader())
const edit = (userId, invoiceId, invoice) => axios.put(`${url}/${userId}/invoices/${invoiceId}`, invoice, attachHeader())
const remove = (userId, invoiceId) => axios.delete(`${url}/${userId}/invoices/${invoiceId}`, attachHeader())

//line items
const createLineItems = (userId, invoiceId, lineItems) => axios.post(`${url}/${userId}/invoices/${invoiceId}/vendor/line_items`, {items: lineItems}, attachHeader())

module.exports = {
  login,
  getid,
  signup,
  getUserByEmail,
  create,
  readVendorInvoices,
  readClientInvoices,
  readOne,
  edit,
  remove,
  createLineItems
}
