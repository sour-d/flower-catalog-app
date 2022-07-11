const addComment = () => {
  const form = document.querySelector('form');
  disableFields(form);

  const formData = new FormData(form);
  const body = new URLSearchParams(formData).toString();
  sendRequest(body);
};

const disableFields = (form) => {
  for (const field of form.elements) {
    field.setAttribute('disabled', 'disabled');
  }
}

const sendRequest = (body, onload = () => { }) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/add-comment');
  xhr.send(body);

  xhr.onload = onload;
};
