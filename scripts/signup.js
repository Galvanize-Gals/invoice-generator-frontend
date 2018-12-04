const { signup } = require('./requests')

function init() {

  const form = document.querySelector('.signupForm')
  
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const fname = document.querySelector('.fname_signup')
    const lname = document.querySelector('.lname_signup')
    const company = document.querySelector('.company_signup')
    const email = document.querySelector('.email_signup')
    const password = document.querySelector('.password_signup')
  
    const newUser = {
      'first_name': fname.value,
      'last_name': lname.value,
      'company': company.value,
      'email': email.value,
      'password': password.value 
    }
    
    console.log(newUser)
    signup(newUser)

  })

}

module.exports = { init }