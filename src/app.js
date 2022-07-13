const { initateRouters } = require('./handler/routes.js');
const { injectCookies } = require('./server/injectCookies.js');
const { injectComments } = require('./injectComments.js');
const { injectSession } = require('./server/session.js');
const { Router } = require('./server/router.js');

const { createFileHandler } = require('./handler/fileHandler.js');
const { commentsApi, userApiHandler } = require('./handler/api.js');
const { createLoginHandler } = require('./handler/loginHandler.js');
const { createHomePageHandler } = require("./handler/homePageHandler");
const {
  addCommentHandler,
  guestBookPageHandler
} = require('./handler/guestBookHandler.js');

const getHostName = (req) => 'http://' + req.headers.host;

const parseBody = (data, req) => {
  req.body = new URLSearchParams(data);
};

const parseUrl = (req) => {
  req.url = new URL(req.url, getHostName(req));
};

const handleRequest = (req, res, sessions, body, router) => {
  parseUrl(req);

  parseBody(body, req);
  injectCookies(req, res);
  injectSession(req, res, sessions);
  injectComments(req, res);

  router.handle(req, res, sessions);
};

const getHandlers = () => {
  const serveFileContent = createFileHandler('./public');
  const homePageHandler = createHomePageHandler(serveFileContent);
  const loginHandler = createLoginHandler(serveFileContent);
  return {
    commentsApi, userApiHandler, serveFileContent,
    loginHandler, homePageHandler, addCommentHandler, guestBookPageHandler
  };
}

const createApp = (sessions, config) => {
  const serveFileContent = createFileHandler('./public');
  const router = new Router(serveFileContent);
  const handlers = getHandlers();
  initateRouters(router, handlers);

  return (req, res) => {
    let rawBody = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => rawBody += chunk);
    req.on('close', () => handleRequest(req, res, sessions, rawBody, router));
  };
};

module.exports = { createApp };
