const { responsiveHeader } = require('./header')
const { header } = require('./templates')
const path = window.location.pathname

document.querySelector('header.navbar').innerHTML = header()
responsiveHeader()

const initialize = {
  '/': require('./login').init,
  '/index.html': require('./login').init,
  '/signup.html': require('./signup').init,
  '/generate.html': require('./generate').init
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
