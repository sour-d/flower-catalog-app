const { initateRouters } = require('./handler/routes.js');
const { injectCookies } = require('./server/injectCookies.js');
const { injectComments } = require('./injectComments.js');
const { Sessions, injectSession } = require('./server/session.js');

const logRequestDetails = (req) => {
  console.log(`[${req.method}] ==> ${req.url.pathname}`);
};

const getHostName = (req) => 'http://' + req.headers.host;

const parseBody = (data, req) => {
  req.body = new URLSearchParams(data);
};

const parseUrl = (req) => {
  req.url = new URL(req.url, getHostName(req));
};

const main = (req, res, sessions, body) => {
  parseUrl(req);
  logRequestDetails(req);

  parseBody(body, req);
  injectCookies(req, res);
  injectSession(req, res, sessions);
  injectComments(req, res);
  initateRouters(req, res, sessions);
};

const sessions = new Sessions();
const processRequest = (req, res) => {
  let rawBody = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => rawBody += chunk);
  req.on('close', () => main(req, res, sessions, rawBody));
};

module.exports = { processRequest };
