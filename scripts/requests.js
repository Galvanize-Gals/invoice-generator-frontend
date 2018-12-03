const axios = require('axios')
const base = 'http://localhost:3000'
const url = `${base}/invoices`

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

const login = (credentials) => axios.post(`${base}/login`, credentials)
const signup = (credentials) => axios.post(`${base}/signup`, credentials)
const getid = () => axios.get(`${base}/login`, attachHeader())

const create = (invoice) => axios.post(url, invoice, attachHeader())
const read = () => axios.get(url, attachHeader())
const readOne = (id) => axios.get(`${url}/${id}`, attachHeader())

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
