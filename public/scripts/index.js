console.log("Hola");

let loginButton = document.querySelector('#loginButton').addEventListener('click', () => {
  let form = document.querySelector('#form');
  if (form.checkValidity() == false) {
    event.preventDefault();
    event.stopPropagation();
  }
})
