import { fireEvent, render } from '@testing-library/react'
import NewBlog from './NewBlog'
import React from 'react'

test('new blog calls submit handler with proper values', () => {
  const mockHandler = jest.fn()

  const component = render(
    <NewBlog createNewBlog={mockHandler}/>
  )

  const form = component.container.querySelector('#createBlog')

  const title = component.container.querySelector('#title')
  fireEvent.change(title, {
    target: {
      value: 'testing title'
    }
  })

  const author = component.container.querySelector('#author')
  fireEvent.change(author, {
    target: {
      value: 'testing author'
    }
  })

  const url = component.container.querySelector('#url')
  fireEvent.change(url, {
    target: {
      value: 'https://something.com'
    }
  })

  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toStrictEqual({
    title: 'testing title',
    author: 'testing author',
    url: 'https://something.com'
  })

})