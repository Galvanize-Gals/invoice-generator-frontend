require('./header').init()
// require('./logout').init()
const path = window.location.pathname

const initialize = {
  '/': require('./login').init,
  '/index.html': require('./login').init,
  '/signup.html': require('./signup').init
}

if (initialize.hasOwnProperty(path)) initialize[path]()
else console.error(`${path} can't initialize`)
