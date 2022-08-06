const injectComments = (comments) => (req, res, next) => {
  req.comments = comments;
  next();
};

module.exports = { injectComments };
