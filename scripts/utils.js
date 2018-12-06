const notify = (container, message, time) => {
  const notice = document.querySelector(container)
  notice.innerHTML = message
  notice.classList.remove('hidden')
  setTimeout(() => { notice.classList.add('hidden') }, time)
}

const addLogoutListener = () => {
  
  const logout = document.querySelector('#logout')

    logout.addEventListener('click', (e) => {
      e.preventDefault()
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      window.location = '/index.html'
    })

}

module.exports = { notify, addLogoutListener }
