import axios from 'axios'
const baseUrl = '/api/login'

const login = (userInfo) => {
  const request = axios.post(baseUrl, userInfo)
  return request.then(response => response.data)
}

const loginService = { login };
export default loginService;