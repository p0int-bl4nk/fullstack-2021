import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { actionGetUserFromLocalStorage, actionLogout } from './reducers/userReducer'
import { actionInitBlogs } from './reducers/blogReducer'
import { actionInitUsers } from './reducers/usersReducer'
import Notification from './components/Notification'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
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

  const AllRoutes = () => (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NewBlog/>
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
  )

  return (
    <div className='container bg-light'>
      <Menu user={user} handleLogout={handleLogout}/>
      <Notification />
      {
        (user && user.name)
        ? <AllRoutes />
        : <Login />
      }
    </div>
  )
}

const Menu = ({ user, handleLogout }) => {
  return (
    <Navbar bg="info" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to='/' className='p-3 nav-link'>Blogs</Link>
            <Link to='/users' className='p-3 nav-link'>Users</Link>
          </Nav>
          <Navbar.Brand>
            {
              user && user.name &&
              <span>
                {user.name} logged in.&nbsp;
                <Button variant="secondary" type="button" onClick={handleLogout}>
                  Logout
                </Button>
              </span>
            }
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default App