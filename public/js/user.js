const fillUserName = (res) => {
  const userDetails = JSON.parse(res.response);
  const nameField = document.getElementById('name');
  nameField.value = userDetails.name;
  nameField.setAttribute('readonly', 'readonly');
};

const getUserDetails = () => {
  const reqOptions = {
    url: '/api/user',
    method: 'POST',
    callback: fillUserName
  };

  sendRequest(reqOptions);
};