const supertest = require('supertest');
const express = require('express');
const Post = require('../models/postModel.js')
const User = require('../models/userModel.js')
const mongoose = require('mongoose');
const router = require('../routes/router.js');
const uri = 'mongodb+srv://rsmikesahbaz:1234@legacy-project-cluster.8v0cpss.mongodb.net/test';

const app = express();
app.use(express.json());
app.use(router);
const request = supertest(app);

beforeEach(async () => {
  await User.deleteOne({email: 'mikesmith@email.com'})
})

afterEach( async () => {
  await Post.deleteMany();
})

describe('createPost', () => {
  let server: any;
  let db;

  beforeAll(async () => {
    db = await mongoose.connect(uri)
    await User.deleteOne({email: 'mikesmith@email.com'})
  })

  afterEach( async () => {
    await Post.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  })


  it('should give a 400 status if it cannot create a post', async () => {
    const postData = {
      id: '',
      title: '',
      description: '',
      image: '',
      updates: {},
      author: '',
      createdBy: { user: { _id: '' } },
      date: '',
      tags: 'tag1 tag2 tag3',
    };
    const res = await request.post('/create').send(postData);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Could not create post')
  })

  it('should give a 201 status and the newPost data if it successfully creates a post', async () => {
    const userData = {
      firstName: 'Mike',
      secondName: 'Smith',
      email: 'mikesmith@email.com',
      password: '1234',
    }
    const res1 = await request.post('/register').send(userData);
    console.log('THIS IS RES FOR USER', res1.body);
    // const myTestUser = await User.create(userData);
    // console.log('THIS IS MY TEST USER:', myTestUser);

    const postData = {
      id: 'testId',
      title: 'Test title',
      quillValue: 'Test description',
      image: 'testImage',
      updates: {
        id: 'ID',
        title: 'update',
        description: 'updateDesc',
        date: 'Date',
        chat: ['Hello'],
      },
      author: 'Test author',
      createdBy: res1.body.newUser,
      date: '2023-01-01',
      tags: 'tag1 tag2',
      user: { _id: res1.body.newUser._id}
    };

    const res = await request.post('/create').send(postData);
    expect(res.status).toBe(201);
    expect(res.body.newPost).toBeDefined();
  })
})



