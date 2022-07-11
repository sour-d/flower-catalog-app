const showComments = (res) => {
  console.log(res);
};

const fetchComments = () => {
  const intervalId = setInterval(() => {
    const reqOptions = {
      url: '/api/comments',
      method: 'GET',
      body: '',
      callback: showComments
    };
    sendRequest(reqOptions);
  }, 1000);
};

window.onload = fetchComments;