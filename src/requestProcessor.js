const { parseRequest } = require('./parseRequest.js');

const processRequest = (rawRequest) => {
  const request = parseRequest(rawRequest);
  console.log(`requested for ${request.URI}`);
};

module.exports = { processRequest };
