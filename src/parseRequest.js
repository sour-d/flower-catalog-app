const headerValue = (header) => {
  return header.slice(header.indexOf(':') + 1);
};

const headerName = (header) => {
  return header.slice(0, header.indexOf(':'));
};

const parseURI = (rawURI) => {
  const queryParams = {};
  const [URI, queryParam] = rawURI.split('?');
  if (queryParam) {
    const params = queryParam.split('&');
    params.forEach(param => {
      const [key, value] = param.split('=');
      queryParams[key] = value.replaceAll('+', ' ');
    });
  }

  return { URI, queryParams };
};

const parseRequestLine = (requestLine) => {
  const [method, URI, protocol] = requestLine.split(' ');
  return { method, ...parseURI(URI), protocol };
};

const parseHeaders = (headers) => {
  return headers.map(header => {
    return {
      fieldName: headerName(header),
      value: headerValue(header).trim()
    };
  });
};

const parse = (request) => {
  const lines = request.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { ...requestLine, headers };
};

module.exports = { parseRequest: parse };

