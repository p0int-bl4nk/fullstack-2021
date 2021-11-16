import React from 'react'
import Blog from "./Blog";
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'

const blog = {
  title: 'test title',
  author: 'test author',
  url: 'test url',
  likes: 0,
  id: 1
}

test('renders only blog title and author', () => {
  const component = render(
    <Blog blog={blog}/>
  )

  // component.debug();
  expect(component.container).toHaveTextContent('test title, by test author');

  const div = component.container.querySelector('.url').parentElement;
  expect(div).toHaveStyle({display: 'none'});
})

test('url and likes visible, when view button is clicked', () => {
  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('View');
  fireEvent.click(button);

  const div = component.container.querySelector('.url').parentElement;
  expect(div).not.toHaveStyle({display: 'none'});
})

test('like handler is called twice when clicked twice', () => {

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} handleLike={mockHandler}/>
  )

  const likeButton = component.getByText('Like');

  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
})