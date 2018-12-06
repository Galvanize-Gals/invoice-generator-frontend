const { getAllVendorInvoices } = require('./requests')
const { vendorInvoiceLine } = require('./templates')
const { togglePaid } = require('./requests')

function init() {
    const outstandingInvoiceList = document.querySelector('.outstanding')
    getAllVendorInvoices()
        .then((res) => {
            const invoiceItem = res.data.data.map((a) => {
                if (a.is_paid === false) { return vendorInvoiceLine(a) }
                else { }
            })
            outstandingInvoiceList.innerHTML = ''
            outstandingInvoiceList.innerHTML = invoiceItem.join('\n')
        })

    const paidInvoiceList = document.querySelector('.paid')
    getAllVendorInvoices()
        .then((res) => {
            const invoiceItem = res.data.data.map((a) => {
                if (a.is_paid === true) { return vendorInvoiceLine(a) }
            })
            paidInvoiceList.innerHTML = ''
            paidInvoiceList.innerHTML = invoiceItem.join('\n')
        })

    const addOutstandingEventListeners = () => {
        const outstandingArray = document.querySelectorAll('.outstanding')
        for (ele of outstandingArray) {
            ele.addEventListener('click', (e) => {
                togglePaid(e.target.getAttribute(`data-id`))
                location.reload()

            })
        }
    }

    const addPaidEventListeners = () => {
        const paidArray = document.querySelectorAll('.paid')
        for (ele of paidArray) {
            ele.addEventListener('click', (e) => {
                togglePaid(e.target.getAttribute(`data-id`))
                location.reload()

            })
        }
    }

    addOutstandingEventListeners()
    addPaidEventListeners()
}

module.exports = { init }