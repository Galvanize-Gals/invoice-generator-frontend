const { getAllClientInvoices } = require('./requests')
const { vendorInvoiceLine } = require('./templates')
const { togglePaid } = require('./requests')

function init() {
    const invoiceList = document.querySelector('.invoice-list')
    getAllClientInvoices()
        .then((res) => {
            const invoiceItem = res.data.data.map(a => vendorInvoiceLine(a))
            invoiceList.innerHTML = ''
            invoiceList.innerHTML = invoiceItem.join('\n')

        })
    const addOutstandingEventListeners = () => {
        const outstandingArray = document.querySelectorAll('.outstanding')
        for (ele of outstandingArray) {
            ele.addEventListener('click', (e) => {
                togglePaid(e.target.getAttribute(`data-id`))
                //reRender page ()
                addOutstandingEventListeners()

            })
        }
    }

    const addPaidEventListeners = () => {
        const paidArray = document.querySelectorAll('.paid')
        for (ele of paidArray) {
            ele.addEventListener('click', (e) => {
                togglePaid()
                //reRender page ()
                addPaidEventListeners()

            })
        }
    }

    addOutstandingEventListeners()
    addPaidEventListeners()
}

module.exports = { init }