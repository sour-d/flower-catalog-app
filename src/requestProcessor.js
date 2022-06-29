const { handleRoutes } = require('./routes.js');

const processRequest = (request, response) => {
  if (request.method !== 'GET') {
    response.end();
    return;
  }
  console.log(`[${request.method}] ==> ${request.url}`);
  handleRoutes(request, response);
};

module.exports = { processRequest };
