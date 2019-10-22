import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.showNotification(`you added '${content}'`)
  }

  return (
    <div>      
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapStoreToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: value => {
      dispatch(createAnecdote(value))
    },
    showNotification: value => {
      dispatch(showNotification(dispatch, value))
    },
  }
}

const ConnectedAnecdoteForm = connect(mapStoreToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm