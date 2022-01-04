import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Login from './components/Login'
import Togglable from './components/Togglable'
import React, { useEffect, useRef } from 'react'
import NewBlog from './components/NewBlog'
import ListBlogs from './components/ListBlogs'
import { actionGetUserFromLocalStorage, actionLogout } from './reducers/userReducer'
import { actionInitBlogs } from './reducers/blogReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  useEffect(() => {
    dispatch(actionGetUserFromLocalStorage())
  }, [])

  useEffect(() => {
    if (user.token)
      dispatch(actionInitBlogs())
  }, [user])

  const handleLogout = () => dispatch(actionLogout())

  return (
    <div>
      <Notification />
      {
        !user.name
          ? <Togglable buttonLabel={'Log In'}>
            <Login />
          </Togglable>
          : <>
            <h2>Blogs</h2>
            <p>
              {user.name} logged in.
              <button type='button' onClick={handleLogout}>
                Logout
              </button>
            </p>
            <Togglable buttonLabel={'Create a blog'} ref={blogFormRef}>
              <NewBlog closeForm={() => blogFormRef.current.toggleVisibility()}/>
            </Togglable>
            <ListBlogs />
          </>
      }
    </div>
  )
}

export default App