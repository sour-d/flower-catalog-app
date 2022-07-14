const redirectBack = (response, location) => {
  response.statusCode = 302;
  response.method = 'GET';
  response.setHeader('Location', location);
  response.end();
};

const createLoginHandler = serveFileContent =>
  (req, res, sessions) => {
    if (req.session) {
      redirectBack(res, '/guest-book');
      return;
    }
    if (req.method === 'GET') {
      req.url.pathname = '/login.html';
      serveFileContent(req, res);
      return;
    }
    const name = req.body.get('name');
    res.statusCode = 302;
    if (name) {
      const sessionId = sessions.create({ name });
      res.setHeader('location', '/guest-book');
      res.setHeader('Set-Cookie', 'sessionId=' + sessionId);
      res.end();
      return;
    }
    res.setHeader('location', '/login');
    res.end();
  };

module.exports = { createLoginHandler };
