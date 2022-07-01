const { initateRouters } = require('./handler/routes.js');

const logRequestDetails = (req) => {
  console.log(`[${req.method}] ==> ${req.url.pathname}`);
};

const getHostName = (req) => 'http://' + req.headers.host;

const parseBody = (data, req) => {
  req.body = new URLSearchParams(data);
};

const processRequest = (req, res) => {
  req.url = new URL(req.url, getHostName(req));
  let data = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('close', () => {
    parseBody(data, req);
    const router = initateRouters();
    logRequestDetails(req);
    router.handle(req, res);
  });
};

module.exports = { processRequest };

