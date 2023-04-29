import {Request, Response } from 'express';
import User, { isUser } from '../../models/userModel';
import Post, { isPost } from '../../models/postModel';

interface Comment {
  createdBy: string;
  comment: string;
  date: string;
}

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const tagsArr = req.body.tags.split(' ')
  try {
    const newPost: isPost = new Post({
      id: req.body.id,
      title: req.body.title,
      description: req.body.quillValue,
      image: req.body.image,
      updates: req.body.updates,
      author: req.body.author,
      createdBy: req.body.createdBy,
      date: req.body.date,
      chat: [],
      tags: tagsArr,
      followers: []
    })
    await newPost.save()
    console.log('Posted')

    const user = await User.findById(req.body.user._id)
    if (!user) {
      res.status(401).send({message: 'user does not exist' });
      return;
    }
    user.createdPosts.push(newPost)
    await user.save()

    res.status(201).send({ newPost })
  } catch (error) {
    console.log('Error in controller', error)
    res.status(400).send({ error, message: 'Could not create post' })
  }
}

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find({})
    if (posts.length === 0) {
      res.status(400).send({ message: 'cannot find posts' })
    } else {
      res.status(201).send({ posts })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot find posts' })
  }
}

export const getPostsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findOne({ id: req.params.id })
    if (!post) {
      res.status(400).send({ message: 'cannot find post' })
    } else {
      res.status(201).send({ post })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot find post' })
  }
}

export const followProject = async (req: Request, res: Response): Promise<void> => {
  const project = req.body.project.id
  try {
    const user = await User.findOne({ _id: req.body.user._id })
    if (!user) {
      res.status(401).send({message: 'user does not exist' });
      return;
    }
    user.following.push(project)

    const post = await Post.findOne({ id: project })
    if (!post) {
      res.status(401).send({message: 'post does not exist' });
      return;
    }
    post.followers.push(user._id)

    await user.save()
    res.status(201).send({ user })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot follow' })
  }
}

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Post.findOne({ id: req.params.id })
    const newUpdate = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.quillValue,
      date: req.body.date,
      image: req.body.image,
      video: req.body.video,
      chat: []
    }
    if (!project) {
      res.status(400).send({ message: 'cannot update' })
      return;
    }

    project.updates.push(newUpdate)

    await project.save()

    res.status(201).send({ newUpdate })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot update' })
  }
}


export const followingProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(400).send({ message: 'cannot get following' })
    } else {
      const following = user.following
      const projects = await Post.find({ id: { $in: following } })
      res.status(201).send({ projects })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot get following' })
  }
}

export const personalProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(400).send({ message: 'cannot get your projects' })
      return;
      } 
    const created = user.createdPosts
    const projects = await Post.find({ _id: { $in: created } })

    res.status(201).send({ projects })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot get your projects' })
  }
}

export const postComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Post.findOne({ id: req.body.ProjectId })
    if (!project){ 
      res.status(400).send({ message: 'cannot post comment' })
      return;
    }
    const newComment: Comment = {
      createdBy: req.body.createdBy,
      comment: req.body.comment,
      date: req.body.date
    }

    project.chat.push(newComment)
    project.save()

    res.status(201).send({ project })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot post comment' })
  }
}