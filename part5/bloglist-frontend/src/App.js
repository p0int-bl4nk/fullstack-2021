import React, { useState, useEffect } from 'react';
import ListBlogs from './components/ListBlogs';
import Login from './components/Login';
import blogService from './services/blogs'
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const user = window.localStorage.getItem('currentUserInfo');
    if (user)
      setUser(user);
  }, []);

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        setBlogs( blogs )
      )
      .catch(err => console.log('getAll error:', err));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('currentUserInfo');
    setUser(null);
  };

  const handleNotification = (notification) => {
    setNotification(notification);
    setTimeout(
      () => setNotification({message: '', type: ''}),
      5000
    );
  }

  return (
    <div>
      <Notification
        notification={notification}
      />
      {
        !user
        ? <Login setUser={setUser} handleNotification={handleNotification}/>
        : <>
            <h2>Blogs</h2>
            <p>
              {user.name} logged in.
              <button type='button' onClick={handleLogout}>Logout</button>
            </p>

            <NewBlog updateBlogs={setBlogs} handleNotification={handleNotification}/>
            <ListBlogs allBlogs={blogs} />
          </>
      }
    </div>
  )
}

export default App