const { Comments } = require('./src/model/comments.js');
const { initateRoutes } = require("./src/app");
const { Sessions } = require("./src/model/session");

const config = {
  publicDir: './public',
  comments: new Comments('./src/data/comments.json')
};

const PORT = process.env.PORT || 5000;
const sessions = new Sessions();
const app = initateRoutes(config, sessions);
app.listen(PORT, () => console.log('Server Running', PORT));
