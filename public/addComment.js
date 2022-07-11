const addComment = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const body = new URLSearchParams(formData).toString();

  disableFields(form);
  sendRequest(body, onload);
};

const disableFields = (form) => {
  for (const field of form.elements) {
    field.setAttribute('disabled', 'disabled');
  }
};

const sendRequest = (body, onload = () => { }) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/add-comment');
  xhr.send(body);

  xhr.onload = () => onload(xhr);
};

const onload = (res) => {
  console.log(res);
  if (res.status !== 200) {
    console.log('Request is not successfull.');
  }
  console.log('Sucessful');
}
