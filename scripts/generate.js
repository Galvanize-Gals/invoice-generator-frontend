const templates = require('./templates')

const lineItem = () => {
  const add = document.querySelector('.add-item')
  const service = document.querySelector('tbody')

  add.addEventListener('click', (e) => {
    let i = templates.item()
    console.log(i);
  })
}

const init = () => {
  lineItem()
}
module.exports = { init }
