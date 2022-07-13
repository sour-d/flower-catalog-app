const { serveFileContent } = require("./routes");

const createHomePageHandler = (serveFileContent) => (req, res) => {
  req.url.pathname = '/index.html';
  serveFileContent(req, res);
};

exports.createHomePageHandler = createHomePageHandler;
