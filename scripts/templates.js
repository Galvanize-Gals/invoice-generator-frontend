const path = window.location.pathname

const welcome = (id) => {
  return `
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link"> Welcome, User# ${ id}! </a>
      <div class="navbar-dropdown">
        <a href="./manage.html" class="navbar-item">Manage Invoices</a>
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
        <a class="navbar-item" href=${ path !== '/index.html' && path !== '/' && path !== '/signup.html' ? "./dashboard.html" : "./index.html"}>
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
            ${ path === '/' || path === '/index.html' || path === '/signup.html' ? signup : welcome(localStorage.getItem('id'))}
            ${ path === '/' || path === '/index.html' || path === '/signup.html' ? login : logout}
          </div>
        </div>
      </div>
    </nav>
    <!-- start of header template -->
  `
}

const invoiceLine = ({ id, invoice_number, first_name, last_name, total }) => {
  return `<li class="columns readAll" data-id=${id}>
    <div class="column">
      <span class="mdi mdi-receipt mdi-24px has-text-grey-light"></span> #${ invoice_number }
    </div>
    <div class="column is-two-fifths-desktop">
      <span class="mdi mdi-account mdi-24px has-text-grey-light"></span> ${ first_name } ${ last_name }
    </div>
    <div class="column">
      <span class="mdi mdi-cash-multiple mdi-24px has-text-grey-light"></span> ${ total }
    </div>
    <span class="column">
      <a href="./preview.html?id=${ id }" class="button is-link">View</a>
    </span>
  </li>`
}

const preview = ({ id, company, first_name, last_name, email, invoice_number, updated_at, due_date, notes }, lineItems) => {

  return `
      <div class="section invoice column is-two-thirds-desktop is-offset-2-desktop box" data-id=${ id }>
        <span class="invoice-header">
        <div class="vendor has-text-grey-light">
          <!--
            <p class="content">
              Please remit payments to: <br/>
              ${ company !== null ? company : '' } <br/>
              ${ first_name} ${ last_name } <br />
              <a class="has-text-grey-light" href="mailto:${email}?subject=Invoice%20${invoice_number}">${email}</a> -->
            </p>
          </div>

          <div class="billing-details columns">
            <div class="is-three-fifths-desktop client column">
              <h3 class="title is-5 has-text-primary">
                Bill To
              </h3>
              <p class="has-text-grey content">
                ${ company !== null ? company : '' } <br/>
                ${ first_name } ${last_name } <br />
                ${ email }
              </p>
            </div>
            <div class="column">
              <h3 class="title is-5 has-text-primary">
                Invoice&nbsp;<span class="has-text-grey-light"> #${ invoice_number }</span>
              </h3>
              <p class="has-text-primary content">
                Issued:&nbsp;<span class="has-text-grey">${ updated_at.slice(0,10) }</span> <br />
                Due:&nbsp;<span class="has-text-grey">${ due_date.slice(0,10) }</span> <br/>
              </p>
            </div>
          </div>
          <!-- billing header template end -->
        </span>

        <hr>

        <table class="services table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th><span class="has-text-primary">Desc.</span></th>
              <th><span class="has-text-primary">Qty</span></th>
              <th><span class="has-text-primary">Rate/Hours</span></th>
              <th><span class="has-text-primary">Totals</span></th>
            </tr>
          </thead>
          <tfoot>
            <!-- totals template start -->
            <tr class="totals">
              <td></td>
              <td></td>
              <th><span class="has-text-primary">Total</span></th>
              <th><span class="total">
                $${ lineItems.reduce((acc, ele) => acc + ele.subtotal, 0) }
              </span></th>
            </tr>
            <!-- totals template start -->
          </tfoot>
          <tbody class="service-details">
            ${ renderLineItems(id, lineItems) }
          </tbody>
        </table>

        <hr>

        <span class="invoice-footer">
          <p class="notification hidden has-text-success"></p>

          <!-- invoice footer template start -->
          <div class="notes">
            <h3 class="title is-5 has-text-primary">Notes</h3>
            <p class="content">
              ${ notes }
            </p>
          </div>

          <a href="${document.referrer}" class="button send is-link is-medium">Back</a>
          <!-- invoice footer template end -->

        </span>
      </div>`
}

const renderLineItems = (id, lineItems) => lineItems.map(item => renderLineItem(id, item)).join('\n')

const renderLineItem = (id, {description, quantity, rate, subtotal}) => {
  return `
    <tr class="line-item" data-inv="${ id }">
      <td>${ description }</td>
      <td>${ quantity }</td>
      <td>${ rate }</td>
      <td>$${ subtotal }</td>
    </tr>
  `
}

module.exports = { header, invoiceLine, preview }
