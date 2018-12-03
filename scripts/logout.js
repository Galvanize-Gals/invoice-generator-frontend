const init = () => {
  document.querySelector('.logout').addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    window.location = '/index.html'
  })
}

module.exports = { init }
