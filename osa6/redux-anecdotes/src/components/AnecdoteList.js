import React from 'react'
import { connect } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteById(anecdote.id)
    anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    props.showNotification(`you voted '${anecdote.content}'`)
  }

  return (
    <>
      {props.visibleAnecdotes
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

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter),
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