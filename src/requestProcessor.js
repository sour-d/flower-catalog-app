const fs = require('fs');
const { parseRequest } = require('./parseRequest.js');
const { Response } = require('./response.js');

const contentType = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  png: 'image/png',
  css: 'text/css',
  pdf: 'application/pdf'
};

const getContentType = (filename) => {
  const extension = filename.slice(filename.lastIndexOf('.') + 1);
  return contentType[extension.toLowerCase()];
};

const serveFileContent = (fileName, response) => {
  const fileStream = fs.createReadStream(fileName);

  response.addHeader('Content-type', getContentType(fileName));
  if (getContentType(fileName) === 'application/pdf') {
    response.addHeader('Content-Disposition', 'attachment');
  }
  response.writeHeaders();

  fileStream.on('data', (chunk) => response.write(chunk));
  fileStream.on('close', () => response.end());
};

const createTableRow = (comments) => {
  return comments.map(comment => {
    const tdDateTime = `<td>${comment.dateTime}</td>`;
    const tdName = `<td>${comment.name}</td>`;
    const tdComment = `<td>${comment.comment}</td>`;
    return `<tr>${tdDateTime}${tdName}${tdComment}</tr>`;
  }).join('');
};

const responseWithError = (response) => {
  response.statusCode = 404;
  response.writeHeaders();
  response.write('404 Bad Request!');
  response.end();
};

const serveGuestBook = (request, commentsFile, templateFile, response) => {
  let rawComments = '[]';
  if (fs.existsSync(commentsFile)) {
    rawComments = fs.readFileSync(commentsFile, 'utf8');
  }
  if (request.queryParams.name && request.queryParams.comment) {
    saveGuestMessage(request, commentsFile, response);
    return;
  }
  const template = fs.readFileSync(templateFile, 'utf8');
  const comments = JSON.parse(rawComments);
  const tableRows = createTableRow(comments);

  response.addHeader('Content-type', getContentType(templateFile));
  response.writeHeaders();
  response.write(template.replaceAll('__TABLE_CONTENT__', tableRows));
  response.end();
};

const saveGuestMessage = (request, commentsFile, response) => {
  let rawComments = '[]';
  if (fs.existsSync(commentsFile)) {
    rawComments = fs.readFileSync(commentsFile, 'utf8');
  }
  const comments = JSON.parse(rawComments);
  const newComment = {
    name: request.queryParams.name,
    dateTime: new Date(),
    comment: request.queryParams.comment,
  };
  comments.push(newComment);
  fs.writeFileSync(commentsFile, JSON.stringify(comments), 'utf8');

  response.statusCode = 302;
  response.addHeader('Location', '/guest-book');
  response.writeHeaders();
  response.end();
};

const processRequest = (rawRequest, socket) => {
  const request = parseRequest(rawRequest);
  if (request.method !== 'GET') {
    socket.end();
    return;
  }
  console.log(`requested for ${request.URI}`);
  const response = new Response(socket);
  handler(request, response);
};

const handler = (request, response) => {
  if (request.URI === '/') {
    serveFileContent('./res/index.html', response);
    return;
  }
  if (request.URI === '/guest-book') {
    const template = './res/guestBook.html';
    const commentsFile = './src/comments.json';
    serveGuestBook(request, commentsFile, template, response);
    return;
  }
  if (fs.existsSync('./res' + request.URI)) {
    serveFileContent('./res' + request.URI, response);
    return;
  }
  responseWithError(response);
};

module.exports = { processRequest };
