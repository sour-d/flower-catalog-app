const { parseRequest } = require('./parseRequest.js');
const { Response } = require('./response.js');

const processRequest = (rawRequest, socket) => {
  const request = parseRequest(rawRequest);
  console.log(`requested for ${request.URI}`);
  const response = new Response(socket);
  handler(request, response);
};

const handler = (request, response) => {
  if (request.URI === '/demo') {
    response.addHeader('Content-type', 'text/html');
    response.writeHeaders();
    response.write('hello world');
    response.end();
    return;
  }
  response.statusCode = 404;
  response.writeHeaders();
  response.write('404 Bad Request!');
  response.end();
};

module.exports = { processRequest };
