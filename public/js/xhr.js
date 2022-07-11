const setHeaders = ({ headers }, xhr) => {
  if (headers) {
    for (const headerName in headers) {
      const headerValue = headers[headerName];
      xhr.setRequestHeader(headerName, headerValue);
    }
  }
};

const sendRequest = (reqOptions) => {
  const xhr = new XMLHttpRequest();

  xhr.open(reqOptions.method, reqOptions.url);
  setHeaders(reqOptions, xhr);

  if (reqOptions.body) {
    xhr.send(reqOptions.body);
  } else {
    xhr.send();
  }

  xhr.onload = () => reqOptions.callback(xhr);
};

