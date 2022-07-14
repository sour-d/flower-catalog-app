// const { commentsApi, userApiHandler } = require('./api.js');
// const { createFileHandler } = require('./fileHandler.js');
// const { createLoginHandler } = require('./loginHandler.js');
// const { homePageHandler } = require("./homePageHandler");
// const {
//   addCommentHandler,
//   guestBookPageHandler
// } = require('./guestBookHandler.js');

// const serveFileContent = createFileHandler('./public');
// exports.serveFileContent = serveFileContent;
// const loginHandler = createLoginHandler(serveFileContent);

const initateRouters = (router, handlers) => {

  router.GET('/', handlers.homePageHandler);
  router.GET('/guest-book', handlers.guestBookHandler);
  router.GET('/login', handlers.loginHandler);
  router.POST('/login', handlers.loginHandler);

  router.GET('/api/comments', handlers.commentsApi);
  router.POST('/api/add-comment', handlers.addCommentApi);
  router.POST('/api/user', handlers.currentUserApi);

  // router.handle(req, res, sessions);
};

module.exports = { initateRouters };
