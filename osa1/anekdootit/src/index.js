import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.ceil(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const getMaxIndex = () => {
    let max = votes[0]
    let maxIndex = 0

    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > max) {
        max = votes[i]
        maxIndex = i
      }
    }
    return maxIndex
  }

  const setAnecdote = () => (
    setSelected(getRandomInt(0, anecdotes.length - 1))
  )

  const addVote = (selected) => {
    const newVotes = [...votes]
    newVotes[selected]++
    return setVotes(newVotes)
  }

  let maxIndex = getMaxIndex()

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>    
        <p>{anecdotes[selected]}<br/>
           has {votes[selected]} votes</p>
      </div>
      <div>
        <button onClick={() => addVote(selected)}>vote</button>
        <button onClick={() => setAnecdote()}>next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <div>
        <p>{anecdotes[maxIndex]}<br/>
           has {votes[maxIndex]} votes</p>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));