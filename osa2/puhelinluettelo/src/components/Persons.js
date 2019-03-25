import React from 'react'

const Persons = ({persons, nameFilter, deletePerson}) => {
  const rows = () => persons
    .filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
    .map(person => 
      <li key={person.name}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person)}>poista</button>
      </li>)

    return <ul>{rows()}</ul>
}

export default Persons