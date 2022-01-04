import loginService from '../services/login'
import { setToken } from '../services/blogs'

const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return {}
  default:
    return state
  }
}

export default userReducer

export const actionLogin = (data) => {
  return async dispatch => {
    const loginResponse = await loginService.login(data)
    localStorage.setItem('user', JSON.stringify(loginResponse))
    setToken(loginResponse.token)
    dispatch({
      type: 'LOGIN',
      data: loginResponse
    })
  }
}

export const actionLogout = () => {
  localStorage.removeItem('user')
  return { type: 'LOGOUT' }
}

export const actionGetUserFromLocalStorage = () => {
  const _user = localStorage.getItem('user')
  let user = {}
  if (_user) {
    user = JSON.parse(_user)
    setToken(user.token)
  }
  return {
    type: 'LOGIN',
    data: user
  }
}