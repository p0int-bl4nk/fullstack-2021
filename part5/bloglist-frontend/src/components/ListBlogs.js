import React from 'react'
import Blog from './Blog'

const ListBlogs = ({ allBlogs, updateBlog, handleDelete }) => {

  return (
    <div>
      <ul>
        {
          allBlogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={updateBlog}
              handleDelete={handleDelete}
            />
          )
        }
      </ul>
    </div>
  )
}

export default ListBlogs