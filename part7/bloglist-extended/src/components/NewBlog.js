import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actionAddBlog } from '../reducers/blogReducer'
import { Button, Form, Modal } from 'react-bootstrap'

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    dispatch(actionAddBlog(newBlog))
    handleReset()
  }

  const handleReset = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
    close()
  }

  const [addNew, setAddNew] = useState(false)
  const open = () => setAddNew(true)
  const close = () => setAddNew(false)

  return (
    <>
      <br/>
      <Button variant='success' type='button' onClick={open}>
        Create New
      </Button>
      <Modal show={addNew} dialogClassName='modal-30' onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="url">
              <Form.Label>Url</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter Url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            &nbsp;
            <Button variant='danger' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NewBlog