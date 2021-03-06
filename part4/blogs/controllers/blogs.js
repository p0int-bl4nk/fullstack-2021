const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');
const middleware = require('../utils/middlerware');

blogsRouter.get('/', async (req, res) => {
  const result = await Blog
    .find({})
    .populate('user', {
      name: 1,
      username: 1
    });

  res.send(result);
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog)
    res.json(blog);
  else
    res.status(404).end();
});

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  if (!req.body.title || !req.body.url) {
    return res.status(400).send({error: `'title' and/or 'url' is missing`});
  }

  req.body.user = req.user.id;
  const savedBlog = await new Blog(req.body).save();
  await User.updateOne(
    {
      id: req.user.id
    }, {
      $push: {
        blogs: [savedBlog.id]
      }
    }
  );
  delete req.user.blogs;
  savedBlog.user = req.user;
  // console.log('save saved', savedBlog);
  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() === req.user.id.toString())
    await Blog.deleteOne({_id: req.params.id});
  else
    return res
      .status(401)
      .json({error: 'current user does not have permission to delete this blog'});

  res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
  const user = req.body.user;
  req.body.user = user.id;
  const response = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  response.user = user;
  res.json(response);
});

blogsRouter.post('/:id/comments', async (req, res) => {
  const id = req.params.id;
  const comment = req.body.comment;
  await Blog.findByIdAndUpdate(
    id,
    {
      $push: {
        comments: [comment]
      }
    }
  );
  res.sendStatus(201);
})

module.exports = blogsRouter;

