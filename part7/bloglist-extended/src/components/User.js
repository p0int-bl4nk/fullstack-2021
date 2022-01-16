import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React from 'react'

const User = () => {
  const match = useMatch('/users/:id')
  const user = useSelector(state =>
    state
      .users
      .find(u => match && u.id === match.params.id)
  )

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Blogs:</h4>
      <ul>
        {
          user.blogs.map(b =>
            <li key={b.id}>{b.title}</li>
          )
        }
      </ul>
    </div>
  )
}

export default User