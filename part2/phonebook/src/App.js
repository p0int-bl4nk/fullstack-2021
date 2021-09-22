import React, { useState } from 'react';

const DisplayPhoneBook = ({list}) => {
  return (
    <>
      <h3>Numbers</h3>
      {
        list.map(person => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
          />
        ))
      }
    </>
  )
}

const Person = ({name, number}) => {
  return (
    <p>{name} {number}</p>
  )
}

const AddNewNumber = ({list, setList}) => {
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (list.some(person => person.name === newName)) {
      return alert(`${newName} is already added to the phonebook.`);
    }
    const newPerson = {
      id: list.length + 1,
      name: newName,
      number: newNumber
    };
    // debugger
    setList(prev => prev.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  return (
    <>
      <h3>Add a new number</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            name='name'
            value={newName}
            onChange={({target}) => setNewName(target.value)}
          />
        </div>
        <div>
          <label htmlFor='number'>Number:</label>
          <input
            name='number'
            value={newNumber}
            onChange={({target}) => setNewNumber(target.value)}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

const Filter = ({filter, setFilter}) => {
  return (
    <div>
      Filter shown with
      <input
        value={filter}
        onChange={({target}) => setFilter(target.value)}
      />
    </div>
  );
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [ filter, setFilter ] = useState('');

  const list = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <AddNewNumber list={persons} setList={setPersons} />
      <DisplayPhoneBook list={list} />
    </div>
  )
}

export default App