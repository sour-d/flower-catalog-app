const fs = require('fs');

const contentType = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  gif: 'image/gif',
  png: 'image/png',
  css: 'text/css',
  pdf: 'application/pdf'
};

const getContentType = (filename) => {
  const extension = filename.slice(filename.lastIndexOf('.') + 1);
  return contentType[extension.toLowerCase()];
};

const serveFileContent = (fileName, response) => {
  const fileStream = fs.createReadStream(fileName);

  const mimeType = getContentType(fileName);
  response.setHeader('Content-type', mimeType);
  if (mimeType === 'application/pdf') {
    response.setHeader('Content-Disposition', 'attachment');
  }

  fileStream.on('data', (chunk) => response.write(chunk));
  fileStream.on('close', () => response.end());
};

exports.serveFileContent = serveFileContent;
