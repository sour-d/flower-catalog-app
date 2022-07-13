const { commentsApi, userApiHandler } = require('./api.js');
const { createFileHandler } = require('./fileHandler.js');
const { addCommentHandler, guestBookPageHandler } = require('./guestBookHandler.js');
const { createLoginHandler } = require('./loginHandler.js');
const { Router } = require('../server/router.js');

const serveFileContent = createFileHandler('./public');
const loginHandler = createLoginHandler(serveFileContent);

const homePageHandler = (req, res) => {
  req.url.pathname = '/index.html';
  serveFileContent(req, res);
};

const initateRouters = (req, res, sessions) => {
  const router = new Router(serveFileContent);

  router.GET('/', homePageHandler);
  router.GET('/guest-book', guestBookPageHandler);
  router.GET('/login', loginHandler);
  router.POST('/login', loginHandler);

  router.GET('/api/comments', commentsApi);
  router.POST('/api/add-comment', addCommentHandler);
  router.GET('/api/user', userApiHandler);

  router.handle(req, res, sessions);
};

module.exports = { initateRouters };
