import {actionAddAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";
import {actionShowNotification} from "../reducers/notificationReducer";
import anecdotes from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const _new = await anecdotes.create(content);
    dispatch(actionAddAnecdote(_new));
    dispatch(actionShowNotification(`You created a new anecdote, '${content}'`))
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote'/>
        </div>
        <button
          type='submit'
        >
          create
        </button>
      </form>
    </>
  )
}
export default AnecdoteForm;