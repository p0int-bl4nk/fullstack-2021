import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const BlogList = () => {
  const allBlogs = useSelector(state => state.blogs)

  return (
    <div>
      <ListGroup as="ul">
        {
          allBlogs.map(blog =>
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

export default BlogList