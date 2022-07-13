const http = require('http');
const { processRequest } = require('../app.js');

const logRequestDetails = (req) => {
  console.log(`[${req.method}] ==> ${req.url}`);
};

const server = () => {
  const PORT = 8000;
  const server = http.createServer((req, res) => {
    logRequestDetails(req);
    processRequest(req, res);
  });
  server.listen(PORT, () => console.log(`Listening to localhost:${PORT}`));
};

module.exports = { server };
