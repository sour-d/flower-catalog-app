const redirectBack = (response, location) => {
  response.statusCode = 302;
  response.method = 'GET';
  response.setHeader('Location', location);
  response.end();
};

const loginHandler = (req, res, next) => {
  if (req.session) {
    res.redirect('/guest-book');
    return;
  }
  // if (req.method === 'GET') {
  //   // req.path = '/login.html';
  //   res.redirect('/login.html');
  //   next();
  //   return;
  // }
  const name = req.body.name;
  if (name) {
    const sessionId = req.sessions.create({ name });
    res.cookie('sessionId', sessionId);
    res.redirect('/guest-book');
    return;
  }
  res.redirect('/login.html');
};

module.exports = { loginHandler };
