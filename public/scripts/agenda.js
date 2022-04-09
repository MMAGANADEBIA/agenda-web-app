let addContact = document.querySelector('#addContact').addEventListener('click', () => {
  let form = document.querySelector('#form');
  let name = document.querySelector('#name');
  let lastName = document.querySelector('#lastName');
  let number = document.querySelector('#number');
  if (form.checkValidity() == false) {
    event.preventDefault();
    event.stopPropagation();
    name.classList.add("is-invalid");
    lastName.classList.add("is-invalid");
    number.classList.add("is-invalid");
  } else {
    form.classList.add("was-validated");
    form.submit();
  }
});

// let delete1 = document.querySelector('#delete1').addEventListener('click', () => {
//   console.log("hola");
//   let deleteForm = document.querySelector('#deleteForm');
//   Swal.fire({
//     title: 'Eliminar contacto',
//     text: '¿Seguro que quieres eliminar el contacto?',
//     icon: 'error',
//     confirmButtonText: 'Seguro',
//     showCancelButton: 'true',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       deleteForm.submit();
//     } else {
//       event.preventDefault();
//       event.stopPropagation();
//     }
//   })
// })


