import anecdoteService from '../services/anecdotes'

export const voteById = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const newState = state.map(anecdote => 
        anecdote.id !== action.data.id ? anecdote : {...anecdote, votes: anecdote.votes + 1}
      )
      state = newState.sort((a, b) => b.votes - a.votes)
      return state
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      state = action.data.sort((a, b) => b.votes - a.votes)
      return state
    default: return state
  }
}
