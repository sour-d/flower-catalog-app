const { initateRouters } = require('./handler/routes.js');
const { injectCookies } = require('./server/injectCookies.js');
const { injectComments } = require('./injectComments.js');
const { injectSession } = require('./server/session.js');
const { Router } = require('./server/router.js');

const { createFileHandler } = require('./handler/fileHandler.js');
const { createLoginHandler } = require('./handler/loginHandler.js');
const { createHomePageHandler } = require("./handler/homePageHandler");
const { guestBookHandler } = require('./handler/guestBookHandler.js');

const {
  commentsApi,
  currentUserApi,
  addCommentApi
} = require('./handler/apiHandler.js');

const getHostName = (req) => 'http://' + req.headers.host;

const parseBody = (data, req) => {
  req.body = new URLSearchParams(data);
};

const parseUrl = (req) => {
  req.url = new URL(req.url, getHostName(req));
};

const createRequestHandler = (config, sessions, router) =>
  (req, res, body) => {
    parseUrl(req);

    parseBody(body, req);
    injectCookies(req, res);
    injectSession(req, res, sessions);
    injectComments(req, res, config.commentFile);

    router.handle(req, res, sessions);
  };

const getHandlers = (config) => {
  const serveFileContent = createFileHandler(config.publicDir);
  const homePageHandler = createHomePageHandler(serveFileContent);
  const loginHandler = createLoginHandler(serveFileContent);
  return {
    commentsApi, currentUserApi, serveFileContent,
    loginHandler, homePageHandler, addCommentApi, guestBookHandler
  };
}

const createApp = (sessions, config) => {
  const serveFileContent = createFileHandler(config.publicDir);
  const router = new Router(serveFileContent);
  const handlers = getHandlers(config);
  const handleRequest = createRequestHandler(config, sessions, router);
  initateRouters(router, handlers);

  return (req, res) => {
    let rawBody = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => rawBody += chunk);
    req.on('close', () => handleRequest(req, res, rawBody));
  };
};

module.exports = { createApp };
