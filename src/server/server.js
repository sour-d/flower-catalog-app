const http = require('http');

const logRequestDetails = (req) => {
  console.log(`[${req.method}] ==> ${req.url}`);
};

const createServer = reqHandler => () => {
  const PORT = 8000;
  const server = http.createServer((req, res) => {
    logRequestDetails(req);
    reqHandler(req, res);
  });
  server.listen(PORT, () => console.log(`Listening to localhost:${PORT}`));
};

module.exports = { createServer };
