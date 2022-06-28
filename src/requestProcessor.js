const { handleRoutes } = require('./routes.js');
const { parseRequest } = require('./parseRequest.js');
const { Response } = require('./response.js');

const processRequest = (rawRequest, socket) => {
  const request = parseRequest(rawRequest);
  if (request.method !== 'GET') {
    socket.end();
    return;
  }
  console.log(`[${request.method}] ==> ${request.URI}`);
  const response = new Response(socket);
  handleRoutes(request, response);
};

module.exports = { processRequest };
