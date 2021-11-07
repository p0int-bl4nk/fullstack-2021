import {useState} from "react";
import blogService from "../services/blogs";

const NewBlog = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewBlog = async (event) => {
    event.preventDefault();
    let notification;
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url
      });

      setAuthor('');
      setTitle('');
      setUrl('');
      props.updateBlogs(prev => [...prev, newBlog]);
      notification = {
        message: `A new blog "${newBlog.title}", by ${newBlog.author} was added.`,
        type: 'success'
      };
    } catch (e) {
      notification = {
        message: e.message,
        type: 'error',
      };
      console.log('create new blog failed, error:', e);
    }
    props.handleNotification(notification);
  };

  return (
    <div>
      <h4>Create new</h4>
      <form onSubmit={handleNewBlog}>
        <label htmlFor='title'>Title: </label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
        <br/>
        <label htmlFor='author'>Author: </label>
        <input
          type='text'
          name='author'
          value={author}
          onChange={({target}) => setAuthor(target.value)}
        />
        <br/>
        <label htmlFor='url'>Url: </label>
        <input
          type='url'
          name='url'
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
        <br/>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default NewBlog;