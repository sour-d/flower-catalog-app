const fs = require('fs');
const { responseWithError } = require('./errorHandler');
const { serveFileContent } = require('./fileHandler');
const { handleGuestBookRequest } = require('./guestBookHandler');
const { Comments } = require('./comments.js');

const handleRoutes = (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (url.pathname === '/') {
    serveFileContent('./res/index.html', response);
    return;
  }
  if (url.pathname === '/guest-book') {
    const templateFile = './res/guestBook.html';
    const comments = new Comments('./src/comments.json');
    handleGuestBookRequest(request, comments, templateFile, response);
    return;
  }
  if (fs.existsSync('./res' + url.pathname)) {
    serveFileContent('./res' + url.pathname, response);
    return;
  }
  responseWithError(response);
};

module.exports = { handleRoutes };
