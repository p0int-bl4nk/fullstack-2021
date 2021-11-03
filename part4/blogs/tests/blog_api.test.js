const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs');
const User = require('../models/users');
const {initialBlogs, blogsInDb} = require('./test_helper');

const api = supertest(app);

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  // await Blog.insertMany(initialBlogs);
  await api
    .post('/api/users')
    .send({
      "username": "stellar234",
      "name": "stellar",
      "password": "p0int-bl4nk"
    });

  const response = await api
    .post('/api/login')
    .send({
      username: 'stellar234',
      password: 'p0int-bl4nk'
    });

  // console.log('response::::::::', response.body);
  token = response.body.token;
});

describe('when there are initially some blogs savedBlog', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('there is an id property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});


describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const allBlogs =  await blogsInDb();
    const firstBlog = JSON.parse(JSON.stringify(allBlogs[0]));
    const returnedBlog = await api.get(`/api/blogs/${firstBlog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(returnedBlog.body).toEqual(firstBlog);
  });

  test('fails with status 400, with invalid id', async () => {
    const id = '12313-i9f2j4i';
    await api.get(`/api/blogs/${id}`)
      .expect(400);
  });

  test('fails with status 404 for a non-existent id', async () => {
    const id = mongoose.Types.ObjectId();
    await api.get(`/api/blogs/${id}`)
      .expect(404);
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Who cares?',
      author: 'Patrick Something',
      url: 'http://www.u.arizona.edu',
      likes: 5
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length + 1);
  });

  test('likes is set to 0, if likes is missing', async () => {
    const blogWithNoLikes = {
      title: 'Something',
      author: 'Someone',
      url: 'https://i.dont.know'
    };

    const response = await api
      .post('/api/blogs')
      .send(blogWithNoLikes);

    expect(response.body).toHaveProperty('likes', 0);
  });

  test('fails with status code 400, if title is missing', async () => {
    const blogWithNoTitle = {
      author: 'Someone',
      url: 'https://i.dont.know',
      likes: 10
    };

    await api
      .post('/api/blogs')
      .send(blogWithNoTitle)
      .expect(400);
  });

  test('fails with status code 400, if url is missing', async () => {
    const blogWithNoUrl = {
      title: 'something',
      author: 'Someone',
      likes: 10
    };

    await api
      .post('/api/blogs')
      .send(blogWithNoUrl)
      .expect(400);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with a valid id', async () => {
    const allBlogs = await blogsInDb();
    await api.delete(`/api/blogs/${allBlogs[0].id}`)
      .expect(204);
  });

  test('fails with status code 400, if id is invalid', async () => {
    const id = '3423490h3rf203uj0pjda';
    await api.delete(`/api/blogs/${id}`)
      .expect(400);
  });
});

describe('updating a blog', () => {
  test('succeeds with a valid id', async () => {
    const allBlogs = await blogsInDb();
    const firstBlog = JSON.parse(JSON.stringify(allBlogs[0]));
    firstBlog.likes = 9999;
    const response = await api.put(`/api/blogs/${firstBlog.id}`)
      .send(firstBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toEqual(firstBlog);
  });

  test('fails with status code 400, if id is invalid', async () => {
    const id = '3423490h3rf203uj0pjda';
    const blog = {
      url: 'https://something.com',
      title: 'update check',
      author: 'mongoose',
      likes: 69
    };
    await api.put(`/api/blogs/${id}`)
      .send(blog)
      .expect(400);
  });
});

describe('authorization based test', () => {
  test('add blog with authorization', async () => {
    const blog = {
      url: 'https://something.com',
      title: 'update check',
      author: 'mongoose',
      likes: 69
    };
    await api.post(`/api/blogs`)
      .set('Authorization', `bearer ${token}`)
      .send(blog)
      .expect(201);
  })
});



afterAll(async () => {
  await mongoose.connection.close();
});