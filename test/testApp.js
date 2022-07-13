const { processRequest } = require('../src/app.js');
const request = require('supertest');


describe('App', () => {

  describe('NotFoundHandler', () => {
    it('Should give 404 for bad requests in get', (done) => {
      request(processRequest)
        .get('/abcd')
        .expect('404 Bad Request!')
        .expect(404, done);
    });

    it('Should give 404 for bad requests in post', (done) => {
      request(processRequest)
        .post('/abcd')
        .expect('404 Bad Request!')
        .expect(404, done);
    });
  });

  describe('fileHandler', () => {
    it('Should give html files if exists', (done) => {
      request(processRequest)
        .get('/index.html')
        .expect('content-type', 'text/html')
        .expect(200, done);
    });

    it('Should serve image with proper header', (done) => {
      request(processRequest)
        .get('/images/freshorigins.jpg')
        .expect('content-type', 'image/jpg')
        .expect(200, done);
    });

    it('Should serve pdfs with proper header', (done) => {
      request(processRequest)
        .get('/pdfs/Abeliophyllum.pdf')
        .expect('content-type', 'application/pdf')
        .expect(200, done);
    });

    it('Should serve css files with proper header', (done) => {
      request(processRequest)
        .get('/stylesheets/index.css')
        .expect('content-type', 'text/css')
        .expect(200, done);
    });
  });

  describe('Routes', () => {
    it('Should give 200 for / page', (done) => {
      request(processRequest)
        .get('/')
        .expect(200, done);
    });

    it('Should give 200 for /login page', (done) => {
      request(processRequest)
        .get('/login')
        .expect(200, done);
    });
  });

});