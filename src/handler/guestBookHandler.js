const guestBookHandler = (req, res, next) => {
  if (!req.session) {
    res.redirect('/login');
    return;
  }
  req.url = '/guestBook.html';
  next();
};


module.exports = { guestBookHandler };

