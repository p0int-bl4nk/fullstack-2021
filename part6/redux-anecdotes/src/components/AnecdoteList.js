import {useDispatch, useSelector} from "react-redux";
import {actionIncrementVote} from "../reducers/anecdoteReducer";
import {actionShowNotification} from "../reducers/notificationReducer";
import Filter from "./Filter";
import React from "react";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state
    .anecdotes
    .filter(a => a.content.toLowerCase().includes(state.filter))
    .sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const vote = ({id, content}) => {
    dispatch(actionIncrementVote(id))
    dispatch(actionShowNotification(`You voted '${content}'`))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList