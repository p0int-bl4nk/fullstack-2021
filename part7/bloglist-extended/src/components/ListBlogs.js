import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const ListBlogs = () => {
  const allBlogs = useSelector(state => state.blogs)

  return (
    <div>
      <ul>
        {
          allBlogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
            />
          )
        }
      </ul>
    </div>
  )
}

export default ListBlogs