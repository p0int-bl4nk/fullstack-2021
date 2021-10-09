require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    `${JSON.stringify(req.body)}`
  ].join(' ');
});
app.use(logger);


/**
 * get all records
 */
app.get('/api/persons', (req, res, next) => {
  Person
    .find({})
    .then(response => res.json(response))
    .catch((error) => next(error));
});

/**
 * get a record by id
 */
app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if (person)
        res.json(person);
      else
        res.status(404).end();
    })
    .catch((error) => next(error));
});

/**
 * delete a record by id
 */
app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
});

/**
 * save a new record
 */
app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then(response => res.json(response))
    .catch((error) => next(error));

});

/**
 * update a record by id
 */
app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updated) => res.json(updated))
    .catch((error) => next(error));
});

/**
 * get current DB state
 */
app.get('/info', (req, res, next) => {
  Person
    .find({})
    .then(people => {
      const response = `
        <p>Phonebook has info for ${people.length} people.</p>
        <p>${new Date()}</p>
      `;
      res.send(response);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError' || error.code === 11000) {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
