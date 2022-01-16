import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const list = useSelector(state =>
    state.users.map(user => ({
      name: user.name,
      blogCount: user.blogs.length,
      id: user.id
    }))
  )

  const tableStyle = {
    border: '1px dashed black',
    padding: 10,
    margin: 10,
    textAlign: 'center'
  }

  return (
    <>
      <h3>All users</h3>
      {
        list.map((u) =>
          <table key={u.id} style={tableStyle}>
            <thead>
              <tr>
                <th style={tableStyle}>User</th>
                <th style={tableStyle}>Blogs created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tableStyle}>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td style={tableStyle}>{u.blogCount}</td>
              </tr>
            </tbody>
          </table>
        )
      }
    </>
  )
}

export default UserList