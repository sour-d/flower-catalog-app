const toTableDataTag = (content) => {
  return `<td>${content}</td>`;
};

const toTableRowTag = (tableRowId, ...tableDatas) => {
  const tdTags = tableDatas.map(toTableDataTag).join('');
  const trTag = document.createElement('tr');
  trTag.id = tableRowId;
  trTag.innerHTML = tdTags;
  return trTag;
};

const hasNewComment = (totalComments) => {
  const tbody = document.querySelector('tbody');
  const trTags = tbody.getElementsByTagName('tr');
  return trTags.length !== totalComments;
}

const showComments = (res) => {
  const tbody = document.querySelector('tbody');
  console.log(res);
  const commentsData = JSON.parse(res.response);

  if (!hasNewComment(commentsData.totalComments)) {
    return;
  }

  for (const commentDetails of commentsData.comments) {
    const trTag = document.getElementById(commentDetails.id);
    if (!trTag) {
      const { id, dateTime, name, comment } = commentDetails;
      const newTrTag = toTableRowTag(id, dateTime, name, comment);
      tbody.prepend(newTrTag);
    }
  }
};

const fetchNewComments = () => {
  const intervalId = setInterval(() => {
    const reqOptions = {
      url: '/api/guestbook/comments',
      method: 'GET',
      body: '',
      callback: showComments
    };
    sendRequest(reqOptions);
  }, 10000);
};

const LoadComments = () => {
  const reqOptions = {
    url: '/api/guestbook/comments',
    method: 'GET',
    body: '',
    callback: showComments
  };
  sendRequest(reqOptions);
  fetchNewComments();
}