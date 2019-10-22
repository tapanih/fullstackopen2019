let timeoutHandle

export const showNotification = (message, timeInSeconds) => {
  return async dispatch => {
    clearTimeout(timeoutHandle)
    timeoutHandle = setTimeout(() => {
      dispatch(hideNotification())
    }, 1000 * timeInSeconds)
    dispatch ({
      type: 'SHOW',
      data: { message }
    })
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