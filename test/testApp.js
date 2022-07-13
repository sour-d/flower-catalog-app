const { processRequest } = require('../src/app.js');
const request = require('supertest');


describe('App', () => {
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

  it('Should give 200 for / page', (done) => {
    request(processRequest)
      .get('/')
      .expect(200, done);
  });

  it('Should give 200 for /index.html page', (done) => {
    request(processRequest)
      .get('/index.html')
      .expect(200, done);
  });
});