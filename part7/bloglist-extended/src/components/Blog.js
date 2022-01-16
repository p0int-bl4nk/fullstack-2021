import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionAddComment, actionDeleteBlog, actionLike } from '../reducers/blogReducer'
import { useNavigate, useMatch } from 'react-router-dom'
const Blog = () => {
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
  const match = useMatch('/blogs/:id')
  const navigate = useNavigate()
  const [comment, setComment] = useState('');
  const blog = useSelector(state =>
    state
      .blogs
      .find(b => b.id === match?.params.id)
  )

  const handleLike = () => dispatch(actionLike(blog))

  const handleDelete = () => {
    if (
      window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)
    ) {
      dispatch(actionDeleteBlog(blog.id))
      navigate('/')
    }
  }

  if (!blog) return null

  const handleComment = () => {
    dispatch(actionAddComment(comment, blog.id))
    setComment('')
  }

  return (
    <>
      <div style={styles.blog}>
        <h3>{blog.title}, <em>by</em> <strong>{blog.author}</strong></h3>
        <a href={blog.url}>{blog.url}</a>
        <br/>
        <span>
        Likes:&nbsp;{blog.likes}&nbsp;
          <button type='button' onClick={handleLike}>
          Like
        </button>
      </span>
        <br/>
        <span>Added by:&nbsp;{blog.user.name}</span>
        &nbsp;
        <button
          type='button'
          onClick={handleDelete}
          style={styles.delete}
          className='deleteBtn'
        >
          Remove
        </button>
      </div>
      <div>
        <input
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type='button'
          onClick={handleComment}
          disabled={!comment}
        >
          Add Comment
        </button>
        <ul>
          { blog.comments?.map((c, idx) => <li key={idx}>{c}</li>) }
        </ul>
      </div>
    </>

  )
}

export default Blog