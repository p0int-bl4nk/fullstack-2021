import {actionAddAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(actionAddAnecdote(content));
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