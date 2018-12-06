const { login, getid } = require('./requests')
const { notify } = require('./utils')

const init = () => {
  document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    const creds = {
      email: e.target.email.value, password: e.target.password.value
    }

    login(creds)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        return getid()
      })
      .then(response => {
        console.log(response)
        localStorage.setItem('id', response.data.id)
        window.location = `/dashboard.html`
      })
      .catch(error => notify('.notification', 'Password does not match!', 2000))
  })
}

module.exports = { init }
