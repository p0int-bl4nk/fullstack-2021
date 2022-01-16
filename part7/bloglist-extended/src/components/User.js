import { Link, useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React from 'react'
import { ListGroup } from 'react-bootstrap'

const User = () => {
  const match = useMatch('/users/:id')
  const user = useSelector(state =>
    state
      .users
      .find(u => match && u.id === match.params.id)
  )

  if (!user) return null

  return (
    <div>
      <h2 className='text-center text-primary'>{user.name}</h2>
      <h4 className='text-secondary'>Blogs</h4>
      <ListGroup as="ul">
        {
          user.blogs.map(blog =>
            <ListGroup.Item
              key={blog.id}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </div>
            </ListGroup.Item>
          )
        }
      </ListGroup>
    </div>
  )
}

export default User