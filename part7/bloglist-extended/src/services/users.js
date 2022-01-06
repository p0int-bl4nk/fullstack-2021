import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const usersService = { getAll }
export default usersService