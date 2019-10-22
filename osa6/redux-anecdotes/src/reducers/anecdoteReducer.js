export const voteById = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
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
