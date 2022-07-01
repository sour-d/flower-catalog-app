const { commentsApi } = require('./api.js');
const { createFileHandler } = require('./fileHandler.js');
const { createGuestBookHandler } = require('./guestBookHandler.js');
const { Router } = require('./router.js');

const serveFileContent = createFileHandler('./public');
const guestBookHandler = createGuestBookHandler(
  './public/guestBook.html',
  './src/comments.json'
);

const homePageHandler = (req, res) => {
  req.url.pathname = '/index.html';
  serveFileContent(req, res);
};

const initateRouters = () => {
  const router = new Router(serveFileContent);

  router.GET('/', homePageHandler);
  router.GET('/guest-book', guestBookHandler);
  router.POST('/add-comment', guestBookHandler);
  router.GET('/api/comments', commentsApi);

  return router;
};

module.exports = { initateRouters };
