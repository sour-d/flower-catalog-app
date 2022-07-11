const { createFileHandler } = require('./fileHandler.js');

const serveFileContent = createFileHandler('./public');

const redirectBack = (response, location) => {
  response.statusCode = 302;
  response.method = 'GET';
  response.setHeader('Location', location);
  response.end();
};


const guestBookPageHandler = (req, res) => {
  req.url.pathname = '/guestBook.html';
  if (!req.session) {
    redirectBack(res, '/login');
    return;
  }
  serveFileContent(req, res);
};

const addCommentHandler = (req, res) => {
  if (!req.session) {
    redirectBack(res, '/login');
    return;
  }
  const params = req.body;
  if (params.get('name') && params.get('comment')) {
    req.comments.update(params);
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify({ updated: true }));
    res.end()
  }
};


module.exports = { addCommentHandler, guestBookPageHandler };

