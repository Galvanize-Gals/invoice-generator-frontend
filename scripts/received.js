const { getAllClientInvoices } = require('./requests')
const { invoiceLine } = require('./templates')
const { addLogoutListener } = require('./utils')


function init(){

    const outstandingInvoiceList = document.querySelector('.outstanding')
    getAllClientInvoices()
        .then((res) => {
            const invoiceItem = res.data.data.map((a) => {
                if(a.is_paid === false) { return invoiceLine(a) }
                else{}
            })
            outstandingInvoiceList.innerHTML = ''
            outstandingInvoiceList.innerHTML = invoiceItem.join('\n')
        })

    const paidInvoiceList = document.querySelector('.paid')
    getAllClientInvoices()
        .then((res) => {
            console.log(res.data.data)
            const invoiceItem = res.data.data.map((a) => {
                if(a.is_paid === true) { return invoiceLine(a) }
            })
            paidInvoiceList.innerHTML = ''
            paidInvoiceList.innerHTML = invoiceItem.join('\n')
        })
}

module.exports = { init }
