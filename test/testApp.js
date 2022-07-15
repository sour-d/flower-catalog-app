const fs = require('fs');
const request = require('supertest');
const { Sessions } = require('../src/server/session.js');
const { initateRoutes } = require('../src/app');
const { Comments } = require('../src/handler/comments.js')

const config = {
  publicDir: './public',
  comments: new Comments('./test/comments.json')
};
const sessions = new Sessions();

const app = initateRoutes(config, sessions);

describe('GET /bad-request', () => {
  it('Should give 404 for invalid in GET', (done) => {
    request(app)
      .get('/abcd')
      .expect(404, done);
  });
});
describe('POST /bad-request', () => {
  it('Should give 404 for invalid in POST', (done) => {
    request(app)
      .post('/abcd')
      .expect(404, done);
  });
});

describe('GET /Any_File', () => {
  it('Should give html with text/html header', (done) => {
    request(app)
      .get('/index.html')
      .expect('content-type', 'text/html; charset=UTF-8')
      .expect(200, done);
  });

  it('Should serve css with text/css header', (done) => {
    request(app)
      .get('/stylesheets/index.css')
      .expect('content-type', 'text/css; charset=UTF-8')
      .expect(200, done);
  });

  it('Should serve image with image/jpg header', (done) => {
    request(app)
      .get('/images/freshorigins.jpg')
      .expect('content-type', 'image/jpeg')
      .expect(200, done);
  });

  it('Should serve pdfs with application/pdf header', (done) => {
    request(app)
      .get('/pdfs/Abeliophyllum.pdf')
      .expect('content-type', 'application/pdf')
      .expect(200, done);
  });

});

describe('GET /', () => {
  it('Should give 200 for / page', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /login', () => {
  it('Should give 200 for /login in GET', (done) => {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('POST /login', () => {
  it('Should set cookie', (done) => {
    request(app)
      .post('/login')
      .send('name=sourav')
      .expect('location', '/guest-book')
      .expect('set-cookie', /^sessionId=[\d]+/)
      .expect(302, done);
  });
});

describe('GET /guest-book', () => {
  let sessionId;

  beforeEach(() => {
    sessionId = sessions.create({ name: 'admin' });
  });

  it('Should serve guestbook page if cookie passed', (done) => {
    request(app)
      .get('/guest-book')
      .set('cookie', 'sessionId=' + sessionId)
      .expect(200, done);
  });

  it('Should serve login page if cookie not passed', (done) => {
    request(app)
      .get('/guest-book')
      .expect('location', '/login')
      .expect(302, done);
  });

  it('Should serve login page if cookie is invalid', (done) => {
    request(app)
      .get('/guest-book')
      .set('cookie', 'sessionId=1234')
      .expect('location', '/login')
      .expect(302, done);
  });
});

describe('GET /api/guestbook/comments', () => {
  let sessionId;

  beforeEach(() => {
    sessionId = sessions.create({ name: 'admin' });
  });

  it('Should return all comments', (done) => {
    request(app)
      .get('/api/guestbook/comments')
      .set('cookie', 'sessionId=' + sessionId)
      .expect('content-type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
});

describe('POST /api/guestbook/comments', () => {
  let sessionId;

  beforeEach(() => {
    sessionId = sessions.create({ name: 'admin' });
  });

  after(() => {
    if (fs.existsSync('./test/comments.json')) {
      fs.rmSync('./test/comments.json');
    }
  });

  it('Should add comment if sessionId is valid', (done) => {
    request(app)
      .post('/api/guestbook/comments')
      .set('cookie', 'sessionId=' + sessionId)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send('name=sourav&comment=hello+world')
      .expect(200, done);
  });

  it('Should serve login page if cookie not passed', (done) => {
    request(app)
      .post('/api/guestbook/comments')
      .expect('location', '/login')
      .expect(302, done);
  });

  it('Should serve login page if cookie is invalid', (done) => {
    request(app)
      .post('/api/guestbook/comments')
      .set('cookie', 'sessionId=1234')
      .expect('location', '/login')
      .expect(302, done);
  });
});

describe('GET /api/user', () => {
  let sessionId;

  beforeEach(() => {
    sessionId = sessions.create({ name: 'admin' });
  });

  it('Should return current user details', (done) => {
    request(app)
      .post('/api/user')
      .set('cookie', 'sessionId=' + sessionId)
      .expect(/{"name":"admin"}/)
      .expect(200, done);
  });

  it('Should return blank object if sessionId is not there', (done) => {
    request(app)
      .post('/api/user')
      .expect(/{}/)
      .expect(200, done);
  });
});