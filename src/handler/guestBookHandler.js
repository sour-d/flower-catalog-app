// const { createFileHandler } = require('./fileHandler.js');

// const serveFileContent = createFileHandler('./public');

const redirectBack = (response, location) => {
  response.statusCode = 302;
  response.method = 'GET';
  response.setHeader('Location', location);
  response.end();
};


const guestBookHandler = (req, res, next) => {
  if (!req.session) {
    res.redirect('/login.html');
    return;
  }
  res.redirect('/guestBook.html');
  next();
};


module.exports = { guestBookHandler };

