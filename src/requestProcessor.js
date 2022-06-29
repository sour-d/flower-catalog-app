const { initateRouters } = require('./handler/routes.js');

const logRequestDetails = (req) => {
  console.log(`[${req.method}] ==> ${req.url.pathname}`);
};

const getHostName = (req) => 'http://' + req.headers.host;

const processRequest = (req, res) => {
  req.url = new URL(req.url, getHostName(req));

  const router = initateRouters();
  logRequestDetails(req);
  router.handle(req, res);
};

module.exports = { processRequest };

