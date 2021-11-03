const usersRouter = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (req, res) => {
  const body = req.body;
  const saltValue = 10;
  const passwordHash = await bcrypt.hash(body.password, saltValue);

  if (!body.username || !body.password)
    return res
      .status(400)
      .send({error: `'username' and/or 'password' missing`});

  if (body.username.length < 3)
    return res
      .status(400)
      .send({error: `'username' must be at least 3 characters long`});

  if (body.password.length < 3)
    return res
      .status(400)
      .send({error: `'password' must be at least 3 characters long`});

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

usersRouter.get('/', async (req, res) => {
  const allUsers = await User
    .find({})
    .populate('blogs', {
      url: 1,
      title: 1,
      author: 1
    });

  res.json(allUsers);
});

module.exports = usersRouter;