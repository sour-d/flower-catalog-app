const fs = require('fs');
const { Comments } = require('./comments.js');

const toTableDataTag = (content) => {
  return `<td>${content}</td>`;
};

const toTableRowTag = (...tableDatas) => {
  const tdTags = tableDatas.map(toTableDataTag).join('');

  return `<tr>${tdTags}</tr>`;
};

const createTableRow = (comments) => {
  return comments.map(({ dateTime, name, comment }) => {
    return toTableRowTag(dateTime, name, comment);
  }).join('');
};

const redirectBack = (response, location) => {
  response.statusCode = 302;
  response.setHeader('Location', location);
  response.end();
};

const serveGuestBook = (template, comments, response) => {
  const tableRows = createTableRow(comments.get());

  response.setHeader('Content-type', 'text/html');
  response.write(template.replace('__TABLE_CONTENT__', tableRows));
  response.end();
};

const createGuestBookHandler = (templateFile, CommentsFile) => {
  const comments = new Comments(CommentsFile);
  return (req, res) => {
    const params = req.url.searchParams;
    if (params.get('name') && params.get('comment')) {
      comments.update(params);
      redirectBack(res, '/guest-book');
      return;
    }
    const template = fs.readFileSync(templateFile, 'utf8');
    serveGuestBook(template, comments, res);
  };
};

module.exports = { createGuestBookHandler };

