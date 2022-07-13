const { createApp } = require('./src/app.js');
const { createServer } = require('./src/server/server.js');
const { Sessions } = require('./src/server/session.js');

const app = createApp(new Sessions());
const server = createServer(app);

server();
