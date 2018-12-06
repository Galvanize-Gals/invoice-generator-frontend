
const { header } = require('./templates')
const { getOneUser } = require('./requests')
const { addLogoutListener, headerJS } = require('./utils')

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
document.querySelector('header.navbar').innerHTML = header()

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
if (isMobile) headerJS()

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
