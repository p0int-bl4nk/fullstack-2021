import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.payload
  case 'UPDATE_USER':
    return state.map(u => u.id === action.payload.id ? action.payload : u)
  case 'ADD_BLOG':
    return state.map(u => {
      return u.id === action.data.user.id
        ? { ...u, blogs: u.blogs.concat(action.data) }
        : u
    })
  case 'LOGOUT':
    return []
  default:
    return state
  }
}

export default usersReducer

export const actionInitUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      payload: users
    })
  }
}
/*

export const actionUpdateUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_USER',
      payload: user
    })
  }
}*/
