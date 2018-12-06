const { header } = require('./templates')
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
