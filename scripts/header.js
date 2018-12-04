const responsiveHeader  = () => {
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

module.exports = { responsiveHeader }
