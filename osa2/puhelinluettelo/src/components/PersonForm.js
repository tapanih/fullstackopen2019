import React from 'react'

const PersonForm = (props) => (          
  <form onSubmit={props.addPerson}>
    <div>Nimi:<input value={props.newName} onChange={props.handleNameChange}/></div>
    <div>Numero:<input value={props.newNumber} onChange={props.handleNumberChange}/></div>
  <button type="submit">lisää</button>
  </form>)

  export default PersonForm