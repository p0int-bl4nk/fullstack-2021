import {actionAddAnecdote} from "../reducers/anecdoteReducer";
import {connect} from "react-redux";
import {actionShowNotification} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.actionAddAnecdote(content)
    props.actionShowNotification(`You created a new anecdote, '${content}'`)
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

const mapDispatchToProps = {
  actionShowNotification,
  actionAddAnecdote
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);

export default ConnectedAnecdoteForm;