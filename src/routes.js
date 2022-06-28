const fs = require('fs');
const { responseWithError } = require('./errorHandler');
const { serveFileContent } = require('./fileHandler');
const { serveGuestBook } = require('./guestBookHandler');
const { Comments } = require('./comments.js');

const handleRoutes = (request, response) => {
  if (request.URI === '/') {
    serveFileContent('./res/index.html', response);
    return;
  }
  if (request.URI === '/guest-book') {
    const templateFile = './res/guestBook.html';
    const comments = new Comments('./src/comments.json');
    serveGuestBook(request, comments, templateFile, response);
    return;
  }
  if (fs.existsSync('./res' + request.URI)) {
    serveFileContent('./res' + request.URI, response);
    return;
  }
  responseWithError(response);
};

module.exports = { handleRoutes };
