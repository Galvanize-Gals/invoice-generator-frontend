
const { header } = require('./templates')
const { getOneUser } = require('./requests')
const { addLogoutListener } = require('./utils')

const userId = localStorage.getItem('id')

if(userId) {
  getOneUser(localStorage.getItem('id'))
  .then( (response) => {
    userName = response.data.data[0].first_name
    document.querySelector('header.navbar').innerHTML = header(userName)
    addLogoutListener()
  })
}

const path = window.location.pathname
const navigation = document.querySelector('header.navbar').innerHTML = header()
const nav = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

if (navigation) {
  if (nav.length > 0) {
    nav.forEach(el => {
      el.addEventListener('click', () => {

        const target = el.dataset.target;
        const $target = document.getElementById(target)

        el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
}

const initialize = {
  '/': require('./login').init,
  '/index.html': require('./login').init,
  '/signup.html': require('./signup').init,
  '/generate.html': require('./generate').init,
  '/received.html': require('./received').init,
  '/vendor-preview.html': require('./vendorPreview').init,
  '/preview.html': require('./preview').init,
  '/manage.html' : require('./manage').init
}

if (initialize.hasOwnProperty(path)) initialize[path]()
else console.error(`${path} can't initialize`)

module.exports = { addLogoutListener }
