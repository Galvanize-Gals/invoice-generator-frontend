const init = () => {
  const logout = document.querySelector('#logout')
  if (logout) {
    logout.addEventListener('click', (e) => {
      e.preventDefault()
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      window.location = '/index.html'
    })
  }
}

module.exports = { init }
