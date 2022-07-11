const { commentsApi } = require('./api.js');
const { createFileHandler } = require('./fileHandler.js');
const { createGuestBookHandler } = require('./guestBookHandler.js');
const { createLoginHandler } = require('./loginHandler.js');
const { Router } = require('./router.js');

const serveFileContent = createFileHandler('./public');
const loginHandler = createLoginHandler(serveFileContent);
const guestBookHandler = createGuestBookHandler(
  './public/guestBook.html',
  './src/comments.json'
);

const homePageHandler = (req, res) => {
  req.url.pathname = '/index.html';
  serveFileContent(req, res);
};

const initateRouters = (req, res, sessions) => {
  const router = new Router(serveFileContent);

  router.GET('/', homePageHandler);
  router.GET('/guest-book', guestBookHandler);
  router.POST('/add-comment', guestBookHandler);
  router.GET('/api/comments', commentsApi);
  router.GET('/login', loginHandler);
  router.POST('/login', loginHandler);
  router.handle(req, res, sessions);
  // return router;
};

module.exports = { initateRouters };
