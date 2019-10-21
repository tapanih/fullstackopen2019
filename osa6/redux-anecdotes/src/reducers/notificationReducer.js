export const showNotification = (dispatch, message) => {
  setTimeout(() => {
    dispatch(hideNotification())
  }, 5000)
  return {
    type: 'SHOW',
    data: { message }
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
    data: ''
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