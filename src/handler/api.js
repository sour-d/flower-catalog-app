const fs = require('fs');

const commentsApi = (req, res) => {
  let content = '[]';
  if (fs.existsSync('./src/comments.json')) {
    content = fs.readFileSync('./src/comments.json', 'utf8');
  }

  content = JSON.parse(content);
  res.setHeader('Content_type', 'text/json');
  res.write(JSON.stringify(content));
  res.end();
};

const userApiHandler = (req, res) => {
  res.end(JSON.stringify({ name: req.session.name }));
}

module.exports = { commentsApi, userApiHandler };
