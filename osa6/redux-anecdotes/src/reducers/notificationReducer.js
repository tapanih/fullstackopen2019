export const showNotification = (message) => {
  return {
    type: 'SHOW',
    data: { message }
  }
}

export const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'HIDE':
      return null
    case 'SHOW':
      return action.data.message
    default: return state
  }
}