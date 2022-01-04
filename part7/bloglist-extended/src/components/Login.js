import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actionLogin } from '../reducers/userReducer'

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
    /*try {
      const loginResponse = await loginService.login(userInfo)
      setUsername('')
      setPassword('')
      blogService.setToken(loginResponse.token)
      window.localStorage.setItem('currentUserInfo', JSON.stringify(loginResponse))
      setUser(loginResponse)
    } catch (e) {
      handleNotification({
        message: e.response.data.error,
        type: 'error',
      })
      console.log('login failed error:', e)
    }*/
  }

  return (
    <>
      <h3>Log in to the Application</h3>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br/>
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br/>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default Login