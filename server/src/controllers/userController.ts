import {Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User, { isUser } from '../../models/userModel';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword || user.email !== email) {
      res.status(401).json({ message: 'Wrong email or password' })
    } else {
      res.status(201).send(user)
    }
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' })
  }
}


export const postUser = async (req: Request, res: Response): Promise<void> => {
  const hashPassword = await bcrypt.hash(req.body.password, 10)
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    try {
      const newUser: isUser = new User({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        email: req.body.email,
        password: hashPassword,
        picturePath: '',
        following: [],
        createdPosts: []
      })
      await newUser.save()
      console.log('succes')
      res.status(201).send({ newUser })
    } catch (error) {
      res.status(400).send({ error, message: 'Could not create user' })
    }
  }
  if (user) res.status(401).json({ message: 'email already in use' })
}
