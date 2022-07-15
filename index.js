const { Comments } = require('./src/model/comments.js');
const { initateRoutes } = require("./src/app");
const { Sessions } = require("./src/model/session");

const config = {
  publicDir: './public',
  comments: new Comments('./src/data/comments.json')
};
const sessions = new Sessions();
const app = initateRoutes(config, sessions);
app.listen(8000, () => console.log('Server Running'));
