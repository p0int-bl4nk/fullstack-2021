import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionAddComment, actionDeleteBlog, actionLike } from '../reducers/blogReducer'
import { useNavigate, useMatch } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
const Blog = () => {
  const styles = {
    blog: {
      border: '1px solid black',
      borderRadius: 5,
      width: '100%',
      height: 'fit-content',
      background: 'lightblue',
      padding: 10,
    }
  }
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id')
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const blog = useSelector(state =>
    state
      .blogs
      .find(b => match && b.id === match.params.id)
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
          <Button
            variant='info'
            type='button'
            onClick={handleLike}
          >
            Like
          </Button>
        </span>
        <br/>
        <span>Added by:&nbsp;{blog.user.name}</span>
        &nbsp;
        <Button
          variant='danger'
          type='button'
          onClick={handleDelete}
        >
          Remove
        </Button>
      </div>
      <div>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant='success'
            type='button'
            onClick={handleComment}
            disabled={!comment}
          >
            Comment
          </Button>
        </Form.Group>
        <ul>
          { blog.comments.map((c, idx) => <li key={idx}>{c}</li>) }
        </ul>
      </div>
    </>

  )
}

export default Blog