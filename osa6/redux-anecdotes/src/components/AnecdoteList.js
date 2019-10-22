import React from 'react'
import { connect } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteById(anecdote.id)
    props.showNotification(`you voted '${anecdote.content}'`)
  }

  return (
    <>
      {props.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
      .map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    voteById: value => {
      dispatch(voteById(value))
    },
    showNotification: value => {
      dispatch(showNotification(dispatch, value))
    },
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList