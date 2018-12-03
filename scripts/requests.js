const axios = require('axios')
const url = 'http://localhost:3000/invoices'

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

const login = (credentials) => axios.post(`${url}/login`, credentials)
const signup = (credentials) => axios.post(`${url}/signup`, credentials)
const getid = () => axios.get(`${url}/login`, attachHeader())

const create = (invoice) => axios.post(url, invoice, attachHeader())
const read = () => axios.get(url, attachHeader())
const readOne = (id) => axios.get(`${url}/${invoiceId}`, attachHeader())

const edit = (id, invoice) => axios.put(`${url}/${id}`, invoice, attachHeader())
const remove = (id) => axios.delete(`${url}/${id}`, attachHeader())

module.exports = {
  login,
  getid,
  signup,
  create,
  read,
  readOne,
  edit,
  remove
}
