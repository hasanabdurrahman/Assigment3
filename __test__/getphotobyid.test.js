const request = require('supertest');
const app = require('../app');
const { Photo, User } = require('../models');

let authToken; 

beforeAll(async () => {
  // Create a user and get a token
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

  // Buat foto 
  const photo = await Photo.create({
    title: 'Example Photo',
    caption: 'Testing Get Photo by ID',
    image_url: 'https://linkimage.com/example.jpg',
  });

// Create a new Variable containing Data and Id
  createdPhotoId = photo.id;
  
});

describe('GET /photos/:id', () => {
    it('should return a photo by ID with 200 status', (done) => {
      request(app)
        .get(`/photos/${createdPhotoId}`) // Use createdPhotoId
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should return 401 status if not authenticated', (done) => {
        request(app)
          .get(`/photos/${createdPhotoId}`) // Use createdPhotoId
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

    it('should return 404 status if photo does not exist', (done) => {
    const nonExistentPhotoId = 999;

      request(app)
        .get(`/photos/${createdPhotoId}/${nonExistentPhotoId}`) 
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  
    afterAll(async () => {
      // Clean up data after testing
      await Photo.destroy({ where: {} });
      await User.destroy({ where: {} });
    });
  });  