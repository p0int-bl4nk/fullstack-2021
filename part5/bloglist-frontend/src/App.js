import React, {useState, useEffect, useRef} from 'react';
import ListBlogs from './components/ListBlogs';
import Login from './components/Login';
import blogService from './services/blogs'
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const noteFormRef = useRef();

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

  const handleNewBlog = async (newBlog) => {
    let notification;
    try {
      const _newBlog = await blogService.create(newBlog);
      setBlogs(prev => [...prev, _newBlog]);
      notification = {
        message: `A new blog "${newBlog.title}", by ${newBlog.author} was added.`,
        type: 'success'
      };
      noteFormRef.current.toggleVisibility();
    } catch (e) {
      notification = {
        message: e.response.data.error,
        type: 'error',
      };
      console.log('create new blog failed, error:', e);
    }
    handleNotification(notification);
  };

  return (
    <div>
      <Notification
        notification={notification}
      />
      {
        !user
        ? <Togglable buttonLabel={'Log In'}>
            <Login setUser={setUser} handleNotification={handleNotification}/>
          </Togglable>
        : <>
            <h2>Blogs</h2>
            <p>
              {user.name} logged in.
              <button type='button' onClick={handleLogout}>
                Logout
              </button>
            </p>
            <Togglable buttonLabel={'Create a blog'} ref={noteFormRef}>
              <NewBlog createNewBlog={handleNewBlog}/>
            </Togglable>
            <ListBlogs allBlogs={blogs} />
          </>
      }
    </div>
  )
}

export default App