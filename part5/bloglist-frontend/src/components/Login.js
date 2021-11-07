import React, {useState} from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = ({ setUser, handleNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const userInfo = {
      username,
      password
    };

    try {
      const loginResponse = await loginService.login(userInfo);
      setUsername('');
      setPassword('');
      blogService.setToken(loginResponse.token);
      window.localStorage.setItem('currentUserInfo', JSON.stringify(loginResponse));
      setUser(loginResponse);
    } catch (e) {
      handleNotification({
        message: 'Invalid username or password',
        type: 'error',
      });
      console.log('login failed error:', e);
    }
  }

  return (
    <>
      <h3>Log in to the Application</h3>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={({target}) => setUsername(target.value)}
        />
        <br/>
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
        <br/>
        <button type='submit'>Login</button>
      </form>
    </>
  );
}

export default Login;