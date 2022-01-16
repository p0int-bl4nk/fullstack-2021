import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const allBlogs = useSelector(state => state.blogs)

  const style = {
    border: '1px solid black',
    padding: 10,
    margin: 10
  }

  return (
    <div>
      <ul>
        {
          allBlogs.map(blog =>
            <li key={blog.id} style={style}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
              <br/>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default BlogList