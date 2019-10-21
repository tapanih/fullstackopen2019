import React from 'react'
import { voteById } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const state = props.store.getState()

  const vote = (anecdote) => {
    props.store.dispatch(voteById(anecdote.id))
    props.store.dispatch(showNotification(`you voted '${anecdote.content}'`))
  }

  return (
    <>
      {state.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList