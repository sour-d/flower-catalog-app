const responseWithError = (response) => {
  response.statusCode = 404;
  response.writeHeaders();
  response.write('404 Bad Request!');
  response.end();
};

module.exports = { responseWithError };
