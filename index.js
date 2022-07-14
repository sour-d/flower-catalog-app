const { createApp } = require('./src/app.js');
const { createServer } = require('./src/server/server.js');
const { Sessions } = require('./src/server/session.js');


const config = {
  publicDir: 'public',
  commentFile: './src/data/comments.json'
};

const app = createApp(new Sessions(), config);
const server = createServer(app);

server();
