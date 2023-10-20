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

describe('POST /photos', () => {
  it('should create a photo and return 200 status', (done) => {
    request(app)
      .post('/photos')
      .set('Authorization', `Bearer ${authToken}`) // Set authorization header with token
      .send({
        title: 'Create Photo',
        caption: 'Testing Create Photo',
        image_url: 'https://linkimage.com/foto.jpg',
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        done();
      });
  });

  it('should return 401 status if not authenticated', (done) => {
    request(app)
      .post('/photos')
      .send({
        title: 'Create Photo',
        caption: 'Testing Create Photo',
        image_url: 'https://linkimage.com/foto.jpg',
      })
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
    
        done();
      });
  });
});
