const { getAllVendorInvoices } = require('./requests')
const { vendorInvoiceLine } = require('./templates')
const { togglePaid } = require('./requests')

function init() {
    render()
   
  
}

function render() {
    const outstandingInvoiceList = document.querySelector('.outstanding')
    getAllVendorInvoices()
        .then((res) => {
            const invoiceItem = res.data.data.map((a) => {
                if (a.is_paid === false) { return vendorInvoiceLine(a) }
                else { }
            })
            outstandingInvoiceList.innerHTML = ''
            outstandingInvoiceList.innerHTML = invoiceItem.join('\n')
            addOutstandingEventListeners()
        })
       

    const paidInvoiceList = document.querySelector('.paid')
    getAllVendorInvoices()
        .then((res) => {
            const invoiceItem = res.data.data.map((a) => {
                if (a.is_paid === true) { return vendorInvoiceLine(a) }
            })
            paidInvoiceList.innerHTML = ''
            paidInvoiceList.innerHTML = invoiceItem.join('\n')
            addPaidEventListeners()
        })
      
}



    const addOutstandingEventListeners = () => {
        const outstandingArray = document.querySelectorAll('.outstanding_invoice')
        for (ele of outstandingArray) {
            ele.addEventListener('click', (e) => {
                togglePaid(e.target.getAttribute(`data-id`))
                .then(()=>{
                    render()
                })
               
            })
        }
    }

    const addPaidEventListeners = () => {
        const paidArray = document.querySelectorAll('.paid_invoice')
        for (ele of paidArray) {
            ele.addEventListener('click', (e) => {
                togglePaid(e.target.getAttribute(`data-id`))
                .then(()=>{
                    render()
                })
            })
        }
    }

    

module.exports = { init }