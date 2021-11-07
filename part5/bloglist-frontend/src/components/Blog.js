import React from 'react'
const Blog = ({blog}) => (
  <li>
    <div>
      {blog.title}, <em>by</em> <strong>{blog.author}</strong>
    </div>
  </li>
)

export default Blog