const fs = require('fs');
const { Comments } = require('./comments.js');

const toTableDataTag = (content) => {
  return `<td>${content}</td>`;
};

const toTableRowTag = (tableRowId, ...tableDatas) => {
  const tdTags = tableDatas.map(toTableDataTag).join('');
  return `<tr id="${tableRowId}">${tdTags}</tr>`;
};

const createTableRow = (comments) => {
  if (!comments) {
    return '';
  }
  return comments.map(({ id, dateTime, name, comment }) => {
    return toTableRowTag(id, dateTime, name, comment);
  }).join('');
};

const redirectBack = (response, location) => {
  response.statusCode = 302;
  response.method = 'GET';
  response.setHeader('Location', location);
  response.end();
};

const serveGuestBook = (template, comments, response) => {
  const tableRows = createTableRow(comments.get().comments);

  response.setHeader('Content-type', 'text/html');
  response.write(template.replace('__TABLE_CONTENT__', tableRows));
  response.end();
};

const createGuestBookHandler = (templateFile, CommentsFile) => {
  const comments = new Comments(CommentsFile);
  const template = fs.readFileSync(templateFile, 'utf8');

  return (req, res) => {
    if (!req.session) {
      redirectBack(res, '/login');
      return;
    }
    const params = req.body;
    if (params.get('name') && params.get('comment')) {
      comments.update(params);
      redirectBack(res, '/guest-book');
      return;
    }
    serveGuestBook(template, comments, res);
  };
};

module.exports = { createGuestBookHandler };

