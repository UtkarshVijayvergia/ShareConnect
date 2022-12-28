import React from 'react'
import './user.css'

const User = (props) => {
  return (
    <div>
        <h4 className='user'>{props.name}</h4>
        <h4>{props.email}</h4>
    </div>
  )
}

export default User