const notify = (container, message, time) => {
  const notice = document.querySelector(container)
  notice.innerHTML = message
  notice.classList.remove('hidden')
  setTimeout(() => { notice.classList.add('hidden') }, time)
}

const headerJS = () => {
  const nav = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
  if (nav.length > 0) {
    nav.forEach(el => {
      el.addEventListener('click', () => {

        const target = el.dataset.target;
        const $target = document.getElementById(target)

        el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
}

const addLogoutListener = () => {

  const logout = document.querySelector('#logout')

  if(logout) {

    logout.addEventListener('click', (e) => {
      e.preventDefault()
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      window.location = '/index.html'
    })
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) headerJS()

}

module.exports = { notify, addLogoutListener, headerJS }
