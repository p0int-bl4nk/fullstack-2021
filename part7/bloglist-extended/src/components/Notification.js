import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification?.message) {
    return null
  }

  const { message, type } = notification
  return (
    <Alert variant={type === 'error' ? 'danger' : 'success'}>
      {message}
    </Alert>
  )
}


export default Notification