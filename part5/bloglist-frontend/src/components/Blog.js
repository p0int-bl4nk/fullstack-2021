import React from 'react'
import Togglable from './Togglable'
const Blog = ({ blog, handleLike, handleDelete }) => {
  const styles = {
    blog: {
      border: '1px solid black',
      borderRadius: 5,
      width: 'fit-content',
      height: 'fit-content',
      background: 'lightblue',
      padding: 10,
      margin: 10,
    },
    delete: {
      border: '1px solid red',
      borderRadius: 5,
      background: 'red',
      padding: 5,
    }
  }

  const onDelete = (event) => {
    event.preventDefault()
    if (
      window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)
    ) {
      handleDelete(blog.id)
    }
  }

  const onLike = (event) => {
    event.preventDefault()
    const _blog = { ...blog }
    _blog.likes = _blog.likes + 1
    _blog.user = _blog.user.id
    handleLike(_blog)
  }

  return (
    <li style={styles.blog}>
      <div>
        <span>
          {blog.title}, <em>by</em> <strong>{blog.author}</strong>
        </span>
        <Togglable buttonLabel='View' closeButtonLabel='Hide'>
          <>
            <span>
              <em>{blog.url}</em>
            </span>
            <br/>
            <span>
              Likes: {blog.likes}{' '}
              <button type='button' onClick={onLike}>
                Like
              </button>
            </span>
            <br/>
          </>
        </Togglable>
      </div>
      <button
        type='button'
        onClick={onDelete}
        style={styles.delete}
      >
        Remove
      </button>
    </li>
  )
}

export default Blog