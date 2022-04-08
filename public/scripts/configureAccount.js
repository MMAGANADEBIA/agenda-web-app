let updateButton = document.querySelector('#updateButton').addEventListener('click', () => {
  let form = document.querySelector('#formU');
  let name = document.querySelector('#name');
  let password = document.querySelector('#password');
  let newName = document.querySelector('#newName');
  let newPassword = document.querySelector('#newPassword');
  if (form.checkValidity() == false) {
    event.preventDefault();
    event.stopPropagation();
    name.classList.add("is-invalid");
    password.classList.add("is-invalid");
    newName.classList.add("is-invalid");
    newPassword.classList.add("is-invalid");
  } else {
    form.classList.add("was-validated");
    Swal.fire({
      title: 'Actualizar usuario',
      text: '¿Seguro que quieres actualizar el usuario?',
      icon: 'warning',
      confirmButtonText: 'Seguro',
      showCancelButton: 'true',
    }).then((result) => {
      if (result.isConfirmed) {
        form.submit();
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    })
  }
})

let deleteButton = document.querySelector('#deleteButton').addEventListener('click', () => {
  let formD = document.querySelector('#formD');
  let name = document.querySelector('#name');
  let password = document.querySelector('#password');
  if (formD.checkValidity() == false) {
    event.preventDefault();
    event.stopPropagation();
    name.classList.add("is-invalid");
    password.classList.add("is-invalid");
  } else {
    formD.classList.add("was-validated");
    Swal.fire({
      title: 'Eliminar usuario',
      text: '¿Seguro que quieres eliminar el usuario?',
      icon: 'error',
      confirmButtonText: 'Seguro',
      showCancelButton: 'true',
    }).then((result) => {
      if (result.isConfirmed) {
        formD.submit();
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    })
  }
})
