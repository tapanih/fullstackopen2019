import React from 'react'
import CountryInfo from './CountryInfo'

const Countries = ({countries, filter, handleClick, button}) => {
  if (filter === "") {
    return ""
  }

  const filtered = countries
    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const rows = () => filtered.map(country => 
    <span key={country.numericCode}>
    {country.name}
    <button onClick={handleClick(country.numericCode)}>show</button>
    <br/>
    </span>)

  if (button > -1) {
      return <CountryInfo country={countries.find(country => country.numericCode === button)}/>
  } else if (filtered.length === 1) {
      return <CountryInfo country={filtered[0]}/>
  } else if (filtered.length < 11) {
      return rows()      
  } else {
      return "Too many matches, specify another filter"
  }
}

export default Countries