const redirectBack = (response, location) => {
  response.statusCode = 302;
  response.method = 'GET';
  response.setHeader('Location', location);
  response.end();
};

const commentsApi = (req, res) => {
  if (!req.session) {
    res.redirect('/login');
    return;
  }
  const comments = req.comments.get();
  res.set('Content-type', 'application/json');
  res.write(JSON.stringify(comments));
  res.end();
};

const currentUserApi = (req, res) => {
  if (!req.session) {
    res.end(JSON.stringify({}));
    return;
  }
  res.end(JSON.stringify({ name: req.session.name }));
};

const addCommentApi = (req, res) => {
  if (!req.session) {
    res.redirect('/login');
    return;
  }
  if (req.body.name && req.body.comment) {
    req.comments.update(req.body);
    res.set('content-type', 'application/json');
    res.write(JSON.stringify({ updated: true }));
    res.end();
  }
};

module.exports = { commentsApi, currentUserApi, addCommentApi };
