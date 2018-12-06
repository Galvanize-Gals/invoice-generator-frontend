const notify = (container, message, time) => {
  const notice = document.querySelector(container)
  notice.innerHTML = message
  notice.classList.remove('hidden')
  setTimeout(() => { notice.classList.add('hidden') }, time)
}

module.exports = { notify }
