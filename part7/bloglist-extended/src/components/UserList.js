import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {
  const list = useSelector(state => {

    console.log(state.users)
    return state.users.map(user => ({
      name: user.name,
      blogCount: user.blogs.length
    }))
  })

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
        list.map((u, idx) =>
          <table key={idx} style={tableStyle}>
            <thead>
              <tr>
                <th style={tableStyle}>User</th>
                <th style={tableStyle}>Blogs created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tableStyle}>{u.name}</td>
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