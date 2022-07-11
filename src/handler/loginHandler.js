const redirectBack = (response, location) => {
  response.statusCode = 302;
  response.method = 'GET';
  response.setHeader('Location', location);
  response.end();
};

const createLoginHandler = serveFileConten =>
  (req, res, sessions) => {
    if (req.session) {
      redirectBack(res, '/guest-book');
      return;
    }
    if (req.method === 'GET') {
      req.url.pathname = '/login.html';
      serveFileConten(req, res);
      return;
    }
    const name = req.body.get('name');
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
