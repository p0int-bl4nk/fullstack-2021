import React, { useState } from 'react'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }

    setAuthor('')
    setTitle('')
    setUrl('')
    props.createNewBlog(newBlog)
  }

  return (
    <div>
      <h4>Create new</h4>
      <form onSubmit={handleSubmit} id='createBlog'>
        <label htmlFor='title'>Title: </label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br/>
        <label htmlFor='author'>Author: </label>
        <input
          type='text'
          name='author'
          id='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br/>
        <label htmlFor='url'>Url: </label>
        <input
          type='url'
          name='url'
          id='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br/>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default NewBlog