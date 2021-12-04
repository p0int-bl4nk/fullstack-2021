import React, {useEffect} from 'react'
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import anecdotes from "./services/anecdotes";
import store from "./store";
import {actionInitAnecdotes} from "./reducers/anecdoteReducer";

const App = () => {
  useEffect(() => {
    anecdotes.getAll()
      .then((data) => {
        store.dispatch(actionInitAnecdotes(data))
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App