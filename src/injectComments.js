const { Comments } = require("./handler/comments");

const injectComments = (req, res, commentFile) => {
  const comments = new Comments(commentFile);
  req.comments = comments;
};

module.exports = { injectComments };