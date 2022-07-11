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

const showComments = (res) => {
  const tbody = document.querySelector('tbody');
  const commentsData = JSON.parse(res.response);
  const trTags = tbody.getElementsByTagName('tr');
  if (trTags.length === commentsData.totalComments) {
    return;
  }
  for (const commentDetails of commentsData.comments.reverse()) {
    const trTag = document.getElementById(commentDetails.id);
    if (!trTag) {
      const { id, dateTime, name, comment } = commentDetails;
      const newTrTag = toTableRowTag(id, dateTime, name, comment);
      tbody.prepend(newTrTag);
    }
  }
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