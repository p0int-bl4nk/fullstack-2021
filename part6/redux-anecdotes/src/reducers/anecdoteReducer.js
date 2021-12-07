import anecdotes from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'INCREMENT_VOTE':
      return state.map(a =>
        a.id === action.data.id ? action.data : a
      )
    case 'ADD_ANECDOTE':
      return state.concat([action.data]);
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
}

export const actionIncrementVote = (anecdote) => {
  return async dispatch => {
    const _anecdote = await anecdotes.update(
      {
        ...anecdote,
        votes: anecdote.votes + 1
      }
    )
    dispatch({
      type: 'INCREMENT_VOTE',
      data: _anecdote
    })
  }
}

export const actionAddAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdotes.create(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      data
    })
  }
}

export const actionInitAnecdotes = () => {
  return async dispatch => {
    const data = await anecdotes.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data
    })
  }
}

export default anecdoteReducer