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

const processRequest = (rawRequest, socket) => {
  const request = parseRequest(rawRequest);
  console.log(`requested for ${request.URI}`);
  const response = new Response(socket);
  handler(request, response);
};

const handler = (request, response) => {
  if (request.URI === '/') {
    serveFileContent('./res/index.html', response);
    return;
  }
  // if (request.URI === '/') {
  //   serveFileContent('./res/index.html', response);
  //   return;
  // }
  if (fs.existsSync('./res' + request.URI)) {
    serveFileContent('./res' + request.URI, response);
    return;
  }
  responseWithErro(response);
};

module.exports = { processRequest };
function responseWithErro(response) {
  response.statusCode = 404;
  response.writeHeaders();
  response.write('404 Bad Request!');
  response.end();
}

