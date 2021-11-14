import React from 'react'

const Notification = ({ notification }) => {
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

  if (notification && !notification['message']) {
    return null
  }
  return (
    <div style={notification['type'] === 'error' ? styles.error : styles.success}>
      {notification['message']}
    </div>
  )
}


export default Notification