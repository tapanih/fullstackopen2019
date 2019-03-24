import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Countries from './components/Countries'

const Filter = ({filter, handleFilter}) =>
  <input value={filter} onChange={handleFilter} />


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [button, setButton] = useState(-1)

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
  },[])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setButton(-1)
  }

  const handleClick = (countryCode) => () => {
    setButton(countryCode)
  }

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <div>
        <Countries countries={countries} filter={filter} handleClick={handleClick} button={button}/>
      </div>
    </div>
  )
}

export default App;
