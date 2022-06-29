const { handleRoutes } = require('./handler/routes.js');

const matches = function (method, pathname) {
  const url = new URL(this.url, `http://${this.headers.host}`);
  return this.method === method && url.pathname === pathname;
};

const processRequest = (request, response) => {
  // if (request.method !== 'GET') {
  //   response.end();
  //   return;
  // }

  console.log(`[${request.method}] ==> ${request.url}`);
  request.matches = matches.bind(request);
  handleRoutes(request, response);
};

module.exports = { processRequest };
