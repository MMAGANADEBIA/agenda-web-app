let createAccount = document.querySelector('#createAccount').addEventListener('click', () => {
  let form = document.querySelector('#form');
  let name = document.querySelector('#name');
  let password = document.querySelector('#password');
  if (form.checkValidity() == false) {
    event.preventDefault();
    event.stopPropagation();
    name.classList.add("is-invalid");
    password.classList.add("is-invalid");
  } else {
    form.classList.add("was-validated");
    form.submit();
  }
})
