import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const list = useSelector(state =>
    state.users.map(user => ({
      name: user.name,
      blogCount: user.blogs.length,
      id: user.id
    }))
  )

  return (
    <>
      <h3 className='text-center text-primary'>Users</h3>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
        </thead>
        <tbody>
        {
          list.map((u, idx) =>
            <tr key={u.id}>
              <td>{idx + 1}</td>
              <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
              <td>{u.blogCount}</td>
            </tr>
          )
        }
        </tbody>
      </Table>
    </>
  )
}

export default UserList