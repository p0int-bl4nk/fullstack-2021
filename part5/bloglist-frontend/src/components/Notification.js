import React from 'react'

const Notification = ({ type = '', message = '' }) => {
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

  if (!message) {
    return null
  }
  return (
    <div style={styles[`${type}`]}>
      {message}
    </div>
  )
}


export default Notification