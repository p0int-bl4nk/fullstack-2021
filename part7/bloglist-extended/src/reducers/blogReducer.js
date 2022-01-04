import blogService from '../services/blogs'
import { actionShowNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return state.concat([action.data])
  case 'UPDATE_BLOG':
    return state.map(b =>
      b.id === action.data.id ? action.data : b
    )
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.id)
  default:
    return state
  }
}

export default blogReducer

export const actionInitBlogs = () => {
  return async dispatch => {
    try {
      const data = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data
      })
    } catch (err) {
      console.log(err)
      dispatch(actionShowNotification({
        type: 'error', message: 'Error fetching blogs!'
      }))
    }
  }
}

export const actionAddBlog = (newBlog) => {
  return async dispatch => {
    try {
      const data = await blogService.create(newBlog)
      dispatch({
        type: 'ADD_BLOG',
        data
      })
      dispatch(actionShowNotification({
        type: 'success', message: `A new blog '${newBlog.title}' by ${newBlog.author} was added.`
      }))
    } catch (e) {
      console.log('getAll error:', e)
      dispatch(actionShowNotification({
        type: 'error', message: 'Something went wrong! Blog could not be added.'
      }))
    }
  }
}

export const actionDeleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(id)
      dispatch({
        type: 'DELETE_BLOG',
        id
      })
      dispatch(actionShowNotification({
        type: 'success', message: 'Blog has been deleted.'
      }))
    } catch (e) {
      console.log(e)
      dispatch(actionShowNotification({
        type: 'error', message: 'Something went wrong! Blog could not be deleted.'
      }))
    }
  }
}

export const actionLike = (blog) => {
  return async dispatch => {
    try {
      const data = { ...blog, likes: blog.likes + 1 }
      await blogService.update(data)
      dispatch({
        type: 'UPDATE_BLOG',
        data
      })
    } catch (e) {
      console.log(e)
      dispatch(actionShowNotification({
        type: 'error', message: 'Something went wrong! Blog could not be updated.'
      }))
    }
  }
}