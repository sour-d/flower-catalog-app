const responseWithError = (response) => {
  response.statusCode = 404;
  response.end('404 Bad Request!');
};

module.exports = { responseWithError };
