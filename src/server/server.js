const http = require('http');
const { processRequest } = require('../requestProcessor.js');

const server = () => {
  const PORT = 8000;
  const server = http.createServer(processRequest);
  server.listen(PORT, () => console.log(`Listening to localhost:${PORT}`));
};

module.exports = { server };
