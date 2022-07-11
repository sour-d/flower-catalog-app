const addComment = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const body = new URLSearchParams(formData).toString();

  const reqOptions = {
    url: '/add-comment',
    method: 'POST',
    body: body,
    callback: onload
  };
  disableFields(form);
  sendRequest(reqOptions);
};

const disableFields = (form) => {
  for (const field of form.elements) {
    field.setAttribute('disabled', 'disabled');
  }
};

const sendRequest = (reqOptions) => {
  const xhr = new XMLHttpRequest();
  xhr.open(reqOptions.method, reqOptions.url);
  xhr.send(reqOptions.body);

  xhr.onload = () => reqOptions.callback(xhr);
};

const onload = (res) => {
  console.log(res);
  if (res.status !== 200) {
    console.log('Request is not successfull.');
  }
  console.log('Sucessful');
}
