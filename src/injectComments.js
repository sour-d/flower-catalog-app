const { Comments } = require("./handler/comments");

const injectComments = (req, res, next, comments) => {
  // const comments = new Comments(commentFile);
  req.comments = comments;
  next();
};

module.exports = { injectComments };