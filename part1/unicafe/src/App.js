import React, { useState } from 'react';

const Button = ({text, handleClick}) => {
    // debugger
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Stats = ({type, data}) => {
  return (
    <tr>
      <td><p>{type}:</p></td>
      <td><p>{data}</p></td>
    </tr>
  )
}

const DisplayTitle = ({text}) => {
  return <h1>{text}</h1>
}

const Statistics = (props) => {
  const {good, bad, neutral} = props.data;
  const total = good + neutral + bad;
  const positivePercentage = good * 100 / total;
  
  return (
    <div>
      <DisplayTitle text={'Statistics'}/>
      {
        total === 0
        ? <p>No feedback given</p>
        : <table>
            <tbody>
              <Stats type={'Good'} data={good}/>
              <Stats type={'Neutral'} data={neutral}/>
              <Stats type={'Bad'} data={bad} />
              <Stats type={'All'} data={total} />
              <Stats type={'Average'} data={(good - bad) / total}/>
              <Stats type={'Positive'} data={positivePercentage + ' %'}/>
            </tbody>
          </table>
      }
    </div>
  )
}

const Feedback = (props) => {
  const {setGood, setNeutral, setBad} = props.data;
  return (
    <div>
      <DisplayTitle text={'Give feedback'} />
      <Button text={'Good'} handleClick={() => setGood(prev => ++prev)}/>
      <Button text={'Neutral'} handleClick={() => setNeutral(prev => ++prev)}/>
      <Button text={'Bad'} handleClick={() => setBad(prev => ++prev)}/>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <>
          <Feedback data={{setGood, setBad, setNeutral}} />
          <Statistics data={{good, bad, neutral}}/>
      </>
  )
}

export default App;
