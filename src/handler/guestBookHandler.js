const fs = require('fs');

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

const handleGuestBookRequest = (request, comments, templateFile, response) => {

  const url = new URL(request.url, `http://${request.headers.host}`);
  if (url.searchParams.get('name') && url.searchParams.get('comment')) {
    comments.update(url.searchParams);
    redirectBack(response, '/guest-book');
    return;
  }
  const template = fs.readFileSync(templateFile, 'utf8');
  serveGuestBook(template, comments, response);
};

module.exports = { handleGuestBookRequest };

