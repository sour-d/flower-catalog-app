const createLoginHandler = serveFileConten =>
  (req, res, sessions) => {
    if (req.method === 'GET') {
      req.url.pathname = '/login.html';
      serveFileConten(req, res);
      return;
    }
    const name = req.body.get('name');
    console.log(name);
    if (name) {
      const sessionId = sessions.create({ name });
      res.statusCode = 302;
      res.setHeader('location', '/guest-book');
      res.setHeader('Set-Cookie', 'sessionId=' + sessionId);
      res.end();
      return;
    }
    res.send('not found');
  };

module.exports = { createLoginHandler };
