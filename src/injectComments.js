const { Comments } = require("./handler/comments");

const injectComments = (req, res) => {
  const comments = new Comments('./src/comments.json');
  req.comments = comments;
};

module.exports = { injectComments };