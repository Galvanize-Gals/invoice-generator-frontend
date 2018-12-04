require('./header').init()

const { header } = require('./templates')
document.querySelector('header.navbar').innerHTML = header()
const path = window.location.pathname

const initialize = {
  '/': require('./login').init,
  '/index.html': require('./login').init,
  '/signup.html': require('./signup').init,
  '/dashboard.html': require('./logout').init,
  '/generate.html': require('./logout').init,
  '/invoice.html': require('./logout').init,
  '/manage.html': require('./logout').init,
  '/received.html': require('./logout').init
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
