import React, {useEffect} from 'react'
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import {actionInitAnecdotes} from "./reducers/anecdoteReducer";
import {useDispatch} from "react-redux";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionInitAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App