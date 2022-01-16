import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { actionGetUserFromLocalStorage, actionLogout } from './reducers/userReducer'
import { actionInitBlogs } from './reducers/blogReducer'
import { actionInitUsers } from './reducers/usersReducer'
import Notification from './components/Notification'
import Login from './components/Login'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
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
      <Menu user={user} handleLogout={handleLogout}/>
      {
        user?.name &&
        <>
          <h2>Blogs</h2>
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
              path="/users"
              element={<UserList/>}
            />
            <Route
              path="/users/:id"
              element={<User/>}
            />
            <Route
              path="/blogs/:id"
              element={<Blog/>}
            />
          </Routes>
        </>
      }
    </div>
  )
}

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to='/'>Blogs</Link>
      <Link style={padding} to='/users'>Users</Link>
      &nbsp;
      {
        user?.name
        ? <span>
            { user.name } logged in.
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </span>
        : <Togglable buttonLabel={'Log In'}>
            <Login/>
          </Togglable>
      }

    </div>
  )
}

export default App