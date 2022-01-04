import React from 'react'
import {useSelector} from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification);

  const styles = {
    error: {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    },
    success: {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  }

  if (!notification?.message) {
    return null
  }

  const { message, type } = notification
  return (
    <div style={styles[type]}>
      {message}
    </div>
  )
}


export default Notification