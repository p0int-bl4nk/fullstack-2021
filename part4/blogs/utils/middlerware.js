const logger = require("./logger");
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const mongoose = require('mongoose');

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'Unknown endpoint'});
};

const errorHandler = (error, req, res, next) => {
  logger.error(error);
  if (error.name === 'CastError')
    res.status(400).send({error: 'malformed id'});
  else if (error.name === 'ValidationError' || error.code === 11000)
    res.status(400).json({error: error.message});
  else if (error.name === 'JsonWebTokenError')
    res.status(401).json({error: 'invalid token'});
  else
    next(error);
};

const requestLogger = morgan((tokens, req, res) => {
  logger.info('Method:', req.method);
  logger.info('Path:', req.path);
  logger.info('Body:', req.body);
  logger.info('------');

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ');
});

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!(req.token && decodedToken.id))
    return res
      .status(401)
      .json({error: 'token missing or invalid'});

  const user = await User.findById({_id: decodedToken.id});
  if (user)
    req.user = user;

  next();
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor
};