const Post = require('../models/postModel')
const User = require('../models/userModel')

exports.createPost = async (req, res) => {
  const tagsArr = req.body.tags.split(' ')
  try {
    const newPost = new Post({
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
    user.createdPosts.push(newPost)
    await user.save()

    res.status(201).send({ newPost })
  } catch (error) {
    console.log('Error in controller', error)
    res.status(400).send({ error, message: 'Could not create post' })
  }
}

exports.getPosts = async (req, res) => {
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

exports.getPostsById = async (req, res) => {
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

exports.followProject = async (req, res) => {
  const project = req.body.project.id
  try {
    const user = await User.findOne({ _id: req.body.user._id })
    user.following.push(project)

    const post = await Post.findOne({ id: project })
    post.followers.push(user._id)

    await user.save()
    res.status(201).send({ user })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot follow' })
  }
}

exports.updateProject = async (req, res) => {
  try {
    console.log('THIS IS THE ID : ', req.params.id)
    const project = await Post.findOne({ id: req.params.id })
    console.log('THIS IS A PROJECT', project)
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
      return res.status(400).send({ message: 'cannot update' })
    }

    project.updates.push(newUpdate)

    await project.save()

    res.status(201).send({ newUpdate })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot update' })
  }
}

exports.followingProjects = async (req, res) => {
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

exports.personalProjects = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(400).send({ message: 'cannot get your projects' })
    const created = user.createdPosts
    const projects = await Post.find({ _id: { $in: created } })

    res.status(201).send({ projects })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot get your projects' })
  }
}

exports.postComment = async (req, res) => {
  try {
    const project = await Post.findOne({ id: req.body.ProjectId })
    if (!project) return res.status(400).send({ message: 'cannot post comment' })
    const newComment = {
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
