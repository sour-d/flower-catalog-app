const addComment = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const body = new URLSearchParams(formData).toString();

  const reqOptions = {
    url: '/api/guestbook/comments',
    method: 'POST',
    body: body,
    callback: onload,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  };
  console.log(body);
  eraseFields(form);
  sendRequest(reqOptions);
};

const eraseFields = (form) => {
  form.querySelector('textarea[name="comment"]').value = '';
};

const onload = (res) => {
  if (res.status !== 200) {
    console.log('Request is not successfull.');
  }
  console.log('Sucessful');
}