describe('getPosts Controller', () => {
  let server: any;
  let db;

  beforeAll(async () => {
    // server = app.listen(3001);
    db = await mongoose.connect(uri)
    await User.deleteOne({email: 'mikesmith@email.com'})
    await Post.deleteMany({});
  })

  afterEach( async () => {
    // await Post.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  })

  it('should return a status of 400 if the post does not exist', async () => {
    const res = await request.get('/posts').send();
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('cannot find posts');
  })

  it('should return a status of 201 and all of the posts data if there are posts', async () => {
    const userData = {
      firstName: 'Mike',
      secondName: 'Smith',
      email: 'mikesmith@email.com',
      password: '1234',
    }
    const res1 = await request.post('/register').send(userData);
    const postData = {
      id: 'testId',
      title: 'Test title',
      quillValue: 'Test description',
      image: 'testImage',
      updates: {
        id: 'ID',
        title: 'update',
        description: 'updateDesc',
        date: 'Date',
        chat: ['Hello'],
      },
      author: 'Test author',
      createdBy: res1.body.newUser,
      date: '2023-01-01',
      tags: 'tag1 tag2',
      user: { _id: res1.body.newUser._id}
    };
    const res = await request.post('/create').send(postData);
    const getRes = await request.get('/posts').send();
    expect(getRes.status).toBe(201);
    expect(getRes.body.posts).toBeDefined();
  })
})




describe('getPostsById Controller', () => {
  let server: any;
  let db;

  beforeAll(async () => {
    db = await mongoose.connect(uri)
    await User.deleteOne({email: 'mikesmith@email.com'})
    await Post.deleteMany({});
  })

  afterEach( async () => {
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return a status code of 400 if it cannot find the post by ID', async () => {
    const postIdData = { id: 123}
    const res = await request.get(`/posts/${postIdData.id}`).send()
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('cannot find post');
  })

  it('should return a status code of 201 if the post with the ID exists', async () => {
    const userData = {
      firstName: 'Mike',
      secondName: 'Smith',
      email: 'mikesmith@email.com',
      password: '1234',
    }
    const res1 = await request.post('/register').send(userData);
    const postData = {
      id: '123',
      title: 'Test title',
      quillValue: 'Test description',
      image: 'testImage',
      updates: {
        id: 'ID',
        title: 'update',
        description: 'updateDesc',
        date: 'Date',
        chat: ['Hello'],
      },
      author: 'Test author',
      createdBy: res1.body.newUser,
      date: '2023-01-01',
      tags: 'tag1 tag2',
      user: { _id: res1.body.newUser._id}
    };
    const res = await request.post('/create').send(postData);
    const getRes = await request.get(`/posts/${postData.id}`).send();
    expect(getRes.status).toBe(201);
    expect(getRes.body.post).toBeDefined();
  })
})

describe('followProject Controller', () => {
  let server: any;
  let db;

  beforeAll(async () => {
    db = await mongoose.connect(uri)
    await User.deleteOne({email: 'mikesmith@email.com'})
    await Post.deleteMany({});
  })

  afterEach( async () => {
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return a status code of 400', async () => {
    const followProjectData = {
      user: { _id: 'nonexistentUserId' },
      project: { id: 'nonexistentProjectId' },
    };
    const res = await request.post('/posts/follow').send(followProjectData);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('cannot follow');
  })


  it('should return a status code of 201', async () => {
    const userData = {
      firstName: 'Mike',
      secondName: 'Smith',
      email: 'mikesmith@email.com',
      password: '1234',
    }
    const res1 = await request.post('/register').send(userData);
    
    const postData = {
      id: '123',
      title: 'Test title',
      quillValue: 'Test description',
      image: 'testImage',
      updates: {
        id: 'ID',
        title: 'update',
        description: 'updateDesc',
        date: 'Date',
        chat: ['Hello'],
      },
      author: 'Test author',
      createdBy: res1.body.newUser,
      date: '2023-01-01',
      tags: 'tag1 tag2',
    };
    const postRes = await request.post('/create').send(postData);
    const followProjectData = {
      user: { _id: res1.body.newUser._id },
      project: { id: postData.id }
    }
    const res = await request.post('/posts/follow').send(followProjectData);
    expect(res.status).toBe(201);
    expect(res.body.user).toBeDefined();
  })
})

describe('updateProject Controller', () => {
  let server: any;
  let db;

  beforeAll(async () => {
    db = await mongoose.connect(uri)
    await User.deleteOne({email: 'mikesmith@email.com'})
    await Post.deleteMany({});
  })

  afterEach( async () => {
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });


  it('should return a status code of 400 if it cannot update the project', async () => {
    const newUpdate = {
      id: 'New ID',
      title: 'New Title',
      description: 'new Desc',
      date: 'new Date',
      image: 'new image',
      video: 'new video',
    }
    const res = await request.post(`/update/${9999}`).send(newUpdate);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('cannot update');
  })

  it('should return a status code of 201 and the newUpdate data if successful', async () => {
    const newUpdate = {
      id: 'New ID',
      title: 'New Title',
      quillValue: 'new Desc',
      date: 'new Date',
      image: 'new image',
      video: 'new video',
    }

    const userData = {
      firstName: 'Emma',
      secondName: 'Smith',
      email: 'mikesmith@email.com',
      password: '1234',
    }
    const res1 = await request.post('/register').send(userData);
    console.log('THIS IS THE USER: ', res1.body.newUser);
    const postData = {
      id: '123',
      title: 'Test title',
      quillValue: 'Test description',
      image: 'testImage',
      updates: {
        id: 'ID',
        title: 'update',
        description: 'updateDesc',
        date: 'Date',
        chat: ['Hello'],
      },
      author: 'Test author',
      createdBy: res1.body.newUser,
      date: '2023-01-01',
      tags: 'tag1 tag2',
      user: { _id: res1.body.newUser._id }
    };
    console.log('THIS IS THE POST DATA: ', postData);
    const res = await request.post('/create').send(postData);

    const updateRes = await request.post(`/update/${postData.id}`).send(newUpdate);
    expect(updateRes.status).toBe(201);
    expect(updateRes.body.newUpdate).toBeDefined();
  })
})

describe('Following Projects Controller', () => {
  let server: any;
  let db;

  beforeAll(async () => {
    db = await mongoose.connect(uri)
    await User.deleteOne({email: 'mikesmith@email.com'})
    await Post.deleteMany({});
  })

  afterEach( async () => {
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return a status of 400 when it cant get user following', async () => {

    const badUserId = 123;
    const res = await request.get(`/posts/following/${badUserId}`).send()
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('cannot get following');
  })

  it('should return a status code of 201 and projects data when succesful', async () => {
    const userData = {
      firstName: 'Emma',
      secondName: 'Smith',
      email: 'mikesmith@email.com',
      password: '1234',
    }
    const res1 = await request.post('/register').send(userData);
    const postData = {
      id: '1235',
      title: 'Test title',
      quillValue: 'Test description',
      image: 'testImage',
      updates: {
        id: 'ID',
        title: 'update',
        description: 'updateDesc',
        date: 'Date',
        chat: ['Hello'],
      },
      author: 'Test author',
      createdBy: res1.body.newUser,
      date: '2023-01-01',
      tags: 'tag1 tag2',
      user: { _id: res1.body.newUser._id }
    };
    const res = await request.post('/create').send(postData);
    const followData = {
      project: { id: postData.id },
      user: { _id: res1.body.newUser._id },
    }
    const followRes = await request.post(`/posts/follow`).send(followData)
    expect(followRes.status).toBe(201);

    const followingProjectsRes = await request.get(`/posts/following/${res1.body.newUser._id}`);
    expect(followingProjectsRes.status).toBe(201);
    expect(followingProjectsRes.body.projects).toBeDefined();
  })
})

describe('personalProjects Controller', () => {
  let server: any;
  let db;

  beforeAll(async () => {
    db = await mongoose.connect(uri)
    await User.deleteOne({email: 'mikesmith@email.com'})
    await Post.deleteMany({});
  })

  afterEach( async () => {
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return a status code of 400 when it cant get your projects', async () => {
    const badUserId = 9876;
    const res = await request.get(`/posts/personal/${badUserId}`).send();
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('cannot get your projects');
  })

  it('should return a status code of 201 and projects data if successful', async () => {
    const userData = {
      firstName: 'Emma',
      secondName: 'Smith',
      email: 'mikesmith@email.com',
      password: '1234',
    }
    const userRes = await request.post('/register').send(userData);
    console.log(userRes.body);
    const res = await request.get(`/posts/personal/${userRes.body.newUser._id}`).send();
    expect(res.status).toBe(201);
    expect(res.body.projects).toBeDefined();
  })
})

describe('postComment Projects', () => {
  let server: any;
  let db;

  beforeAll(async () => {
    db = await mongoose.connect(uri)
    await User.deleteOne({email: 'mikesmith@email.com'})
    await Post.deleteMany({});
  })

  afterEach( async () => {
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return a status code of 400 if it cant post a comment', async () => {
    const projectId = '7654';
    const res = await request.post(`/posts/comments`).send(projectId);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('cannot post comment');
  })

  it('should return a status code of 201 and the project data if successful', async () => {
    const userData = {
      firstName: 'Emma',
      secondName: 'Smith',
      email: 'mikesmith@email.com',
      password: '1234',
    }
    const userRes = await request.post('/register').send(userData);

    const postData = {
      id: '1235',
      title: 'Test title',
      quillValue: 'Test description',
      image: 'testImage',
      updates: {
        id: 'ID',
        title: 'update',
        description: 'updateDesc',
        date: 'Date',
        chat: ['Hello'],
      },
      author: 'Test author',
      createdBy: userRes.body.newUser,
      date: '2023-01-01',
      tags: 'tag1 tag2',
      user: { _id: userRes.body.newUser._id }
    };
    const res = await request.post('/create').send(postData);
    const newComment = {
      ProjectId: postData.id,
      createdBy: userRes.body.newUser,
      comment: 'Hey here is a comment',
      date: 'Hey here is a date',
    }
    const commentRes = await request.post(`/posts/comments`).send(newComment);
    expect(commentRes.status).toBe(201);
    expect(commentRes.body.project).toBeDefined();
  })
})