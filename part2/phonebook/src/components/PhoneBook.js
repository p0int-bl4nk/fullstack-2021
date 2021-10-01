import phonebookService from "../services/phonebookService";
import {useEffect, useState} from "react";
import Notification from "./Notification";
import notificationService from "../services/notificationService";

const DisplayPhoneBook = ({list, setList, setNotification}) => {
  const handleDelete = id => {
    const toDelete = list.find(person => person.id === id);
    if (window.confirm(`Delete '${toDelete.name}'?`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setList(list.filter(person => person.id !== id));

          notificationService
            .handleNotification({
              message: `'${toDelete.name}' has been deleted.`,
              type: 'success'
            }, setNotification);
        })
        .catch(error => {
          console.log('delete service error:', error);

          notificationService
            .handleNotification({
              message: `'${toDelete.name}' has already been removed from the server.`,
              type: 'error'
            }, setNotification);
          setList(list.filter(person => person.id !== id));
        });
    }
  }

  return (
    <>
      <h3>Numbers</h3>
      {
        list.map(person => (
          <div key={person.id}>
            <Person
              name={person.name}
              number={person.number}
            />
            <button
              type='button'
              onClick={() => handleDelete(person.id)}
            >
              Delete
            </button>
          </div>
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

const AddNewNumber = ({list, setList, setNotification}) => {
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let person = list.find(person => person.name === newName);
    let operation = 'add';
    if (person) {
      operation = window.confirm(
        `'${newName}' is already added to the phonebook. Do you want to replace the old number with the new one?`
      ) ? 'update' : 'discard';
    }
    const newPerson = {
      name: newName,
      number: newNumber
    };

    if (operation === 'add') {
      phonebookService
        .create(newPerson)
        .then((data) => {
          setList(prev => prev.concat(data));

          notificationService
            .handleNotification({
              message: `'${newName}' is successfully added to the phonebook.`,
              type: 'success'
            }, setNotification);
        })
        .catch((error) => console.log('create service error:', error));
    } else if (operation === 'update') {
      phonebookService
        .update(person.id, newPerson)
        .then(data => {
          setList(prev => prev.map(p => p.id === person.id ? data : p));

          notificationService
            .handleNotification({
            message: `${newName}'s number is successfully updated.`,
            type: 'success'
          }, setNotification);
        })
        .catch((error) => console.log('update service error:', error));
    } else {
      return;
    }
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

export default function Phonebook () {
  const [ notification, setNotification ] = useState({message: '', type: ''});
  const [ persons, setPersons ] = useState([]);
  useEffect(() => {
    phonebookService
      .getAll()
      .then((list) => {
        setPersons(list);
      })
      .catch((err) => {
        console.log('getAll api error', err);
        notificationService
          .handleNotification({
            message: `Error fetching phonebook from server!`,
            type: 'error'
          }, setNotification);
      });
  }, []);

  const [ filter, setFilter ] = useState('');

  const list = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        type={notification.type}
      />
      <Filter
        filter={filter}
        setFilter={setFilter}
      />
      <AddNewNumber
        list={persons}
        setList={setPersons}
        setNotification={setNotification}
      />
      <DisplayPhoneBook
        list={list}
        setList={setPersons}
        setNotification={setNotification}
      />
    </div>
  )
}