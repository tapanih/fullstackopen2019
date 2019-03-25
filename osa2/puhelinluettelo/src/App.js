import React, { useState, useEffect } from 'react'
import './App.css';
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'


const Filter = ({nameFilter, handleNameFilterChange}) => 
  <div>rajaa näytettäviä<input value={nameFilter} onChange={handleNameFilterChange} /></div>
  

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll()
    .then(response => setPersons(response))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const newNotification = (message, type) => {
    const notification = {message, type}
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const updatePerson = (id, person) => {
    personService.update(id, person).then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      newNotification(`Päivitettiin ${person.name}`, "success")
    })
    .catch(error => {
      setPersons(persons.filter(p => p.id !== id)) //jos tapahtuu virhe, henkilö on varmaan poistettu
      newNotification(`${person.name} oli jo poistettu`, "error")
    })  
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const person = persons.find(p => p.name === newPerson.name)

    if (person) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        updatePerson(person.id, newPerson)  
      }   
    } else {
      personService.create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      newNotification(`Lisättiin ${newPerson.name}`, "success")
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      personService.deleteById(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
      newNotification(`Poistettiin ${person.name}`, "success")
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification notification={notification} />
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />

      <h3>Lisää uusi</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
                  newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h3>Numerot</h3>

      <Persons persons={persons} nameFilter={nameFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App