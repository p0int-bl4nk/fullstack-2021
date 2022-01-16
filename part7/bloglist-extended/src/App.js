import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Login from './components/Login'
import Togglable from './components/Togglable'
import React, { useEffect, useRef } from 'react'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'
import { actionGetUserFromLocalStorage, actionLogout } from './reducers/userReducer'
import { actionInitBlogs } from './reducers/blogReducer'
import { Link, Route, Routes } from 'react-router-dom'
import UserList from './components/UserList'
import { actionInitUsers } from './reducers/usersReducer'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  useEffect(() => {
    dispatch(actionGetUserFromLocalStorage())
  }, [])

  useEffect(() => {
    if (user.token) {
      dispatch(actionInitBlogs())
      dispatch(actionInitUsers())
    }
  }, [user])

  const handleLogout = () => dispatch(actionLogout())

  return (
    <div>
      <Notification />
      <Menu/>
      {
        !user.name
          ? <Togglable buttonLabel={'Log In'}>
            <Login/>
          </Togglable>
          : <>
            <h2>Blogs</h2>
            <p>
              {user.name} logged in.
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </p>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Togglable buttonLabel={'Create a blog'} ref={blogFormRef}>
                      <NewBlog closeForm={() => blogFormRef.current.toggleVisibility()}/>
                    </Togglable>
                    <BlogList/>
                  </>
                }
              />
              <Route
                path='/users'
                element={<UserList/>}
              />
              <Route
                path='/users/:id'
                element={<User/>}
              />
              <Route
                path='/blogs/:id'
                element={<Blog/>}
              />
            </Routes>
          </>
      }
    </div>
  )
}

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to='/'>Blogs</Link>
      <Link style={padding} to='/users'>Users</Link>
    </div>
  )
}

export default App