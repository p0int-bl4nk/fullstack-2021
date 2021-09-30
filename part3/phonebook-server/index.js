const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());

const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    `${JSON.stringify(req.body)}`
  ].join(' ')
});
app.use(logger);

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
];

const generateId = () => {
  const max = 100000;
  const min = 999999;
  while (true) {
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!persons.some(person => person.id === randomId)) {
      return randomId;
    }
  }
}

/*const loggerMiddleware = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  console.log('---');
  next();
}

app.use(loggerMiddleware);*/

app.get('/info', (req, res) => {
  const response = `
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date()}</p>
  `;
  res.send(response);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    return res.json(person);
  }
  res.status(404).end();
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: `name missing`
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: `number missing`
    });
  }

  if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons.push(newPerson);

  res.json(newPerson);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
