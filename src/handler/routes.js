const fs = require('fs');
const { responseWithError } = require('./errorHandler.js');
const { serveFileContent } = require('./fileHandler.js');
const { handleGuestBookRequest } = require('./guestBookHandler.js');
const { Comments } = require('./comments.js');

// const wrapMethodNotFound = (pathname, handlers) => (req, res) => {
//   if (req.url.pathname !== pathname) {
//     return false;
//   }
//   if (!handlers[req.method]) {
//     // method not found
//     res.statusCode = 405;
//     res.end('');
//     return true;
//   }
//   const actualHandler = handlers[req.method];
//   return actualHandler(req, res);
// };

const handleRoutes = (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (request.matches('GET', '/')) {
    serveFileContent('./public/index.html', response);
    return;
  }

  if (request.matches('GET', '/guest-book')) {
    const templateFile = './public/guestBook.html';
    const comments = new Comments('./src/comments.json');
    handleGuestBookRequest(request, comments, templateFile, response);
    return;
  }
  if (fs.existsSync('./public' + url.pathname)) {
    serveFileContent('./public' + url.pathname, response);
    return;
  }
  responseWithError(response);
};

module.exports = { handleRoutes };
