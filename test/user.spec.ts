import request from 'supertest';
import app from '../src/app'

describe('Simple test case', () => {
  it('Add two numbers', () => {
    expect(2 + 2).toBe(4);
  });
});

describe('Route test', () => {
  it('get any specified route', async () => {
    const res = await request(app).get('/api/v1/healthchec');
    expect(res.status).toEqual(200);
  });
});





describe('User authentication', () => {
  describe('Signup', () => {
    it('should register user', async () => {
      const res = await request(app)
        .post('/api/v1/user/signup')
        .send({
          email: 'gallery@gmail.com',
          password: '123456',
        })
        .expect(200)

      expect(res.body).toHaveProperty('success', true)
    })

    it('should fail if user already exists', async () => {
      await request(app)
        .post('/api/v1/user/signup')
        .send({
          email: 'galleryapp@gmail.com',
          password: '123456',
        })
        .expect(400)
    })
  })

  describe('Login', () => {
    it('should log in a user', async () => {
      const res = await request(app)
        .post('/api/v1/user/login')
        .send({
          email: 'galleryapp@gmail.com',
          password: '123456',
        })
        .expect(200)

      expect(res.body).toHaveProperty('success', true)
    })

    it('should fail on invalid crentials', async () => {
      await request(app)
        .post('/api/v1/user/login')
        .send({
          email: 'galleryapp@gmail.com',
          password: '123457',
        })
        .expect(400)
    })
  })
})



