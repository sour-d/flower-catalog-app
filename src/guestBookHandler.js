const fs = require('fs');

const toTableDataTag = (content) => {
  return `<td>${content}</td>`;
};

const toTableRowTag = (...tableDatas) => {
  const tdTags = tableDatas.map(td => toTableDataTag(td)).join('');

  return `<tr>${tdTags}</tr>`;
};

const createTableRow = (comments) => {
  return comments.map(({ dateTime, name, comment }) => {
    return toTableRowTag(dateTime, name, comment);
  }).join('');
};

const redirectBack = (response, location) => {
  response.statusCode = 302;
  response.addHeader('Location', location);
  response.writeHeaders();
  response.end();
};

const serveGuestBook = (template, comments, response) => {
  const tableRows = createTableRow(comments.get());

  response.addHeader('Content-type', 'text/html');
  response.writeHeaders();
  response.write(template.replace('__TABLE_CONTENT__', tableRows));
  response.end();
};

const handleGuestBookRequest = (request, comments, templateFile, response) => {
  if (request.queryParams.name && request.queryParams.comment) {
    comments.update(request.queryParams);
    redirectBack(response, '/guest-book');
    return;
  }
  const template = fs.readFileSync(templateFile, 'utf8');
  serveGuestBook(template, comments, response);
};

exports.serveGuestBook = handleGuestBookRequest;

