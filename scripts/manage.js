const { getAllClientInvoices } = require('./requests')
const { invoiceLine } = require('./templates')

function init(){
    const invoiceList = document.querySelector('.invoice-list')
    getAllClientInvoices()
        .then((res) => {
            const invoiceItem = res.data.data.map(a => invoiceLine(a) )
            invoiceList.innerHTML = ''
            invoiceList.innerHTML = invoiceItem.join('\n')
        })
}

module.exports = {init}