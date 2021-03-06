import axios from 'axios'
const baseUrl = '/api/blogs'

let token

export const setToken = (_token) => {
  token = `bearer ${_token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const update = (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const addComment = (comment, blogId) => {
  const request = axios.post(`${baseUrl}/${blogId}/comments`, { comment })
  return request.then(response => response && response.data)
}

const blogService = { getAll, setToken, create, update, deleteBlog, addComment }
export default blogService