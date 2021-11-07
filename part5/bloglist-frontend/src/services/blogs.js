import axios from 'axios';
const baseUrl = '/api/blogs';

let token;

const setToken = (_token) => {
  token = `bearer ${_token}`;
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const config = {
    headers: { Authorization: token }
  };

  const request = axios.post(baseUrl, blog, config);
  return request.then(response => response.data);
}

const blogService = { getAll, setToken, create }
export default blogService;