const dummy = () => {
  return 1;
}

const totalLikes = (blogs) => {
  if (blogs.length === 0)
    return 0;

  if (blogs.length === 1)
    return blogs[0].likes;

  return blogs.reduce((total, blog) => {
    total += blog.likes;
    return total;
  }, 0);
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0)
    return {};

  let maxLikes = -1;
  let favBlog;
  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    if (maxLikes < blog.likes) {
      maxLikes = blog.likes;
      favBlog = blog;
    }
  }
  return favBlog;
};

const mostBlogs = (blogs) => {
  const result = {
    author: '',
    blogs: 0
  };

  if (blogs.length === 0)
    return result;

  let blogCount = new Map();
  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    if (blogCount.has(blog.author))
      blogCount.set(blog.author, blogCount.get(blog.author) + 1);
    else
      blogCount.set(blog.author, 1);
  }

  blogCount
    .forEach((value, key) => {
      if (value >= result.blogs) {
        result.blogs = value;
        result.author = key;
      }
    });

  return result;
}

const mostLikes = (blogs) => {
  const mostLikes = {
    author: '',
    likes: 0
  };

  if (blogs.length === 0)
    return mostLikes;

  const likesCount = new Map();
  blogs
    .forEach(blog => {
      if (likesCount.has(blog.author))
        likesCount.set(blog.author, likesCount.get(blog.author) + blog.likes);
      else
        likesCount.set(blog.author, blog.likes);
    });

  likesCount
    .forEach((value, key) => {
      if (mostLikes.likes <= value) {
        mostLikes.author = key;
        mostLikes.likes = value;
      }
    });

  return mostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};