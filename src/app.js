const express = require('express');

const { injectCookies } = require('./middleware/injectCookies.js');
const { injectComments } = require('./middleware/injectComments.js');
const { injectSession } = require('./middleware/injectSession.js');
const { logRequest } = require("./middleware/logRequest.js");

const { loginHandler } = require('./handler/loginHandler.js');
const { guestBookHandler } = require('./handler/guestBookHandler.js');

const {
  commentsApi,
  currentUserApi,
  addCommentApi
} = require('./handler/apiHandler.js');

const initateRoutes = ({ comments, publicDir }, sessions) => {
  const app = express();

  app.use(logRequest);
  app.use(express.urlencoded({ extended: true }));
  app.use(injectComments(comments));
  app.use(injectCookies);
  app.use(injectSession(sessions));

  app.get('/guest-book', guestBookHandler);
  app.get('/login', loginHandler(sessions));
  app.post('/login', loginHandler(sessions));

  const api = express();
  api.get('/guestbook/comments', commentsApi);
  api.post('/guestbook/comments', addCommentApi);
  api.post('/user', currentUserApi);

  app.use('/api', api);
  app.use(express.static(publicDir));

  return app;
};

module.exports = { initateRoutes };
