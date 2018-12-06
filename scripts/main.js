require('./header').init()

const { header } = require('./templates')
document.querySelector('header.navbar').innerHTML = header()
const path = window.location.pathname

const initialize = {
  '/': require('./login').init,
  '/index.html': require('./login').init,
  '/signup.html': require('./signup').init,
  '/generate.html': require('./generate').init,
  '/received.html': require('./received').init,
  '/manage.html' : require('./manage').init
}

const logout = document.querySelector('#logout')
if (logout) {
  logout.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    window.location = '/index.html'
  })
}

if (initialize.hasOwnProperty(path)) initialize[path]()
else console.error(`${path} can't initialize`)

