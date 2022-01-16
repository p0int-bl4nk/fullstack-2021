import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actionLogin } from '../reducers/userReducer'
import { Button, Form } from 'react-bootstrap'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const userInfo = {
      username,
      password
    }
    dispatch(actionLogin(userInfo))
    setUsername('')
    setPassword('')
  }

  const handleReset = (e) => {
    e.preventDefault()
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h3>Log in to the Application</h3>
      <Form onSubmit={handleLogin} onReset={handleReset}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
        <Button variant="secondary" type="reset">
          Reset
        </Button>
      </Form>
    </>
  )
}

export default Login