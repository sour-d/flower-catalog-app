const statusMessages = {
  200: 'OK',
  404: 'Not Found',
  301: 'moved'
};

class Response {
  #socket;
  #statusCode;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  #responseStatus() {
    const httpVersion = 'HTTP/1.1';
    const statusMessage = statusMessages[this.#statusCode];
    return [httpVersion, this.#statusCode, statusMessage].join(' ');
  }

  addHeader(fieldName, value) {
    this.#headers[fieldName] = value;
  }

  writeHeaders() {
    this.#socket.write(this.#responseStatus() + '\r\n');

    Object.entries(this.#headers).forEach(([fieldName, value]) => {
      this.#socket.write(fieldName + ': ' + value + '\r\n');
    });
    this.write('\r\n');
  }

  write(content) {
    this.#socket.write(content);
  }

  end() {
    this.#socket.end();
  }
}

module.exports = { Response };