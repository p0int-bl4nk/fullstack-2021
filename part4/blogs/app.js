const mongoose = require("mongoose");
const {MONGODB_URI} = require("./utils/config");
const logger = require("./utils/logger");
const express = require('express');
const cors = require("cors");
require('express-async-errors');
const middleware = require("./utils/middlerware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require('./controllers/users');
const loginRouter = require("./controllers/login");
const app = express();


logger.info('Connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB."))
  .catch((err) => logger.error('error connecting to MongoDB:', err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'test') {
  const testRouter = require("./controllers/testing");
  app.use('/api/testing', testRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;