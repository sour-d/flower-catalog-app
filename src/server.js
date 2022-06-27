const { createServer } = require('net');
const { processRequest } = require('./requestProcessor.js');

const onConnection = (socket) => {
  socket.setEncoding('utf8');
  socket.on('data', (data) => processRequest(data, socket));
  socket.on('error', (err) => console.log(err));
};

const server = () => {
  const PORT = 4444;
  const server = createServer(onConnection);
  server.listen(PORT, () => console.log(`Listening to localhost:${PORT}`));
};

server();
