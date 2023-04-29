const supertest = require('supertest');
const express = require('express');
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
const mongoose = require('mongoose');
const router = require('../routes/router.js');
const uri = 'mongodb+srv://rsmikesahbaz:1234@legacy-project-cluster.8v0cpss.mongodb.net/test';
const app = express();
app.use(express.json());
app.use(router);
const request = supertest(app);
let hashedPassword;

describe('getUser Controller', () => {
  let server: any;
  let db;
  beforeAll(async () => {
    db = await mongoose.connect(uri)
    await User.deleteOne({email: 'mikesmith@email.com' });
    hashedPassword = await bcrypt.hash('test-password', 10);
  })

  afterEach( async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  })
  
    it('should return 401 when the email or password are wrong', async () => {
      const email = 'user@exampletest.com';
      const password = 'testIncorrectPassword';
  
      const res = await request.post('/login', )
      .send({email, password})
  
      const user = await User.findOne({email, password: 'wrongPassword' })
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Username or password is incorrect');
    });
  
    it.only('should return 201 and user data when the email and password are correct', async () => {
      const userData = {
        firstName: 'Mike',
        secondName: 'Smith',
        email: 'mikesmith@email.com',
        password: 'test-password',
      }
      const registerRes = request.post('/register').send(userData);
      console.log('THIS IS THE REGISTER BODY: ', registerRes.body);
      const loginData = {
        email: userData.email,
        password: userData.password,
      }
      const res = await request.post('/login').send({email: userData.email, password: userData.password});
      expect(res.status).toBe(201);
      expect(res.body).toBe(res);
    });
});

describe('postUser Controller', () => {
  afterEach( async () => {
    await jest.resetAllMocks();
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  })

  it('should return 201 and new user data when the email is not in use already', async () => {
    const email = 'user@example2.com';
    const password = '1234';
    const newUser = {
      firstName: 'John',
      secondName: 'Doe',
      email: email,
      password: password,
    }
    const res = await request.post('/register', )
    .send({email, password})

    const user = await User.create(newUser)
    expect(res.status).toBe(201);
    expect(res.body.newUser).toBe(user);

  })

  it('should return 401 if the email is already in use', async () => {
    const originalEmail = 'user@example.com';
    const originalPassword = '4321';
    const user = await User.create({email: originalEmail, password: originalPassword})

    const email = 'user@example.com';
    const password = '1234';

    const res = await request.post('/register', )
    .send({email, password});

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('email already in use' );
  })

});
