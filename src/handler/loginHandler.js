const loginHandler = (sessions) => (req, res, next) => {
  if (req.session) {
    res.redirect('/guest-book');
    return;
  }

  if (req.method === 'GET') {
    req.url = '/login.html';
    next();
    return;
  }

  const name = req.body.name;
  if (name) {
    const sessionId = sessions.create({ name });
    res.cookie('sessionId', sessionId);
    res.redirect('/guest-book');
    return;
  }
  res.redirect('/login');
};

const loginPageHandler = () => {

}

module.exports = { loginHandler };
