const lineItem = () => {
  const add = document.querySelectorAll('.add-item')
  console.log(add)

  add.forEach(a => {
    a.addEventListener('click', (e) => {
      console.log('test')
    })
  })
}

const init = () => {
  lineItem()
}
module.exports = { init }
