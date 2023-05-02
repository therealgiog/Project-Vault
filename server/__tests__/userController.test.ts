const supertest = require('supertest');
const express = require('express');
import { before } from 'node:test';
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
let db;
let server: any;

beforeEach( async () => {
  await User.deleteOne({email: 'mikesmith@email.com' });
})

beforeAll( async () => {
  db = await mongoose.connect(uri);
})

afterEach( async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
})

describe('getUser Controller', () => {
  
    it('should return 401 when the email or password are wrong', async () => {
      const email = 'user@exampletest.com';
      const password = 'testIncorrectPassword';
  
      const res = await request.post('/login', )
      .send({email, password})
  
      const user = await User.findOne({email, password: 'wrongPassword' })
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Username or password is incorrect');
    });
  
    it('should return 201 and user data when the email and password are correct', async () => {
      const userData = {
        firstName: 'Mike',
        secondName: 'Smith',
        email: 'mike@email.com',
        password: 'testpassword',
      }
      const registerRes = await request.post('/register').send(userData);

      const loginData = {
        email: userData.email,
        password: userData.password,
      }
      const res = await request.post('/login').send({email: userData.email, password: userData.password});
      expect(res.status).toBe(201);
    });
});

describe('postUser Controller', () => {

  it('should return 201 and new user data when the email is not in use already', async () => {
    const newUser = {
      firstName: 'Mike',
      secondName: 'Smith',
      email: 'mike123@email.com',
      password: 'testpassword',
    }
    const res = await request.post('/register').send(newUser)
    console.log(res.body);

    
    expect(res.status).toBe(201);
    expect(res.body.newUser).toBeDefined();

  })

  it('should return 401 if the email is already in use', async () => {
    const newUser = {
      firstName: 'Mike',
      secondName: 'Smith',
      email: 'mike1234@email.com',
      password: 'testpassword',
    }
    const originalRes = await request.post('/register').send(newUser)

   const sameUser = {
    firstName: 'Mike',
    secondName: 'Smith',
    email: 'mike1234@email.com',
    password: 'testpassword',
   }

    const res = await request.post('/register').send(sameUser);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('email already in use' );
  })

});
