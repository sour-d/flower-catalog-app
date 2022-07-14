const redirectBack = (response, location) => {
  response.statusCode = 302;
  response.method = 'GET';
  response.setHeader('Location', location);
  response.end();
};

const commentsApi = (req, res) => {
  const comments = req.comments.get();
  res.setHeader('Content-type', 'application/json');
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

module.exports = { commentsApi, currentUserApi, addCommentApi };
