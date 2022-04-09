let updateButton = document.querySelector('#updateButton').addEventListener("click", () => {
  let form = document.querySelector('#form');
  let name = document.querySelector('#name');
  let lastName = document.querySelector('#lastName');
  let number = document.querySelector('#number');
  if (form.checkValidity() == false) {
    event.preventDefault();
    event.stopPropagation();
    name.classList.add('is-invalid');
    lastName.classList.add('is-invalid');
    number.classList.add('is-invalid');
  } else {
    form.classList.add("was-validated");
    form.submit();
  }
})

