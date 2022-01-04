import React from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { actionDeleteBlog, actionLike } from '../reducers/blogReducer'
const Blog = ({ blog }) => {
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
  const dispatch = useDispatch()

  const handleLike = () => dispatch(actionLike(blog))

  const handleDelete = () => {
    if (
      window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)
    ) {
      dispatch(actionDeleteBlog(blog.id))
    }
  }

  return (
    <li style={styles.blog}>
      <div className='blog' >
        <span  id={`${blog.id}_heading`} className='header'>
          {blog.title}, <em>by</em> <strong>{blog.author}</strong>
        </span>
        <Togglable buttonLabel='View' closeButtonLabel='Hide'>
          <>
            <span  id={`${blog.id}_url`} className='url'>
              <em>{blog.url}</em>
            </span>
            <br/>
            <span id={`${blog.id}_like`} className='likes'>
              Likes: {blog.likes}{' '}
              <button type='button' onClick={handleLike}>
                Like
              </button>
            </span>
            <br/>
          </>
        </Togglable>
      </div>
      <button
        type='button'
        onClick={handleDelete}
        style={styles.delete}
        className='deleteBtn'
      >
        Remove
      </button>
    </li>
  )
}

export default Blog