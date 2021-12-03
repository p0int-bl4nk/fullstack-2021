const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
}

export const actionShowNotification = (notification) => {
  return {
    type: 'SHOW_NOTIFICATION',
    notification
  }
}

export const actionHideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer;