const express = require('express');

const { injectCookies } = require('./middleware/injectCookies.js');
const { injectComments } = require('./middleware/injectComments.js');
const { injectSession } = require('./middleware/injectSession.js');

const { loginHandler } = require('./handler/loginHandler.js');
const { guestBookHandler } = require('./handler/guestBookHandler.js');

const {
  commentsApi,
  currentUserApi,
  addCommentApi
} = require('./handler/apiHandler.js');

const logRequest = (req, res, next) => {
  console.log(`[${req.method}] ==> ${req.path}`);
  next();
};


const initateRoutes = (config, sessions) => {
  const app = express();

  app.use(logRequest);
  app.use((req, res, next) =>
    injectComments(req, res, next, config.comments)
  );
  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.use(express.urlencoded({ extended: true }));


  app.get('/guest-book', guestBookHandler);
  app.get('/login', loginHandler(sessions));
  app.post('/login', loginHandler(sessions));

  app.get('/api/guestbook/comments', commentsApi);
  app.post('/api/guestbook/comments', addCommentApi);
  app.post('/api/user', currentUserApi);

  app.use(express.static(config.publicDir));
  return app;
};

module.exports = { initateRoutes };
