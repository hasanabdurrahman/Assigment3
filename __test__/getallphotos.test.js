const request = require('supertest');
const app = require('../app');
const { Photo, User } = require('../models');

let authToken; 

beforeAll(async () => {
  
  const user = await User.create({
    username: 'hasan123',
    email: 'hasan123@gmail.com',
    password: 'hasan123',
  });

  // Log in and get a token
  const loginResponse = await request(app)
    .post('/users/login')
    .send({
      email: 'hasan123@gmail.com',
      password: 'hasan123', 
    });

  authToken = loginResponse.body.token;
});

afterAll(async () => {
 
  await Photo.destroy({ where: {} });
  await User.destroy({ where: {} });
  
});

describe('GET /photos', () => {
    it('should get all photos and return 200 status', (done) => {
      request(app)
        .get('/photos')
        .set('Authorization', `Bearer ${authToken}`) // Set the authorization header with the token
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          
          done();
        });
    });
  
    it('should return 401 status if not authenticated', (done) => {
      request(app)
        .get('/photos')
        .expect(401)
        .end((err, res) => {
          if (err) done(err);
          
          done();
        });
    });
  });