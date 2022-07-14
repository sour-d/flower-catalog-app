const { createFileHandler } = require('./fileHandler.js');

const serveFileContent = createFileHandler('./public');

const redirectBack = (response, location) => {
  response.statusCode = 302;
  response.method = 'GET';
  response.setHeader('Location', location);
  response.end();
};


const guestBookHandler = (req, res) => {
  req.url.pathname = '/guestBook.html';
  if (!req.session) {
    redirectBack(res, '/login');
    return;
  }
  serveFileContent(req, res);
};


module.exports = { guestBookHandler };

