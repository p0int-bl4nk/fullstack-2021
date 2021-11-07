import Blog from "./Blog";

const ListBlogs = ({ allBlogs }) => {
  return (
    <div>
      <ul>
        {
          allBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </ul>
    </div>
  )
}

export default ListBlogs;