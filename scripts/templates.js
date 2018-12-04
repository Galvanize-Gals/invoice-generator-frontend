const path = window.location.pathname

const welcome = (id) => {
  return `
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link"> Welcome, User# ${ id }! </a>
      <div class="navbar-dropdown">
        <a href="./manage.html" class="navbar-item">Your Invoices</a>
        <a href="./received.html" class="navbar-item">Received Invoices</a>
      </div>
    </div>`
}

const header = () => {
  let login = `<a href="./index.html" class="button is-light">Login</a>`
  let logout = `<a href="./index.html" id="logout" class="button is-light">Logout</a>`
  let signup = `<a href="./signup.html" class="button is-primary"><strong>Signup</strong></a>`

  return `
    <!-- start of header template -->
    <nav class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href=${ path !== '/index.html' && path !== '/' && path !== '/signup.html' ? "./dashboard.html" : "./index.html" }>
          <span class="mdi mdi-library mdi-24px has-text-link"> InvoiceCreator</span>
        </a>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarItems">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarItems" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            ${ path === '/' || path === '/index.html' || path === '/signup.html' ? signup : welcome(localStorage.getItem('id')) }
            ${ path === '/' || path === '/index.html' || path === '/signup.html' ? login : logout }
          </div>
        </div>
      </div>
    </nav>
    <!-- start of header template -->
  `
}

const item = () => {
  return `
    <tr class="line-item">
      <td>
        <div class="field">
          <input class="desc input" type="text" placeholder="example: Custom Login Page" required>
        </div>
      </td>
      <td>
        <div class="field">
          <input class="qty input" type="number" placeholder="1" required>
        </div>
      </td>
      <td>
        <div class="field">
          <input class="rate input" type="number" placeholder="45" required>
        </div>
      </td>
      <td>0.00</td>
      <td>
        <div class="button mdi mdi-plus"></div>
      </td>
    </tr>
  `
}

module.exports = { header, item }
