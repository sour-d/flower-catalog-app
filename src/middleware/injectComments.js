const injectComments = (req, res, next, comments) => {
  req.comments = comments;
  next();
};

module.exports = { injectComments };
