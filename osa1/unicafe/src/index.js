import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad

  if (sum === 0) {
    return <p>Ei yhtään palautetta annettu</p>
  }

  const average = (good - bad) / sum
  const positive = good / sum * 100 + " %"
 
  return (
    <table>
      <tbody>
      <Statistic text="hyvä" value ={good} />
      <Statistic text="neutraali" value ={neutral} />
      <Statistic text="huono" value ={bad} />
      <Statistic text="yhteensä" value ={sum} />
      <Statistic text="keskiarvo" value ={average} />
      <Statistic text="positiivisia" value ={positive}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0) 

  return (
    <div>
      <h2>anna palautetta</h2>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="hyvä"/>
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutraali"/>
        <Button handleClick={() => setBad(bad + 1)} text="huono"/>
      </div>      
      <h2>statistiikka</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

