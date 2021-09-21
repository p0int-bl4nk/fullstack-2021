import React, { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

const Stats = ({votes}) => {
  return (
    <p>has {votes} votes</p>
  )
}

const DisplayAnecdote = ({anecdote}) => {
  return (
    <p>{anecdote}</p>
  );
}

const DisplayHeading = ({text}) => {
  return (
    <h1>{text}</h1>
  );
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleNext = () => {
    const random = Math.random() * anecdotes.length;
    setSelected(Math.floor(random));
  }

  const handleVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] = votes[selected] + 1;
    setVotes(newVotes);
  }

  const getMaxVote = () => {
    return Math.max(...votes);
  }
  
  return (
    <div>
      <DisplayHeading text={'Anecdote of the day'}/>
      <DisplayAnecdote anecdote={anecdotes[selected]}/>
      <Button text={'Vote'} onClick={handleVotes}/>
      <Button text={'Next Anecdote'} onClick={handleNext}/>
      <Stats votes={votes[selected]}/>
      <DisplayHeading text={'Anecdote with most votes'} />
      <DisplayAnecdote anecdote={anecdotes[votes.findIndex(vote => vote === getMaxVote())]}/>
      <Stats votes={getMaxVote()} />
    </div>
  )
}

export default App;